import { useErrorBoundary } from "react-error-boundary";

export const ErrorReturn = () => {
    const { resetBoundary } = useErrorBoundary();
  
    return (
      <div >
        <button onClick={resetBoundary}>Try again</button>
      </div>
    );
  };