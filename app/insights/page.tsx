"use client";

import { BarChart2, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const velocityData = [
  { name: "Week 1", value: 32 },
  { name: "Week 2", value: 28 },
  { name: "Week 3", value: 35 },
  { name: "Week 4", value: 42 },
  { name: "Week 5", value: 38 },
  { name: "Week 6", value: 45 },
];

const completionData = [
  { name: "Team A", completed: 85, total: 100 },
  { name: "Team B", completed: 72, total: 100 },
  { name: "Team C", completed: 95, total: 100 },
  { name: "Team D", completed: 68, total: 100 },
];

const qualityData = [
  { name: "Bugs", value: 15 },
  { name: "Technical Debt", value: 25 },
  { name: "Code Coverage", value: 45 },
  { name: "Documentation", value: 15 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];

export default function Insights() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI-Powered Insights</h1>
          <p className="text-muted-foreground">
            Detailed analysis and trends across your projects and teams
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Sprint Performance Trends</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Velocity Trend</span>
                <div className="flex items-center gap-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Completion Rate</span>
                <div className="flex items-center gap-2 text-red-500">
                  <TrendingDown className="w-4 h-4" />
                  <span>-8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quality Metrics</span>
                <div className="flex items-center gap-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Key Findings</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-destructive mt-1" />
                <span>Sprint velocity decreased in 3 teams after architecture changes</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1" />
                <span>Code review response times increased by 45% in the last week</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Documentation coverage improved by 23% across all projects</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sprint Velocity Trend */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Sprint Velocity Trend</h2>
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

          {/* Team Completion Rates */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Team Completion Rates</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData}>
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
                  <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quality Metrics */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Quality Distribution</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {qualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {qualityData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Findings */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Detailed Findings</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-destructive mt-1" />
                <span>Sprint velocity increased by 40% after architecture improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-1" />
                <span>Team B shows consistent underperformance in completion rates</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Code quality metrics improved across all teams</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-primary mt-1" />
                <span>Technical debt reduction initiatives showing positive results</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="glass-panel p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">More Insights Coming Soon</h2>
          <p className="text-muted-foreground">
            We're working on advanced analytics and predictive insights to help you make better decisions.
          </p>
        </div>
      </div>
    </div>
  );
}