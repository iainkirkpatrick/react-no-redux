import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
HI MICHAEL :D

playing with no-redux, what does it look like to just use local state in a top-level component of an app, and instead of creating a bunch of wrapper functions around setState for specific slices of state, just pass down the setState function? and a generic function to get anything out of that state?

redux-busting?
*/

class App extends Component {
  constructor() {
    super()
    this.state = {
      testing: 123
    }
    this.getStore = this.getStore.bind(this)
    this.setStore = this.setStore.bind(this)
  }
  
  getStore (store) {
    return (key) => {
      return store[key]
    }
  }
  
  setStore (setter) {
    return (newState) => {
      setter(newState)
      /* other ways */
      // const boundSetter = setter.bind(this) // must bind this so that under-the-hood methods work
      // boundSetter(newState)
      // this.setState(newState) // this piece means it works, not sure why setter(newState) doesnt tho
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <One getAppStore={this.getStore(this.state)} setAppStore={this.setStore(this.setState.bind(this))} />
      </div>
    );
  }
}

export default App;

function One (props) {
  return <div>
    <span>ONE</span>
    <Two {...props} />
  </div>
}

function Two (props) {
  return <div>
    <span>TWO</span>
    <Three {...props} />
  </div>
}

class Three extends Component {
  componentDidMount() {
    this.props.setAppStore({ testing: 456 })
  }
  
  render() {
    const { getAppStore, setAppStore } = this.props
    console.log(getAppStore('testing'))
    return <div>
      <span>THREE</span>
    </div>
  }
}

