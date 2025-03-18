'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const steps = [
  'Welcome',
  'Role Selection',
  'Tool Integrations',
  'Customization',
  'Dashboard Setup',
  'Preview',
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      window.location.href = '/dashboard/';
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="glass-panel">
            <div className="flex items-center justify-between h-16 px-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                ClarityAI
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-28 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{steps[currentStep]}</h2>
            <Progress value={progress} className="h-2 bg-white/30" />
          </div>

          <div className="glass-panel p-6">
            {currentStep === 0 && <WelcomeStep />}
            {currentStep === 1 && (
              <RoleSelectionStep
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
              />
            )}
            {currentStep === 2 && <ToolIntegrationsStep />}
            {currentStep === 3 && <CustomizationStep />}
            {currentStep === 4 && <DashboardSetupStep />}
            {currentStep === 5 && <PreviewStep />}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-white/50 hover:bg-white/70"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {currentStep === steps.length - 1 ? (
                <Link href="/dashboard/" passHref>
                  <Button
                    className="bg-primary/90 hover:bg-primary text-white"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-primary/90 hover:bg-primary text-white"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-4 mb-4">
          <div className="glass-panel">
            <div className="flex items-center justify-center h-16 px-6">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at support@clarityai.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">Welcome to ClarityAI</h3>
      <p className="text-muted-foreground mb-6">
        Let's get you set up with your personalized dashboard in just a few
        steps. We'll help you connect your tools and customize your experience.
      </p>
    </div>
  );
}

function RoleSelectionStep({
  selectedRole,
  onRoleSelect,
}: {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select your role</h3>
      <Select value={selectedRole} onValueChange={onRoleSelect}>
        <SelectTrigger className="glass-card bg-white/30">
          <SelectValue placeholder="Choose your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engineering-manager">
            Engineering Manager
          </SelectItem>
          <SelectItem value="product-manager">Product Manager</SelectItem>
          <SelectItem value="director">Director/VP</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ToolIntegrationsStep() {
  const tools = [
    { name: 'Jira', connected: true },
    { name: 'GitHub', connected: false },
    { name: 'Slack', connected: true },
    { name: 'Google Docs', connected: false },
    { name: 'Email', connected: false },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Connect your tools</h3>
      <div className="space-y-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="glass-card p-4 flex items-center justify-between"
          >
            <span>{tool.name}</span>
            {tool.connected ? (
              <span className="text-green-500 flex items-center">
                <Check className="mr-1 h-4 w-4" /> Connected
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/50 hover:bg-white/70"
              >
                Connect
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomizationStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Customize your alerts</h3>
      <p className="text-muted-foreground mb-6">
        Set your preferences for notifications and alerts. You can always adjust
        these later.
      </p>
      <div className="space-y-4">
        <div className="glass-card p-4">
          <h4 className="font-medium mb-2">Email Notifications</h4>
          <p className="text-sm text-muted-foreground">
            Configure when you receive email updates
          </p>
        </div>
        <div className="glass-card p-4">
          <h4 className="font-medium mb-2">Alert Thresholds</h4>
          <p className="text-sm text-muted-foreground">
            Set custom thresholds for different metrics
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardSetupStep() {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Setting up your dashboard</h3>
      <p className="text-muted-foreground mb-6">
        We're configuring your personalized dashboard based on your role and
        connected tools. This will only take a moment.
      </p>
      <Progress value={75} className="h-2 bg-white/30" />
    </div>
  );
}

function PreviewStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Preview your dashboard</h3>
      <p className="text-muted-foreground mb-6">
        Here's a preview of your dashboard with sample insights based on your
        connected tools.
      </p>
      <div className="glass-card p-4">
        <h4 className="font-medium mb-2">Sample Insights</h4>
        <p className="text-sm text-muted-foreground">
          Your personalized dashboard is ready to go
        </p>
      </div>
    </div>
  );
}
