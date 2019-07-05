import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";

import { deleteNotification } from '../redux/actions/notifications'

const useStyles = makeStyles(() => ({
  list: {
    maxWidth: 600,
    margin: '0 auto'
  },
}));

  

function Notifications(props) {
  const classes = useStyles();
  const notifications = props.notifications.items.filter(note => note.recipients.includes(props.auth.id));

  return (
    <List dense className={classes.list}>
      {notifications.map(note => <ListItem key={note.id}>
        <ListItemAvatar>
          <Avatar>
            <Icon>drafts</Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={note.name}
          secondary={note.text}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Delete" onClick={() => props.deleteNotification(note.id)}>
            <Icon >delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      )}
    </List>
  );
}

const mapStateToProps = ({ auth, notifications }) => ({ auth, notifications });

const mapDispatchToProps = dispatch => ({
  deleteNotification: id => dispatch(deleteNotification(id))
});



export default connect(mapStateToProps, mapDispatchToProps)(Notifications);