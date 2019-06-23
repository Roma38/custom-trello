import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { getOneCard } from '../../redux/actions/cards';
import { getComments, addComment } from '../../redux/actions/comments';
import CommentCard from './CommentCard';

class CardPage extends Component {
  state = {
    isModalOpen: false,
    newComment: ""
  }

  componentDidMount() {
    this.props.comments.requestState === null && this.props.getComments(); //лучше сделать чтоб подтягивались комменты для конкретной карточки
  }  

  render() {
    const { newComment } = this.state;
    const { id: authorId } = this.props.auth;
    const { id: cardId } = this.props.match.params;
    const { comments, cards } = this.props;
    const card = cards.items.length ? cards.items.find(({ id }) => id === parseInt(cardId)) : {};

    return (
      <div>
        <h1>{cards.items.length && card.name}</h1>
        <p>{cards.items.length && card.description}</p>
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
      </div >
    )
  }
}

const mapStateToProps = ({ auth, boards, cards, comments }) => ({ auth, boards, cards, comments });

const mapDispatchToProps = dispatch => ({
  getComments: () => dispatch(getComments()),
  getOneCard: id => dispatch(getOneCard(id)),
  addComment: (text, authorId, cardId) => dispatch(addComment({ text, authorId, cardId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardPage));