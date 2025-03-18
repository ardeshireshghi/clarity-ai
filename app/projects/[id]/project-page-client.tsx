"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { ProjectFooter } from "@/components/projects/project-footer";
import { ProjectOverview } from "@/components/projects/tabs/project-overview";
import { ScopeChanges } from "@/components/projects/tabs/scope-changes";
import { DecisionBottlenecks } from "@/components/projects/tabs/decision-bottlenecks";
import { CommunicationTrends } from "@/components/projects/tabs/communication-trends";
import { TimelineHistory } from "@/components/projects/tabs/timeline-history";
import { useProjectStore } from "@/lib/store/project-store";

export type TabValue = "overview" | "scope" | "bottlenecks" | "communication" | "timeline";

export function ProjectPageClient() {
  const [currentTab, setCurrentTab] = useState<TabValue>("overview");
  const params = useParams();
  const router = useRouter();
  const { getProjectById, setSelectedProject } = useProjectStore();

  const projectId = typeof params.id === "string" ? params.id : "";
  const project = getProjectById(projectId);

  useEffect(() => {
    if (!project) {
      router.push("/projects");
      return;
    }
    setSelectedProject(projectId);
  }, [project, projectId, router, setSelectedProject]);

  if (!project) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      
      <ProjectTabs value={currentTab} onValueChange={(value) => setCurrentTab(value as TabValue)} />
      
      <div className="space-y-6">
        {currentTab === "overview" && <ProjectOverview project={project} />}
        {currentTab === "scope" && <ScopeChanges project={project} />}
        {currentTab === "bottlenecks" && <DecisionBottlenecks project={project} />}
        {currentTab === "communication" && <CommunicationTrends project={project} />}
        {currentTab === "timeline" && <TimelineHistory project={project} />}
      </div>

      <ProjectFooter project={project} />
    </div>
  );
}