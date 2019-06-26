import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import { editCard, deleteCard, addMember } from "../../redux/actions/cards";
import { ItemTypes } from "../../constants";

const styles = {
  card: {
    minWidth: 275,
    backgroudColor: '#FFB',
    marginTop: 10
  },
  highlightedCard: {
    minWidth: 275,
    backgroudColor: '#FFB',
    marginTop: 10
  },
  title: {
    fontSize: 14
  },
  icons: {
    textAlign: 'right'
  },
  formControl: {
    margin: 5,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: 15,
  }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return props.card
  },

  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return
  //   }

  //   // When dropped on a compatible target, do something
  //   const item = monitor.getItem()
  //   const dropResult = monitor.getDropResult()
  //   CardActions.moveCardToList(item.id, dropResult.listId)
  // },
}

const cardTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const columnId = monitor.getItem().columnId
    return columnId === props.card.columnId && props.card !== monitor.getItem()
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    //console.log("dropped " + monitor.getItem().id)
    //return { moved: true }
  },
}

function collectSource(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
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


class CardComponent extends Component {
  state = {
    isModalOpen: false,
    newCardName: this.props.card.name,
    newCardDescription: this.props.card.description,
    personName: this.props.users.requestState === "succeed" ? this.props.card.members.map(id => this.props.users.items.find(user => user.id == parseInt(id)).nickname) : []
  }

  handleEditClick = event => {
    event.stopPropagation();
    this.setState({ isModalOpen: true });
  }

  handleDeleteClick = (event, cardId) => {
    event.stopPropagation();
    this.props.deleteCard(cardId)
  }

  handleMembersChange = event => {
    const { card, auth, users } = this.props;
    this.setState({ personName: event.target.value });
    const members = event.target.value.map(nickname => users.items.find(user => user.nickname === nickname).id)
    addMember(card.id, members, auth.id, card.columnId, card.boardId);
  }

  render() {
    const { isModalOpen, newCardName, newCardDescription, personName } = this.state;
    const { connectDragSource, connectDropTarget, isOver, canDrop, classes, auth, card, editCard, history } = this.props;
    return connectDropTarget(connectDragSource(
      <div>
        <Card onClick={() => { history.push(`/card/${card.id}`) }} className={isOver && canDrop ? classes.highlightedCard : classes.card} style={isOver && canDrop ? { backgroundColor: '#FFB' } : {}}>
          <CardContent>
            {card.authorId === auth.id && (
              <div className={classes.icons}>
                <IconButton onClick={this.handleEditClick} aria-label="Delete">
                  <Icon color="error" style={{ fontSize: 15 }}>edit</Icon>
                </IconButton>
                <IconButton onClick={e => this.handleDeleteClick(e, card.id)} className={classes.icon} aria-label="Delete">
                  <Icon color="error" style={{ fontSize: 15 }}>delete</Icon>
                </IconButton>
              </div>)}
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {card.name}
            </Typography>
            <p>{card.description}</p>
          </CardContent>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Members</InputLabel>
            <Select
              onClick={e => {
                e.stopPropagation()
              }}
              multiple
              value={personName}
              onChange={this.handleMembersChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
              readOnly={false}
            >
              {this.props.users.items.map(({ nickname: name }) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Card>
        <Dialog open={isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
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
            <Button onClick={() => editCard(newCardName, newCardDescription, card.id)} color="primary">Edit</Button>
          </DialogActions>
        </Dialog>
      </div>));
  }
}

const mapStateToProps = ({ auth, users }) => ({ auth, users });

const mapDispatchToProps = dispatch => ({
  editCard: (name, description, cardId) => dispatch(editCard({ name, description, cardId })),
  deleteCard: cardId => dispatch(deleteCard(cardId)),
});

export default DropTarget(ItemTypes.CARD, cardTarget, collectTarget)(DragSource(ItemTypes.CARD, cardSource, collectSource)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(CardComponent)))));
