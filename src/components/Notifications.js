import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
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
  const notifications = props.notifications.requestState === 'succeed' && props.auth.authState === 'loggedIn' ? props.notifications.items.filter(note => note.recipients && note.recipients.includes(props.auth.id.toString())) : [];
  return (
    <header className={classes.header}>
      <h1>Custom Trello</h1>
      {props.auth.authState === "unauthorized" && <div>
        <Button component={Link} to="/register" variant="contained" className={classes.button}>Register</Button>
        <Button component={Link} to="/login" variant="contained" className={classes.button}>Login</Button>
      </div>}
      {props.auth.authState === "loggedIn" && <div>
        <Link to={'/notifications'} target="_blank">
          <IconButton aria-label="notifications" color="inherit">
            <Badge badgeContent={notifications.length} color="secondary">
              <Icon color="error" style={{ fontSize: 30 }}>notifications</Icon>
            </Badge>
          </IconButton>
        </Link>
        <Button onClick={props.logOut} variant="contained" className={classes.button}>Logout</Button>
      </div>}
    </header>
  );
}

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});



export default connect(mapStateToProps, mapDispatchToProps)(Header);