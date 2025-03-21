"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart2, Clock, GitPullRequest } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ClarityAI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Eliminate project fragmentation with AI-powered insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BarChart2 className="w-8 h-8" />}
            title="Scope Creep Monitoring"
            description="Track and analyze changes in Jira tickets and documentation to prevent scope creep"
          />
          <FeatureCard
            icon={<GitPullRequest className="w-8 h-8" />}
            title="Decision Bottleneck Detector"
            description="Identify and resolve approval bottlenecks before they impact your timeline"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="Response Time Tracker"
            description="Monitor and improve team communication response times across platforms"
          />
        </div>

        <div className="text-center">
          <Link href="/auth/login">
            <Button size="lg" className="px-8">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="minimal-card hover:shadow-md transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}