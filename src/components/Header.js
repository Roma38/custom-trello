import React from 'react';
import { Link } from "react-router-dom";
//import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

import { logOut } from '../redux/actions/auth'



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

function Header(props) {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1>Custom Trello</h1>
      {props.auth.authState === "unauthorized" && <div>
        <Button component={Link} to="/" variant="contained" className={classes.button}>Register</Button>
        <Button component={Link} to="/login" variant="contained" className={classes.button}>Login</Button>
      </div>}
      {props.auth.authState === "loggedIn" && <div>
        <Button onClick={props.logOut} variant="contained" className={classes.button}>Logout</Button>
      </div>}
    </header>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});



export default connect(mapStateToProps, mapDispatchToProps)(Header);