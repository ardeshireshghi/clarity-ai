"use client";

import { create } from 'zustand';
import { Project } from '@/lib/types';

interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const projectData: Project[] = [
  {
    id: "phoenix",
    name: "Project Phoenix",
    description: "Modernizing our core platform infrastructure",
    status: "on-track",
    progress: 65,
    team: ["Alice Cooper", "Bob Wilson", "Carol Smith"],
    lastUpdated: "2 hours ago",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: {
      allocated: 500000,
      spent: 275000,
      currency: "USD"
    },
    metrics: {
      velocity: 42,
      bugRate: 2.5,
      testCoverage: 87
    },
    stakeholders: [
      {
        name: "Alice Cooper",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        name: "Bob Wilson",
        role: "Tech Lead",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      {
        name: "Carol Smith",
        role: "Design Lead",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
      }
    ]
  },
  {
    id: "atlas",
    name: "Project Atlas",
    description: "Next-generation mapping platform",
    status: "at-risk",
    progress: 45,
    team: ["David Lee", "Emma White", "Frank Brown"],
    lastUpdated: "1 day ago",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    budget: {
      allocated: 750000,
      spent: 425000,
      currency: "USD"
    },
    metrics: {
      velocity: 35,
      bugRate: 4.2,
      testCoverage: 72
    },
    stakeholders: [
      {
        name: "David Lee",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      {
        name: "Emma White",
        role: "Tech Lead",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      }
    ]
  },
  {
    id: "nexus",
    name: "Project Nexus",
    description: "API Gateway and Service Mesh",
    status: "delayed",
    progress: 30,
    team: ["Grace Chen", "Henry Miller", "Ivy Park"],
    lastUpdated: "3 hours ago",
    startDate: "2024-03-01",
    endDate: "2024-09-30",
    budget: {
      allocated: 600000,
      spent: 180000,
      currency: "USD"
    },
    metrics: {
      velocity: 28,
      bugRate: 5.8,
      testCoverage: 65
    },
    stakeholders: [
      {
        name: "Grace Chen",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      },
      {
        name: "Henry Miller",
        role: "Tech Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ]
  }
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: projectData,
  selectedProjectId: null,
  setSelectedProject: (id) => set({ selectedProjectId: id }),
  getProjectById: (id) => get().projects.find(p => p.id === id)
}));