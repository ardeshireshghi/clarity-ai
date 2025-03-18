"use client";

import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BarChart2, Users, Clock, TrendingDown } from "lucide-react";
import { useState } from "react";
import { InsightModal } from "../insight-modal";

export function DirectorView() {
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
            <h2 className="text-2xl font-bold mb-2">Portfolio Overview</h2>
            <p className="text-muted-foreground">Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-destructive">3 Projects at Risk</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Overall Portfolio Health</h3>
            <Progress value={72} className="mb-2" />
            <p className="text-sm text-muted-foreground">72% on track</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Resource Utilization</h3>
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-destructive">Above optimal (75%)</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Project Delivery</h3>
            <p className="text-2xl font-bold">4/6</p>
            <p className="text-sm text-muted-foreground">Projects on schedule</p>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Portfolio Health */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "scope",
            title: "Portfolio Health Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Portfolio Health</h2>
          </div>
          <p className="text-destructive mb-4">3 projects showing critical delays</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Project X: 2 weeks behind</li>
            <li>• Project Y: Resource constraints</li>
            <li>• Project Z: Technical blockers</li>
          </ul>
        </div>

        {/* Team Performance */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "bottleneck",
            title: "Team Performance Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Team Performance</h2>
          </div>
          <p className="text-destructive mb-4">2 teams showing decreased velocity</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Team A: -15% velocity</li>
            <li>• Team B: High context switching</li>
            <li>• Team C: Understaffed</li>
          </ul>
        </div>

        {/* Strategic Risks */}
        <div 
          className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          onClick={() => setSelectedInsight({
            type: "response",
            title: "Strategic Risk Analysis",
            data: {}
          })}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Strategic Risks</h2>
          </div>
          <p className="text-destructive mb-4">5 high-priority risks identified</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Technical debt accumulation</li>
            <li>• Resource allocation issues</li>
            <li>• Delayed market entry risk</li>
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