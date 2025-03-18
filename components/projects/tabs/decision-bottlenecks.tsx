"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Filter,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  BarChart2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Project } from "@/lib/types";

interface DecisionBottlenecksProps {
  project: Project;
}

interface Bottleneck {
  id: number;
  title: string;
  type: "Technical" | "Product" | "External";
  status: "blocked" | "pending" | "escalated" | "resolved";
  priority: "high" | "medium" | "low";
  waitTime: string;
  blockedBy: string[];
  stakeholders: string[];
  impact: string;
  nextAction: string;
}

const bottlenecks: Bottleneck[] = [
  {
    id: 1,
    title: "Cloud Infrastructure Migration",
    type: "Technical",
    status: "blocked",
    priority: "high",
    waitTime: "5 days",
    blockedBy: ["Security Review", "Cost Approval"],
    stakeholders: ["CTO", "Security Team", "Finance"],
    impact: "Delays in development environment setup",
    nextAction: "Security team review scheduled for tomorrow",
  },
  {
    id: 2,
    title: "New Feature Scope",
    type: "Product",
    status: "pending",
    priority: "medium",
    waitTime: "3 days",
    blockedBy: ["Product Strategy Alignment", "Resource Planning"],
    stakeholders: ["Product Manager", "Engineering Lead"],
    impact: "Sprint planning uncertainty",
    nextAction: "Stakeholder meeting scheduled",
  },
  {
    id: 3,
    title: "Third-party Integration",
    type: "External",
    status: "escalated",
    priority: "high",
    waitTime: "7 days",
    blockedBy: ["Vendor Response", "Legal Review"],
    stakeholders: ["Legal Team", "Integration Team"],
    impact: "Blocking user authentication feature",
    nextAction: "Follow-up meeting with vendor",
  },
];

const trendData = [
  { name: "Week 1", value: 8 },
  { name: "Week 2", value: 12 },
  { name: "Week 3", value: 7 },
  { name: "Week 4", value: 15 },
  { name: "Week 5", value: 9 },
  { name: "Week 6", value: 5 },
];

const priorityColors: Record<Bottleneck["priority"], string> = {
  high: "text-red-500 bg-red-500/10",
  medium: "text-yellow-500 bg-yellow-500/10",
  low: "text-green-500 bg-green-500/10",
};

const statusColors: Record<Bottleneck["status"], string> = {
  blocked: "text-red-500 bg-red-500/10",
  pending: "text-yellow-500 bg-yellow-500/10",
  escalated: "text-purple-500 bg-purple-500/10",
  resolved: "text-green-500 bg-green-500/10",
};

export function DecisionBottlenecks({ project }: DecisionBottlenecksProps) {
  const [filter, setFilter] = useState<"all" | Bottleneck["status"]>("all");

  // Calculate metrics based on project data
  const activeBottlenecks = bottlenecks.filter(b => b.status !== "resolved").length;
  const avgWaitTime = 4.5; // In days
  const resolutionRate = 40; // Percentage
  const highPriorityRate = (bottlenecks.filter(b => b.priority === "high").length / bottlenecks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Panel */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Decision Bottleneck Analysis</h2>
            <p className="text-muted-foreground">
              Track and resolve approval delays and pending decisions
            </p>
          </div>
          <Button className="glass-button">
            Escalate All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Active Bottlenecks</h3>
            <Progress value={75} className="mb-2" />
            <p className="text-sm text-destructive">{activeBottlenecks} pending decisions</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Average Wait Time</h3>
            <Progress value={60} className="mb-2" />
            <p className="text-sm text-muted-foreground">{avgWaitTime} days</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Resolution Rate</h3>
            <Progress value={resolutionRate} className="mb-2" />
            <p className="text-sm text-muted-foreground">{resolutionRate}% this sprint</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">High Priority</h3>
            <Progress value={highPriorityRate} className="mb-2" />
            <p className="text-sm text-destructive">{highPriorityRate.toFixed(0)}% of total</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Bottleneck Trend</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.5)"
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Resolution Stats</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Most Common Blocker</span>
              </div>
              <Badge variant="outline" className="bg-white/10">
                Security Review
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Longest Wait Time</span>
              </div>
              <Badge variant="outline" className="bg-white/10">
                7 days
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Resolved This Week</span>
              </div>
              <Badge variant="outline" className="bg-white/10">
                8 decisions
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-primary" />
                <span>New Bottlenecks</span>
              </div>
              <Badge variant="outline" className="bg-white/10">
                5 this week
              </Badge>
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
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bottlenecks</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Type:</span>
          <Badge variant="outline" className="bg-white/10">Technical</Badge>
          <Badge variant="outline" className="bg-white/10">Product</Badge>
          <Badge variant="outline" className="bg-white/10">External</Badge>
        </div>
      </div>

      {/* Bottlenecks List */}
      <div className="space-y-4">
        {bottlenecks
          .filter(bottleneck => filter === "all" || bottleneck.status === filter)
          .map((bottleneck) => (
            <div key={bottleneck.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{bottleneck.title}</h3>
                    <Badge variant="outline" className={priorityColors[bottleneck.priority]}>
                      {bottleneck.priority} priority
                    </Badge>
                    <Badge variant="outline" className={statusColors[bottleneck.status]}>
                      {bottleneck.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{bottleneck.impact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Waiting: {bottleneck.waitTime}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-medium mb-2">Blocked By</h4>
                  <div className="flex flex-wrap gap-2">
                    {bottleneck.blockedBy.map((blocker) => (
                      <Badge key={blocker} variant="outline" className="bg-white/10">
                        {blocker}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Stakeholders</h4>
                  <div className="flex flex-wrap gap-2">
                    {bottleneck.stakeholders.map((stakeholder) => (
                      <Badge key={stakeholder} variant="outline" className="bg-white/10">
                        {stakeholder}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Next Action</h4>
                  <p className="text-sm text-muted-foreground">{bottleneck.nextAction}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" className="glass-card bg-white/30 border-0">
                  View Details
                </Button>
                <Button className="glass-button">
                  Resolve
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}