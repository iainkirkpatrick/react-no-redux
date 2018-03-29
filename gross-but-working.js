import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
wow... what about a goofy hack where you have two top-level components, you declare app state (as local state) in the topmost one, pass it down to the second one, second one contains setState functions for lower levels to update state... but if you need to re-up those setState functions you can use lifecycle hooks like omponentWillReceiveProps to re-up

basically gets around there not being a lifecycle hook componentStateDidUpdate or something wack like that
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
    return function (key) {
      return store[key]
    }
  }

  setStore (setter) {
    console.log(this)
    return function (newState) {
      console.log(this)
      // setter(newState)
      this.setState(newState) // this piece means it works, not sure why setter(newState) doesnt tho
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <One getAppStore={this.getStore(this.state)} setAppStore={this.setStore(this.setState).bind(this)} />
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
