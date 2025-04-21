"use client";

import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * GlobalErrorHandler captures uncaught exceptions and unhandled promise rejections globally.
 * It logs them to console and can also send them to a logging service in production.
 */
export function GlobalErrorHandler() {
  useEffect(() => {
    // Handler for uncaught exceptions
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      console.error('Uncaught error:', event.error);
      
      // You can log to a service here in production
      // logErrorToService(event.error);
      
      toast({
        title: 'An error occurred',
        description: 'The application encountered an unexpected error.',
        variant: 'destructive',
      });
    };

    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.error('Unhandled promise rejection:', event.reason);
      
      // You can log to a service here in production
      // logErrorToService(event.reason);
      
      toast({
        title: 'An error occurred',
        description: 'The application encountered an unexpected error.',
        variant: 'destructive',
      });
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}