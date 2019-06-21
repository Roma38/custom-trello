import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 15,
    padding: 15,
    textAlign: "left"
  },
  title: {
    fontSize: 14,
  }
});

export default function CommentCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <p>{props.comment.text}</p>
    </Card>
  );
}