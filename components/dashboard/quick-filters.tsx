"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardFilters } from "@/lib/types";

interface QuickFiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export function QuickFilters({ filters, onFiltersChange }: QuickFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Select
        value={filters.project}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, project: value })
        }
      >
        <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
          <SelectValue placeholder="Select Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="project-a">Project A</SelectItem>
          <SelectItem value="project-b">Project B</SelectItem>
          <SelectItem value="project-c">Project C</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sprint}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, sprint: value })
        }
      >
        <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
          <SelectValue placeholder="Select Sprint" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sprint-45">Sprint 45</SelectItem>
          <SelectItem value="sprint-46">Sprint 46</SelectItem>
          <SelectItem value="sprint-47">Sprint 47</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.timeRange}
        onValueChange={(value: any) =>
          onFiltersChange({ ...filters, timeRange: value })
        }
      >
        <SelectTrigger className="glass-card bg-white/30 w-[180px] border-0">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Last 24 Hours</SelectItem>
          <SelectItem value="week">Last 7 Days</SelectItem>
          <SelectItem value="month">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}