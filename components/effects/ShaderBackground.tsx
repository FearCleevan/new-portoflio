"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Vertex shader ─────────────────────────────────────────────────────────
   Fullscreen quad: PlaneGeometry(2,2) vertices sit at ±1 in clip space,
   so we bypass the MVP and output position directly.
────────────────────────────────────────────────────────────────────────────── */
const vert = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/* ─── Fragment shader ────────────────────────────────────────────────────────
   Domain-warped FBM (two warp passes) in strict grayscale.
   Output range: ~#0B → #1D  (barely perceptible variation around #121212)
────────────────────────────────────────────────────────────────────────────── */
const frag = /* glsl */ `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;

  /* ── Gradient noise helpers ── */
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    /* Cubic Hermite smoothstep */
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  /* 6-octave FBM. Slight non-power-of-2 frequency multiplier avoids
     the axis-aligned grid artefacts common with exact 2.0x scaling. */
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * gnoise(p);
      p  = p * 2.02 + vec2(1.7, 9.2);
      a *= 0.48;
    }
    return v;
  }

  void main() {
    /* Aspect-corrected UV centred at origin */
    vec2 uv  = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
    uv.x    *= u_resolution.x / u_resolution.y;

    float t  = u_time * 0.03;          /* very slow horizontal drift */
    vec2  sc = vec2(0.55);             /* spatial frequency scale    */

    /* ── Domain warp pass 1 ── */
    vec2 q = vec2(
      fbm(uv * sc + vec2(0.00, 0.00) + t),
      fbm(uv * sc + vec2(5.20, 1.30) + t)
    );

    /* ── Domain warp pass 2 ── */
    vec2 r = vec2(
      fbm(uv * sc + 3.8 * q + vec2(1.7, 9.2) + t * 0.55),
      fbm(uv * sc + 3.8 * q + vec2(8.3, 2.8) + t * 0.55)
    );

    /* ── Final warped sample ── */
    float n = fbm(uv * sc + 3.8 * r + t * 0.25);

    /* Map [-1, 1] → dark grayscale [0.045, 0.115]
       hex equivalent: #0B → #1D  (barely perceptible but alive) */
    float b = 0.045 + 0.07 * (n * 0.5 + 0.5);

    gl_FragColor = vec4(vec3(b), 1.0);
  }
`;

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── prefers-reduced-motion: render ONE static frame then stop ── */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Cap DPR at 1.5 — noise shader looks identical at 2× and is 33% cheaper */
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);
    const W   = window.innerWidth;
    const H   = window.innerHeight;

    /* ── Three.js setup ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(dpr);
    /* updateStyle = false — CSS controls visual size; we only manage the buffer */
    renderer.setSize(W, H, false);

    /* Camera unused by shader, but Three.js requires one */
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene    = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time:       { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(
          canvas.width,   // physical pixels = W * dpr (set by renderer)
          canvas.height
        ),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader:   vert,
      fragmentShader: frag,
      uniforms,
    });

    scene.add(new THREE.Mesh(geometry, material));

    /* Render the first (possibly only) frame */
    renderer.render(scene, camera);

    /* ── Early-out for reduced motion ── */
    if (prefersReduced) {
      return () => {
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    /* ── Animation loop ── */
    let rafId: number;
    const start    = performance.now();
    let pausedAt   = 0;
    let totalPause = 0;

    const tick = () => {
      uniforms.u_time.value = (performance.now() - start - totalPause) / 1000;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* ── Pause on tab blur ── */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        pausedAt = performance.now();
      } else {
        totalPause += performance.now() - pausedAt;
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ── Resize ── */
    const onResize = () => {
      const nW = window.innerWidth;
      const nH = window.innerHeight;
      renderer.setSize(nW, nH, false);
      uniforms.u_resolution.value.set(canvas.width, canvas.height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        -10,
        pointerEvents: "none",
        display:       "block",
      }}
    />
  );
}
