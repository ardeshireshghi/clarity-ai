"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight, BarChart2, Brain, Clock } from "lucide-react";
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

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const velocityData = [
    { name: "Sprint 43", value: project.metrics.velocity - 10 },
    { name: "Sprint 44", value: project.metrics.velocity - 5 },
    { name: "Sprint 45", value: project.metrics.velocity - 2 },
    { name: "Sprint 46", value: project.metrics.velocity },
    { name: "Sprint 47", value: project.metrics.velocity + 2 },
    { name: "Sprint 48", value: project.metrics.velocity + 5 },
  ];

  const risks = [
    {
      title: "API Integration Delay",
      description: "Third-party API integration taking longer than estimated",
      impact: "High",
      type: "Technical",
    },
    {
      title: "Resource Constraint",
      description: `${project.team[0]} capacity reduced due to planned leaves`,
      impact: "Medium",
      type: "Resource",
    },
    {
      title: "Security Review",
      description: "Pending security assessment may delay deployment",
      impact: "High",
      type: "Process",
    },
  ];

  const getBudgetStatus = () => {
    const spentPercentage = (project.budget.spent / project.budget.allocated) * 100;
    if (spentPercentage > 80) return "text-destructive";
    if (spentPercentage > 60) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Project Health Score</h2>
            <p className="text-muted-foreground">Based on key metrics and performance indicators</p>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">AI-powered analysis</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Overall Progress</h3>
            <Progress value={project.progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{project.progress}% Complete</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Budget Utilization</h3>
            <Progress 
              value={(project.budget.spent / project.budget.allocated) * 100} 
              className="mb-2" 
            />
            <p className={`text-sm ${getBudgetStatus()}`}>
              {((project.budget.spent / project.budget.allocated) * 100).toFixed(1)}% Used
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Test Coverage</h3>
            <Progress value={project.metrics.testCoverage} className="mb-2" />
            <p className="text-sm text-muted-foreground">{project.metrics.testCoverage}% Covered</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Bug Rate</h3>
            <Progress value={Math.min((project.metrics.bugRate / 10) * 100, 100)} className="mb-2" />
            <p className="text-sm text-destructive">{project.metrics.bugRate} per sprint</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Velocity Trend */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Velocity Trend</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
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

        {/* Active Risks */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Active Risks</h2>
            </div>
            <Button variant="outline" className="glass-card bg-white/30 border-0">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {risks.map((risk) => (
              <div key={risk.title} className="glass-card bg-white/10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{risk.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={
                      risk.impact === "High" 
                        ? "bg-red-500/10 text-red-500" 
                        : "bg-yellow-500/10 text-yellow-500"
                    }
                  >
                    {risk.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Added 2 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">AI Suggested Actions</h2>
          </div>
          <Button className="glass-button">
            Take Action <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Schedule Technical Review</h3>
            <p className="text-sm text-muted-foreground">
              API integration delays suggest need for architecture review
            </p>
          </div>
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Resource Reallocation</h3>
            <p className="text-sm text-muted-foreground">
              Consider temporary team augmentation for frontend tasks
            </p>
          </div>
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Early Security Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Initiate preliminary security review to prevent deployment delays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}