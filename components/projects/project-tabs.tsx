"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, GitPullRequest, MessageSquare, Clock, Baseline as Timeline } from "lucide-react";
import { TabValue } from "@/app/projects/[id]/project-page-client";
import { Project } from "@/lib/types";

interface ProjectTabsProps {
  value: TabValue;
  onValueChange: (value: string) => void;
  project?: Project;
}

const tabs = [
  {
    value: "overview",
    label: "Overview",
    icon: BarChart2,
  },
  {
    value: "scope",
    label: "Scope Changes",
    icon: GitPullRequest,
  },
  {
    value: "bottlenecks",
    label: "Decision Bottlenecks",
    icon: Clock,
  },
  {
    value: "communication",
    label: "Communication Trends",
    icon: MessageSquare,
  },
  {
    value: "timeline",
    label: "Timeline & History",
    icon: Timeline,
  },
];

export function ProjectTabs({ value, onValueChange, project }: ProjectTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="glass-panel h-16 p-2 grid grid-cols-5 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:glass-card data-[state=active]:bg-white/30 gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}