import React, { Component } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom";

import { addCard } from '../../redux/actions/cards';
import CardComponent from './CardComponent';



const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class ColumnComponent extends Component {
  state = {
    isModalOpen: false,
    newCardName: "",
    newCardDescription: ""
  }

  addCardHandler = (name, authorId, columnId, description) => {
    this.props.addCard(name, authorId, columnId, description);
    this.setState({
      isModalOpen: false,
      newCardName: "",
      newCardDescription: ""
    });
  }

  render() {
    const { classes, cards, column, auth } = this.props;
    const { newCardName, newCardDescription } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {this.props.column.name}
          </Typography>

          <div className={classes.wrapper}>
            {cards.items.map(card => card.columnId == column.id && <CardComponent key={card.id} card={card} />)}

            <IconButton onClick={() => this.setState({ isModalOpen: true })} aria-label="Delete">
              <Icon color="error" style={{ fontSize: 30 }}>add_circle</Icon>
            </IconButton>
          </div>

          <Dialog open={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new Card</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Card title"
                type="text"
                fullWidth
                value={newCardName}
                onChange={(e) => this.setState({ newCardName: e.target.value })}
              />
              <TextField
                margin="dense"
                id="description"
                label="Card description"
                type="text"
                multiline
                rows="4"
                fullWidth
                value={newCardDescription}
                onChange={(e) => this.setState({ newCardDescription: e.target.value })}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ isModalOpen: false })} color="primary">Cancel</Button>
              <Button onClick={() => this.addCardHandler(newCardName, auth.id, column.id, newCardDescription)} color="primary">Create</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth, boards, columns, cards }) => ({ auth, boards, columns, cards });

const mapDispatchToProps = dispatch => ({
  addCard: (name, authorId, columnId, description, order = 1, members = [authorId]) => dispatch(addCard({ name, authorId, columnId, description, order, members })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ColumnComponent));