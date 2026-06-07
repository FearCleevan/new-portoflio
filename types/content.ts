export interface PersonalDetails {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage: string;
  cvUrl: string;
  calendlyUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  portfolioUrl: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  location: string;
  type: string;
  current: boolean;
  responsibilities: string[];
  tags: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  schoolUrl: string;
  period: string;
  location: string;
  description: string;
}

export interface TechnicalSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloudAndDeployment: string[];
  toolsAndPlatforms: string[];
}

export interface Skills {
  technical: TechnicalSkills;
  professional: string[];
  soft: string[];
}
