"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, Clock, GitPullRequest, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { InsightModal } from "../insight-modal";

export function EngineeringManagerView() {
  const [selectedInsight, setSelectedInsight] = useState<{
    type: "scope" | "bottleneck" | "response";
    title: string;
    data: any;
  } | null>(null);

  return (
    <>
      {/* Overview Panel */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Engineering Health Overview</h2>
            <p className="text-muted-foreground">Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-destructive">High Risk</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Code Review Progress</h3>
            <Progress value={65} className="mb-2" />
            <p className="text-sm text-muted-foreground">65% Complete</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Technical Debt</h3>
            <p className="text-2xl font-bold">24%</p>
            <p className="text-sm text-muted-foreground">+5% from last sprint</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Team Velocity</h3>
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-destructive">-8 below target</p>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Scope Creep Monitoring */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "scope",
            title: "Scope Creep Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Technical Scope</h2>
          </div>
          <p className="text-destructive mb-4">5 tickets require architecture changes</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• PROJ-123: New microservice required</li>
            <li>• PROJ-456: Database schema changes</li>
            <li>• PROJ-789: API versioning needed</li>
          </ul>
        </div>

        {/* Code Review Bottlenecks */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "bottleneck",
            title: "Code Review Bottlenecks",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <GitPullRequest className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Review Bottlenecks</h2>
          </div>
          <p className="text-destructive mb-4">3 PRs pending review for 5+ days</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• PR #1234: API Refactoring (7 days)</li>
            <li>• PR #1235: Performance Updates (5 days)</li>
            <li>• PR #1236: Security Fixes (6 days)</li>
          </ul>
        </div>

        {/* Team Response Time */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "response",
            title: "Team Response Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Team Response</h2>
          </div>
          <p className="text-destructive mb-4">Code review response time: 12 hours avg.</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Critical PRs: 4.5 hours</li>
            <li>• Feature PRs: 12 hours</li>
            <li>• Documentation: 24 hours</li>
          </ul>
        </div>
      </div>

      {selectedInsight && (
        <InsightModal
          open={!!selectedInsight}
          onOpenChange={() => setSelectedInsight(null)}
          title={selectedInsight.title}
          type={selectedInsight.type}
          data={selectedInsight.data}
        />
      )}
    </>
  );
}