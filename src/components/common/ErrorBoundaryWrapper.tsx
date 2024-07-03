// components/common/ErrorBoundaryWrapper.tsx
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorReturn } from './ErrorBoundary';

const ErrorBoundaryWrapper= ({ children }:{children:React.ReactNode}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorReturn}
      onReset={() => (location.href = '/')}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
