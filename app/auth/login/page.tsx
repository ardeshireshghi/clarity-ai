"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Mail, Microscope as Microsoft } from "lucide-react";

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const router = useRouter();

  const handleSSOLogin = async (provider: string) => {
    setLoadingProvider(provider);
    
    // Simulate SSO authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just redirect to onboarding
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to ClarityAI</h1>
          <p className="text-muted-foreground">
            Sign in to start optimizing your project execution
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSSOLogin("google")}
            disabled={loadingProvider === "google"}
          >
            <Mail className="mr-2 h-5 w-5" />
            {loadingProvider === "google" ? "Signing in..." : "Continue with Google"}
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSSOLogin("microsoft")}
            disabled={loadingProvider === "microsoft"}
          >
            <Microsoft className="mr-2 h-5 w-5" />
            {loadingProvider === "microsoft" ? "Signing in..." : "Continue with Microsoft"}
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSSOLogin("okta")}
            disabled={loadingProvider === "okta"}
          >
            <Mail className="mr-2 h-5 w-5" />
            {loadingProvider === "okta" ? "Signing in..." : "Continue with Okta"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleSSOLogin("enterprise")}
            disabled={loadingProvider === "enterprise"}
          >
            <Mail className="mr-2 h-5 w-5" />
            {loadingProvider === "enterprise" ? "Signing in..." : "Enterprise Account"}
          </Button>
        </Card>

        <p className="text-center mt-4 text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}