"use client";

import { Component } from "react";

class CustomErrorBoundary extends Component {



  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
        hasError: true,
    });

    // TODO: log the error somewhere in the db
}


  render() {

    console.log(this.state.hasError)

    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return this.props.fallback
    }

    return this.props.children; 
  }
}

export default CustomErrorBoundary
  