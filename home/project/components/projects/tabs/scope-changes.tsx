"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  GitBranch, 
  MessageSquare,
  Clock,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/lib/types";

interface ScopeChangesProps {
  project: Project;
}

type Impact = 'high' | 'medium' | 'low';
type ChangeType = 'Feature Enhancement' | 'Scope Addition' | 'Technical Requirement';
type ChangeSource = 'PRD' | 'Stakeholder' | 'Engineering';
type ChangeStatus = 'pending' | 'approved' | 'implemented' | 'rejected';

interface ScopeChange {
  id: number;
  title: string;
  type: ChangeType;
  source: ChangeSource;
  impact: Impact;
  status: ChangeStatus;
  date: string;
  description: string;
  affectedAreas: string[];
  stakeholders: string[];
}

const scopeChanges: ScopeChange[] = [
  {
    id: 1,
    title: "User Authentication Flow",
    type: "Feature Enhancement",
    source: "PRD",
    impact: "high",
    status: "pending",
    date: "2024-03-15",
    description: "Added social login providers and enhanced security requirements",
    affectedAreas: ["Frontend", "Backend", "Security"],
    stakeholders: ["Product", "Engineering", "Security"],
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    type: "Scope Addition",
    source: "Stakeholder",
    impact: "medium",
    status: "approved",
    date: "2024-03-14",
    description: "New requirements for custom reporting and export functionality",
    affectedAreas: ["Frontend", "Data"],
    stakeholders: ["Product", "Data Science"],
  },
  {
    id: 3,
    title: "API Rate Limiting",
    type: "Technical Requirement",
    source: "Engineering",
    impact: "medium",
    status: "implemented",
    date: "2024-03-12",
    description: "Implementation of rate limiting for all API endpoints",
    affectedAreas: ["Backend", "DevOps"],
    stakeholders: ["Engineering", "DevOps"],
  },
];

const impactColors: Record<Impact, string> = {
  high: "text-red-500 bg-red-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  low: "text-green-500 bg-green-500/10",
};

const statusColors: Record<ChangeStatus, string> = {
  pending: "text-yellow-500 bg-yellow-500/10",
  approved: "text-blue-500 bg-blue-500/10",
  implemented: "text-green-500 bg-green-500/10",
  rejected: "text-red-500 bg-red-500/10",
};

export function ScopeChanges({ project }: ScopeChangesProps) {
  const [filter, setFilter] = useState<"all" | ChangeStatus>("all");

  // Calculate metrics based on project data
  const changeVolume = scopeChanges.length;
  const approvalRate = (scopeChanges.filter(c => c.status === "approved").length / changeVolume) * 100;
  const implementationRate = (scopeChanges.filter(c => c.status === "implemented").length / changeVolume) * 100;
  const highImpactRate = (scopeChanges.filter(c => c.impact === "high").length / changeVolume) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Panel */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Scope Change Analysis</h2>
            <p className="text-muted-foreground">
              Tracking requirement changes across documentation and communication
            </p>
          </div>
          <Button className="glass-button">
            Request Change <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Change Volume</h3>
            <Progress value={65} className="mb-2" />
            <p className="text-sm text-muted-foreground">{changeVolume} changes this sprint</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Approval Rate</h3>
            <Progress value={approvalRate} className="mb-2" />
            <p className="text-sm text-muted-foreground">{approvalRate.toFixed(0)}% approved</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Implementation</h3>
            <Progress value={implementationRate} className="mb-2" />
            <p className="text-sm text-muted-foreground">{implementationRate.toFixed(0)}% implemented</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Impact Level</h3>
            <Progress value={highImpactRate} className="mb-2" />
            <p className="text-sm text-destructive">High impact changes: {highImpactRate.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={(value: typeof filter) => setFilter(value)}>
            <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Changes</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="implemented">Implemented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Source:</span>
          <Badge variant="outline" className="bg-white/10">PRD</Badge>
          <Badge variant="outline" className="bg-white/10">Jira</Badge>
          <Badge variant="outline" className="bg-white/10">Slack</Badge>
        </div>
      </div>

      {/* Changes List */}
      <div className="space-y-4">
        {scopeChanges
          .filter(change => filter === "all" || change.status === filter)
          .map((change) => (
            <div key={change.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{change.title}</h3>
                    <Badge variant="outline" className={impactColors[change.impact]}>
                      {change.impact} impact
                    </Badge>
                    <Badge variant="outline" className={statusColors[change.status]}>
                      {change.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{change.description}</p>
                </div>
                <Button variant="outline" className="glass-card bg-white/30 border-0">
                  View Details
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-medium mb-2">Affected Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {change.affectedAreas.map((area) => (
                      <Badge key={area} variant="outline" className="bg-white/10">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Stakeholders</h4>
                  <div className="flex flex-wrap gap-2">
                    {change.stakeholders.map((stakeholder) => (
                      <Badge key={stakeholder} variant="outline" className="bg-white/10">
                        {stakeholder}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Source & Timeline</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {change.source === "PRD" && <FileText className="h-4 w-4" />}
                      {change.source === "Stakeholder" && <MessageSquare className="h-4 w-4" />}
                      {change.source === "Engineering" && <GitBranch className="h-4 w-4" />}
                      <span className="text-sm">{change.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{change.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}