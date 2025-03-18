export type UserRole = 'engineering-manager' | 'product-manager' | 'director';

export interface DashboardFilters {
  project?: string;
  sprint?: string;
  timeRange: 'day' | 'week' | 'month';
}

export interface User {
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  progress: number;
  team: string[];
  lastUpdated: string;
  startDate: string;
  endDate: string;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  metrics: {
    velocity: number;
    bugRate: number;
    testCoverage: number;
  };
  stakeholders: {
    name: string;
    role: string;
    image?: string;
  }[];
}