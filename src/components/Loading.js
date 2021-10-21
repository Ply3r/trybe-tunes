import React, { Component } from 'react';
import loading from '../images/loading.gif';

class Loading extends Component {
  render() {
    return (
      <img className="loading" src={ loading } alt="loading" />
    );
  }
}

export default Loading;
