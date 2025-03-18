"use client";

import { Button } from "@/components/ui/button";
import { FileText, GitBranch, MessageSquare, AlertTriangle } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectFooterProps {
  project: Project;
}

export function ProjectFooter({ project }: ProjectFooterProps) {
  return (
    <div className="glass-panel p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="gap-2">
          <FileText className="h-4 w-4" />
          Documentation
        </Button>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GitBranch className="h-4 w-4" />
          <span>GitHub</span>
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>Slack</span>
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>

      <Button className="glass-button gap-2">
        <AlertTriangle className="h-4 w-4" />
        Escalate Issue
      </Button>
    </div>
  );
}