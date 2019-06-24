import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";

import Header from "./components/Header";
import LoginPage from "./components/AuthPages/LoginPage";
import RegisterPage from "./components/AuthPages/RegisterPage";
import BoardsControlPage from "./components/BoardsControlPage/BoardsControlPage";
import BoardPage from "./components/BoardPage/BoardPage";
import { getUsers } from "./redux/actions/users";
import { authSucceed } from "./redux/actions/auth";
import { getBoards } from "./redux/actions/boards"; 
import { getColumns } from "./redux/actions/columns";
import { getCards } from "./redux/actions/cards";
import CardPage from './components/CardPage/CardPage';

class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');

    this.props.getColumns();
    this.props.getCards();
    this.props.getBoards()
    if (id && token) this.props.authSucceed({ id, token, nickname, email });
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth={false}>
          <Header />
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/halls" />} />*/}
            <Route path="/card/:id" component={CardPage} /> 
            <Route path="/board/:id" component={BoardPage} />}  />
            <Route exact path="/boards" component={BoardsControlPage}/>
            <Route path="/register" render={() => this.props.auth.authState === "loggedIn" ? <Redirect to="/boards" /> : <RegisterPage />}  />
            <Route path="/login" render={() => this.props.auth.authState === "loggedIn" ? <Redirect to="/boards" /> : <LoginPage />} />
          </Switch>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = ({ auth, users, boards }) => ({ auth, users, boards });

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  authSucceed: payload => dispatch(authSucceed(payload)),
  getBoards: () => dispatch(getBoards()),
  getColumns: () => dispatch(getColumns()),
  getCards: () => dispatch(getCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);