"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart2, 
  MessageSquare, 
  Clock, 
  Users,
  AlertTriangle,
  ArrowRight,
  Mail,
  MessageCircle,
  GitPullRequest
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Project } from "@/lib/types";

interface CommunicationTrendsProps {
  project: Project;
}

const responseTimeData = [
  { name: "Mon", slack: 45, email: 120, github: 30 },
  { name: "Tue", slack: 30, email: 90, github: 45 },
  { name: "Wed", slack: 60, email: 150, github: 25 },
  { name: "Thu", slack: 40, email: 100, github: 35 },
  { name: "Fri", slack: 50, email: 80, github: 40 },
];

const channelMetrics = [
  {
    channel: "Slack",
    icon: MessageSquare,
    responseTime: "30 mins",
    unresolved: 12,
    trending: "up",
    color: "text-blue-500",
  },
  {
    channel: "Email",
    icon: Mail,
    responseTime: "2 hours",
    unresolved: 8,
    trending: "down",
    color: "text-purple-500",
  },
  {
    channel: "GitHub",
    icon: GitPullRequest,
    responseTime: "45 mins",
    unresolved: 5,
    trending: "up",
    color: "text-green-500",
  },
];

const conversationVolume = [
  { date: "Week 1", volume: 245 },
  { date: "Week 2", volume: 320 },
  { date: "Week 3", volume: 280 },
  { date: "Week 4", volume: 350 },
  { date: "Week 5", volume: 290 },
  { date: "Week 6", volume: 310 },
];

export function CommunicationTrends({ project }: CommunicationTrendsProps) {
  return (
    <div className="space-y-6">
      {/* Overview Panel */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Communication Analysis</h2>
            <p className="text-muted-foreground">
              Response times and interaction patterns across channels
            </p>
          </div>
          <Button className="glass-button">
            Generate Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Response Rate</h3>
            <Progress value={85} className="mb-2" />
            <p className="text-sm text-muted-foreground">85% within SLA</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Unresolved Threads</h3>
            <Progress value={25} className="mb-2" />
            <p className="text-sm text-destructive">25 threads pending</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Team Engagement</h3>
            <Progress value={92} className="mb-2" />
            <p className="text-sm text-muted-foreground">92% active</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Cross-team Collaboration</h3>
            <Progress value={78} className="mb-2" />
            <p className="text-sm text-muted-foreground">78% effective</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Response Time by Channel */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Response Time by Channel</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="slack" name="Slack" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="email" name="Email" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="github" name="GitHub" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversation Volume Trend */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Conversation Volume</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversationVolume}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Channel Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        {channelMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.channel} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${metric.color}`} />
                <h2 className="text-xl font-semibold">{metric.channel}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Response Time</p>
                  <p className="text-2xl font-bold">{metric.responseTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Unresolved Threads</p>
                  <p className="text-2xl font-bold">{metric.unresolved}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      metric.trending === "up"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }
                  >
                    {metric.trending === "up" ? "Improving" : "Needs Attention"}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Items */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Recommended Actions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Review Slack Threads</h3>
            <p className="text-sm text-muted-foreground">
              12 threads require immediate attention
            </p>
          </div>
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Email Response Policy</h3>
            <p className="text-sm text-muted-foreground">
              Consider updating SLA for critical emails
            </p>
          </div>
          <div className="glass-card bg-white/10 p-4">
            <h3 className="font-medium mb-2">Cross-team Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Schedule sync meeting for pending decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}