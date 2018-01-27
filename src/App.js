import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <input type="file" accept="image/*" capture/>
    );
  }
}
