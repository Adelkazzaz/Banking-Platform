"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  error: Error | null;
  resetErrorBoundary?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex items-center justify-center p-6 min-h-[200px]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <div className="grid gap-1">
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>
              We've encountered an unexpected error
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            Our team has been notified. If the problem persists, please contact support.
          </div>
          {process.env.NODE_ENV === 'development' && error && (
            <div className="p-2 bg-muted rounded-md text-xs overflow-auto max-h-[200px]">
              <p className="font-semibold">{error.name}: {error.message}</p>
              <pre>{error.stack}</pre>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => {
                if (resetErrorBoundary) {
                  resetErrorBoundary();
                } else {
                  window.location.href = '/';
                }
              }}
            >
              Return to dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};