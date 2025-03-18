"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/lib/types";

interface TimelineHistoryProps {
  project: Project;
}

interface TimelineEvent {
  id: number;
  type: "commit" | "pr" | "discussion" | "milestone" | "release";
  title: string;
  description: string;
  date: string;
  author: string;
  status?: "completed" | "in-progress" | "blocked";
  impact?: "high" | "medium" | "low";
  relatedItems?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    type: "milestone",
    title: "Beta Release Planning",
    description: "Finalized feature set and timeline for beta release",
    date: "2024-03-20",
    author: "Sarah Chen",
    status: "completed",
    impact: "high",
    relatedItems: ["Sprint Planning", "Architecture Review"],
  },
  {
    id: 2,
    type: "pr",
    title: "Feature: User Authentication",
    description: "Implemented OAuth2 and role-based access control",
    date: "2024-03-19",
    author: "Alex Kim",
    status: "in-progress",
    impact: "high",
    relatedItems: ["Security Review", "API Documentation"],
  },
  {
    id: 3,
    type: "discussion",
    title: "Architecture Decision: Database Scaling",
    description: "Decided on sharding strategy for improved performance",
    date: "2024-03-18",
    author: "Maria Garcia",
    status: "completed",
    impact: "high",
    relatedItems: ["Performance Testing", "Capacity Planning"],
  },
  {
    id: 4,
    type: "commit",
    title: "Fix: API Rate Limiting",
    description: "Implemented rate limiting middleware for all endpoints",
    date: "2024-03-17",
    author: "James Wilson",
    status: "completed",
    impact: "medium",
    relatedItems: ["API Documentation", "Performance Testing"],
  },
  {
    id: 5,
    type: "release",
    title: "v0.9.0 Release",
    description: "Released beta version with core features",
    date: "2024-03-16",
    author: "DevOps Team",
    status: "completed",
    impact: "high",
    relatedItems: ["Release Notes", "Deployment Plan"],
  },
];

const statusColors = {
  completed: "bg-green-500/10 text-green-500",
  "in-progress": "bg-blue-500/10 text-blue-500",
  blocked: "bg-red-500/10 text-red-500",
};

const impactColors = {
  high: "bg-red-500/10 text-red-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-green-500/10 text-green-500",
};

const typeIcons = {
  commit: GitCommit,
  pr: GitPullRequest,
  discussion: MessageSquare,
  milestone: Calendar,
  release: GitBranch,
};

export function TimelineHistory({ project }: TimelineHistoryProps) {
  const [filter, setFilter] = useState<"all" | TimelineEvent["type"]>("all");

  return (
    <div className="space-y-6">
      {/* Overview Panel */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Project Timeline</h2>
            <p className="text-muted-foreground">
              Comprehensive history of project milestones and activities
            </p>
          </div>
          <Button className="glass-button">
            Export Timeline <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Milestones</h3>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>8/10 Completed</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Pull Requests</h3>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-blue-500" />
              <span>15 Active</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Discussions</h3>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <span>24 Resolved</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Releases</h3>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-500" />
              <span>v0.9.0 Latest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={(value: typeof filter) => setFilter(value)}>
            <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="milestone">Milestones</SelectItem>
              <SelectItem value="pr">Pull Requests</SelectItem>
              <SelectItem value="discussion">Discussions</SelectItem>
              <SelectItem value="commit">Commits</SelectItem>
              <SelectItem value="release">Releases</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last 30 days</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {timelineEvents
          .filter((event) => filter === "all" || event.type === filter)
          .map((event) => {
            const Icon = typeIcons[event.type];
            return (
              <div key={event.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      {event.status && (
                        <Badge variant="outline" className={statusColors[event.status]}>
                          {event.status}
                        </Badge>
                      )}
                      {event.impact && (
                        <Badge variant="outline" className={impactColors[event.impact]}>
                          {event.impact} impact
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Related Items</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.relatedItems?.map((item) => (
                        <Badge key={item} variant="outline" className="bg-white/10">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Author</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{event.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}