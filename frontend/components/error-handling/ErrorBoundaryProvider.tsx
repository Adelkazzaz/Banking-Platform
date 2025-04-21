"use client";

import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { GlobalErrorHandler } from './GlobalErrorHandler';

interface ErrorBoundaryProviderProps {
  children: ReactNode;
}

export function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
  return (
    <ErrorBoundary>
      <GlobalErrorHandler />
      {children}
    </ErrorBoundary>
  );
}