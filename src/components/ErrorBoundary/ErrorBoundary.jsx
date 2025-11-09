import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = {
      hasError: true,
      error,
      errorInfo
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="text-center px-4 max-w-2xl">
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-error opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 text-error">
              Oops! Something Broke
            </h1>
            
            <p className="text-xl mb-4 text-base-content/70">
              We encountered an unexpected error while rendering this page.
            </p>

            {this.state.error && (
              <div className="bg-base-300 rounded-lg p-4 mb-6 text-left">
                <p className="font-mono text-sm text-error break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Reload Page
              </button>
              <Link to="/" className="btn btn-outline">
                Go to Home
              </Link>
            </div>

            <div className="mt-8 text-sm text-base-content/50">
              If the problem persists, please contact support.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
