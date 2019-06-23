import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { DropTarget } from 'react-dnd';
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

import { addCard, changeColumn } from '../../redux/actions/cards';
import CardComponent from './CardComponent';
import { ItemTypes } from "../../constants"

const styles = {
  card: {
    minWidth: 275
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
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  colWrapper: {
    marginRight: 10
  }
};

const cardTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const columnId = monitor.getItem().columnId
    return columnId != props.column.id
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }
    
    props.changeColumn(props.column.id, monitor.getItem().id);
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    item: monitor.getItem()
  };
}

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
    const { classes, cards, column, auth, isOver, canDrop, connectDropTarget } = this.props;
    const { newCardName, newCardDescription } = this.state;

    return connectDropTarget(
      <div className={classes.colWrapper}>
        <Card className={classes.card} style={isOver && canDrop ? { backgroundColor: '#FFB' } : {}}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {column.name}
            </Typography>

            <div className={classes.cardWrapper}>
              {cards.items.map(card => card.columnId == column.id && <CardComponent key={card.id} card={card} />)}

              <IconButton onClick={() => this.setState({ isModalOpen: true })} style={{ alignSelf: "center" }} aria-label="Delete">
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
      </div>
    );
  }
}

const mapStateToProps = ({ auth, boards, columns, cards }) => ({ auth, boards, columns, cards });

const mapDispatchToProps = dispatch => ({
  addCard: (name, authorId, columnId, description, order = 1, members = [authorId]) => dispatch(addCard({ name, authorId, columnId, description, order, members })),
  changeColumn: (columnId, id) => dispatch(changeColumn({ columnId, id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropTarget(ItemTypes.CARD, cardTarget, collectTarget)(ColumnComponent)));