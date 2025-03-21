"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Check,
  ChevronRight,
  Loader2,
  Settings,
  Slack,
  Mail,
  FileText,
  BarChart2,
} from "lucide-react";

const steps = [
  "AI Analysis",
  "Role Selection",
  "Integrations",
  "Preferences",
  "Summary",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");

  // Simulate AI analysis
  if (currentStep === 0 && isAnalyzing) {
    setTimeout(() => {
      if (analysisProgress < 100) {
        setAnalysisProgress((prev) => Math.min(prev + 20, 100));
      } else {
        setIsAnalyzing(false);
      }
    }, 1000);
  }

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      window.location.href = '/dashboard';
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to ClarityAI</h1>
        <p className="text-muted-foreground">Let's personalize your experience</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index === currentStep
                  ? "text-primary"
                  : index < currentStep
                  ? "text-primary/60"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  index <= currentStep ? "border-primary" : "border-muted"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="ml-2 text-sm hidden sm:inline">{step}</span>
            </div>
          ))}
        </div>
        <Progress value={(currentStep / (steps.length - 1)) * 100} />
      </div>

      {/* Step Content */}
      <Card className="p-6">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">AI Analysis</h2>
            </div>
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing your organization's data...</span>
                </div>
                <Progress value={analysisProgress} />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Scanning Slack channels</p>
                  <p>• Analyzing Jira workflows</p>
                  <p>• Processing email patterns</p>
                  <p>• Reviewing documentation</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Analysis Complete!</span>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Initial Insights:</h3>
                  <div className="grid gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">Decision Patterns</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your team shows strong collaboration but has bottlenecks in
                        technical reviews
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="h-5 w-5 text-primary" />
                        <span className="font-medium">Workflow Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sprint planning could be optimized with better resource
                        allocation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Role Selection</h2>
            </div>
            <div className="space-y-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering-manager">
                    Engineering Manager
                  </SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="director">Director/VP</SelectItem>
                </SelectContent>
              </Select>
              {selectedRole && (
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Based on your role and our analysis, we'll customize your
                    dashboard to focus on key metrics and decision points that
                    matter most to you.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Slack className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Tool Integrations</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Slack className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-muted-foreground">
                      Monitor team communication
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Email Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Track important discussions
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Notion</p>
                    <p className="text-sm text-muted-foreground">
                      Sync documentation
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Alert Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Priority Alerts</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="bottlenecks" defaultChecked />
                    <Label htmlFor="bottlenecks">Decision Bottlenecks</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="delays" defaultChecked />
                    <Label htmlFor="delays">Project Delays</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="risks" defaultChecked />
                    <Label htmlFor="risks">Execution Risks</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Notification Channels</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email" defaultChecked />
                    <Label htmlFor="email">Email Digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="slack" defaultChecked />
                    <Label htmlFor="slack">Slack Notifications</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Check className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Ready to Go!</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your personalized dashboard is ready. We've configured:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-4 w-4" />
                  <span>AI-powered insights based on your role</span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-4 w-4" />
                  <span>Tool integrations for seamless workflow</span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-4 w-4" />
                  <span>Custom alert preferences</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isAnalyzing}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isAnalyzing || (currentStep === 1 && !selectedRole)}
          >
            {currentStep === steps.length - 1 ? (
              "Go to Dashboard"
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}