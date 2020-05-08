import React, { Component } from 'react';
import Splash from './components/Splash/Splash.js'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardContainer from './components/Dashboard/DashboardContainer';
import Error from './components/Error.js'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/visualize" component={DashboardContainer} />
              <Route component={Error} />
            </Switch>
        </BrowserRouter>
    );
  }
}