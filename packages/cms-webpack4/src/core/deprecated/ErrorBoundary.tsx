import React from "react";

class ErrorBoundaryProps {
  children?: React.ReactNode;
  errorComponent: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }


    componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        const ErrorComponent = this.props.errorComponent;
        if (this.state.hasError) {
            // You can render any custom fallback UI
            // return <h1>Something went wrong.</h1>;
            return ErrorComponent;
        }

        return this.props.children;
    }
}
export { ErrorBoundary };
