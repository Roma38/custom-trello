import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

import { ItemTypes } from "../../constants"

const styles = {
  card: {
    minWidth: 275,
    backgroudColor: '#FFB'
  },
  highlightedCard: {
    minWidth: 275,
    backgroudColor: '#FFB'
  },
  title: {
    fontSize: 14
  },
  icons: {
    textAlign: 'right'
  }
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

  render() {
    const { classes } = this.props;
    const { connectDragSource, connectDropTarget, isOver, canDrop } = this.props;

    return connectDropTarget(connectDragSource(
      <div>
        <ButtonBase component={Link} to={`/card/${this.props.card.id}`}>
          <Card className={isOver && canDrop ? classes.highlightedCard : classes.card} style={isOver && canDrop ? { backgroundColor: '#FFB' } : {}}>
            <CardContent>
              {this.props.card.authorId === this.props.auth.id && (
                <div className={classes.icons}>
                  <IconButton /* onClick={() => this.setState({ isModalOpen: true })} */ aria-label="Delete">
                    <Icon color="error" style={{ fontSize: 15 }}>edit</Icon>
                  </IconButton>
                  <IconButton /* onClick={() => this.setState({ isModalOpen: true })} */ className={classes.icon} aria-label="Delete">
                    <Icon color="error" style={{ fontSize: 15 }}>delete</Icon>
                  </IconButton>
                </div>)}
              <Typography className={classes.title} color="textSecondary" gutterBottom>

                {this.props.card.name}
              </Typography>
              <p>{this.props.card.description}</p>
            </CardContent>

            {/* <Dialog open={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
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
        </Dialog> */}
          </Card>
        </ButtonBase>
      </div>));
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

// const mapDispatchTothis.props = dispatch => ({
//   addCard: (name, authorId, columnId, description, order = 1, members = [authorId]) => dispatch(addCard({ name, authorId, columnId, description, order, members })),
// });

export default DropTarget(ItemTypes.CARD, cardTarget, collectTarget)(DragSource(ItemTypes.CARD, cardSource, collectSource)(connect(mapStateToProps)(withStyles(styles)(CardComponent))));
