import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// import { getColumns, addColumn } from '../../redux/actions/columns';
// import { getBoards } from '../../redux/actions/boards';
import { getOneCard } from '../../redux/actions/cards';
import { getComments, addComment } from '../../redux/actions/comments';
import CommentCard from './CommentCard';



//import ColumnComponent from "./ColumnComponent";




class CardPage extends Component {
  state = {
    isModalOpen: false,
    newComment: ""
  }

  componentDidMount() {
    if (!this.props.cards.items.length) this.props.getOneCard(this.props.match.params.id);
    this.props.getComments();
    // this.props.getColumns();
    // this.props.getCards();    
  }

  // addColumnHandler = (name, authorId, boardId) => {
  //   this.props.addColumn(name, authorId, boardId);
  //   this.setState({
  //     isModalOpen: false,
  //     newColumnName: "",
  //     newComment: ""
  //   });
  // }

  render() {
    const { newComment } = this.state;
    const { id: authorId } = this.props.auth;
    const { id: cardId } = this.props.match.params;
    const { comments } = this.props;
    const card = this.props.cards.items.length ? this.props.cards.items.find(({ id }) => id == cardId) : {};

    return (
      <div>
        <h1>{card.name}</h1>
        <p>{card.description}</p>
        <TextField
          id="addCommentField"
          label="Add comment"
          multiline
          rows="4"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newComment}
          onChange={(e) => this.setState({ newComment: e.target.value })}
        />
        <ButtonGroup>
          <Button onClick={() => this.props.addComment(newComment, authorId, cardId)} variant="contained" disabled={!newComment}>Add</Button>
          <Button onClick={() => this.setState({ newComment: "" })} variant="contained" disabled={!newComment}>Reset</Button>
        </ButtonGroup>
        {comments.items.map(comment => comment.cardId == cardId && <CommentCard key={comment.id} comment={comment} />)}

        {/* columns.items.map(column => column.boardId == boardId && <ColumnComponent key={column.id} column={column} />) */}
        {/* <IconButton onClick={() => this.setState({ isModalOpen: true })} aria-label="Delete">
            <Icon color="error" style={{ fontSize: 30 }}>add_circle</Icon>
          </IconButton> */}
        {/* <Dialog open={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new Column</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Column title"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => this.setState({ newColumnName: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ isModalOpen: false })} color="primary">Cancel</Button>
              <Button onClick={() => this.addColumnHandler(name, authorId, boardId)} color="primary">Create</Button>
            </DialogActions>
          </Dialog> */}
      </div >
    )
  }
}

const mapStateToProps = ({ auth, cards, comments }) => ({ auth, cards, comments });

const mapDispatchToProps = dispatch => ({
  getComments: () => dispatch(getComments()),
  getOneCard: id => dispatch(getOneCard(id)),
  addComment: (text, authorId, cardId) => dispatch(addComment({ text, authorId, cardId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardPage));