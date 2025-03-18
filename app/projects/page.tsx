"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusConfig = Record<Project['status'], {
  label: string;
  icon: React.ComponentType<any>;
  className: string;
}>;

const projects: Project[] = [
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

const statusConfig: StatusConfig = {
  "on-track": {
    label: "On Track",
    icon: CheckCircle,
    className: "bg-green-500/10 text-green-500",
  },
  "at-risk": {
    label: "At Risk",
    icon: AlertTriangle,
    className: "bg-yellow-500/10 text-yellow-500",
  },
  "delayed": {
    label: "Delayed",
    icon: Clock,
    className: "bg-red-500/10 text-red-500",
  },
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your active projects
            </p>
          </div>
          <Button className="glass-button">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/30"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const StatusIcon = statusConfig[project.status].icon;
          return (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className={cn("glass-card p-6 h-full cursor-pointer")}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                  </div>
                  <Badge variant="outline" className={statusConfig[project.status].className}>
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {statusConfig[project.status].label}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {project.team.length} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {project.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full glass-card bg-white/30 border-0">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}