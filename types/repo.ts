export interface RepoFileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: string[];
  language?: string;
  content?: string;
}

export type RepoTree = Record<string, RepoFileNode>;
