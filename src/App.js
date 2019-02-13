import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import MainContactsComp from './components/MainContactsComp';
import ViewContactDetails from './components/ViewContactDetails';

class App extends Component {
  render() {
    return (
      <HashRouter>
      <Switch>
        <Route exact path="/" name="Login Page" component={MainContactsComp} />
        <Route exact path="/contactdetails" name="Contact Details" component={ViewContactDetails} />
      </Switch>
    </HashRouter>
    );
  }
}

export default App;
