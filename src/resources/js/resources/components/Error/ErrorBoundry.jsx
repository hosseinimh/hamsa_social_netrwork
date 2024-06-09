import React from "react";

import FallbackError from "./FallbackError";
import { Error as HttpError } from "../../../http/entities";
import utils from "../../../utils/Utils";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorObj = new HttpError();
    errorObj.store(error.stack.toString(), errorInfo.componentStack.toString());
  }

  render() {
    if (this.state.hasError) {
      utils.clearLS();
      return <FallbackError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
