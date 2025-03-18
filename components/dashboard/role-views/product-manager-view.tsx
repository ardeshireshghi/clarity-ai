"use client";

import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BarChart2, Clock, GitPullRequest, MessageSquare } from "lucide-react";
import { useState } from "react";
import { InsightModal } from "../insight-modal";

export function ProductManagerView() {
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
            <h2 className="text-2xl font-bold mb-2">Product Development Health</h2>
            <p className="text-muted-foreground">Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-destructive">Launch at Risk</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Sprint Progress</h3>
            <Progress value={45} className="mb-2" />
            <p className="text-sm text-destructive">45% (15% behind schedule)</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Feature Completion</h3>
            <p className="text-2xl font-bold">18/32</p>
            <p className="text-sm text-muted-foreground">Features completed</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Stakeholder Feedback</h3>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-muted-foreground">Positive responses</p>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Scope Changes */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "scope",
            title: "Scope Change Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Scope Changes</h2>
          </div>
          <p className="text-destructive mb-4">3 features changed requirements in Sprint #45</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• User Authentication: 2 requirement changes</li>
            <li>• Dashboard Analytics: Added 3 new metrics</li>
            <li>• API Integration: Changed endpoint structure</li>
          </ul>
        </div>

        {/* Decision Bottlenecks */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "bottleneck",
            title: "Decision Bottlenecks",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <GitPullRequest className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Pending Decisions</h2>
          </div>
          <p className="text-destructive mb-4">4 features awaiting stakeholder approval</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Feature A: Pending for 7 days</li>
            <li>• Feature B: Needs security review</li>
            <li>• Feature C: Awaiting cost approval</li>
          </ul>
        </div>

        {/* Communication Issues */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "response",
            title: "Communication Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Communication</h2>
          </div>
          <p className="text-destructive mb-4">45% of messages need follow-up</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 12 unresolved threads in Slack</li>
            <li>• 5 pending stakeholder responses</li>
            <li>• 3 blocking questions from dev team</li>
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