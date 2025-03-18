"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Project } from "@/lib/types";

const projectStatus = {
  "on-track": {
    label: "On Track",
    Icon: CheckCircle,
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
  "at-risk": {
    label: "At Risk",
    Icon: AlertTriangle,
    className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  },
  delayed: {
    label: "Delayed",
    Icon: Clock,
    className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  },
};

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const StatusIcon = projectStatus[project.status].Icon;

  return (
    <div className="glass-panel p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <Badge variant="outline" className={projectStatus[project.status].className}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {projectStatus[project.status].label}
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-6">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Sprint</SelectItem>
              <SelectItem value="next">Next Sprint</SelectItem>
              <SelectItem value="future">Future Sprint</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="milestone-1">
            <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
              <SelectValue placeholder="Select Milestone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="milestone-1">Milestone 1</SelectItem>
              <SelectItem value="milestone-2">Milestone 2</SelectItem>
              <SelectItem value="milestone-3">Milestone 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
        <div className="flex -space-x-2">
          {project.stakeholders.map((person) => (
            <Avatar key={person.name} className="border-2 border-background">
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
          ))}
          {project.stakeholders.length > 3 && (
            <Button variant="outline" className="glass-card bg-white/30 border-0 rounded-full h-10 w-10 ml-2">
              +{project.stakeholders.length - 3}
            </Button>
          )}
        </div>

        <Button className="glass-button">
          Add Stakeholder
        </Button>
      </div>
    </div>
  );
}