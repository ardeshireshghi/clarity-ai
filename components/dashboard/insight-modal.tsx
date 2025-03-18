"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Send } from "lucide-react";

interface InsightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: "scope" | "bottleneck" | "response";
  data: any;
}

export function InsightModal({
  open,
  onOpenChange,
  title,
  type,
  data,
}: InsightModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="font-semibold">Timeline</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      Requirements updated by John Doe
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2 days ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="space-y-4">
            <h3 className="font-semibold">Impact Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Sprint Impact</p>
                <p className="text-2xl font-bold text-destructive">+3 Days</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Team Affected</p>
                <p className="text-2xl font-bold">Frontend</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recommended Actions</h3>
            <div className="flex gap-3">
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Schedule Discussion
              </Button>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}