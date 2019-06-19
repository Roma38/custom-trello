import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";

import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BoardsControlPage from "./components/BoardsControlPage/BoardsControlPage";
import BoardPage from "./components/BoardPage/BoardPage";
import { getUsers } from "./redux/actions/users";
import { authSucceed } from "./redux/actions/auth";
import CardPage from './components/CardPage/CardPage';

class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    //id, email, nickname, token
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');

    if (id && token) this.props.authSucceed({id, token, nickname, email});    
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/halls" />} />*/}
            <Route path="/card/:id" component={CardPage} />
            <Route path="/board/:id" component={BoardPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/boards" component={BoardsControlPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = ({ auth, users }) => ({ auth, users });

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  authSucceed: payload => dispatch(authSucceed(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);