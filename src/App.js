import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";

import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Boards from "./components/Boards";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/halls" />} />
            <Route path="/halls" component={HallsPage} />
            <Route path="/hall/:id" component={Calendar} />
            <Route path="/register" component={RegisterPage} /> */}
            <Route exact path="/" component={Boards} />
            <Route path="/login" component={LoginPage} />
          </Switch>
      </Container>
    </div>
  );
}

export default App;
