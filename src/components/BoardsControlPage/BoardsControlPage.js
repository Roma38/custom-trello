import React, { Component } from 'react';
import { connect } from "react-redux";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { addBoard, getBoards } from '../../redux/actions/boards';

import BoardCard from "./BoardCard";




class BoardsControlPage extends Component {
  state = {
    isModalOpen: false,
    newBoardName: ""
  }

  componentDidMount() {
    this.props.getBoards();
  }

  createBoard = (name, authorId) => {
    this.props.addBoard(name, authorId);
    this.setState({
      isModalOpen: false,
      newBoardName: ""
    });
  }

  render() {
    const { newBoardName: name } = this.state;
    const { id: authorId } = this.props.auth
    return (
      <div>
        <h1>Pick a board or create new.</h1>
        <div className="wrapper">
          {this.props.boards.items.map(board => <BoardCard key={board.id} board={board} />)}
          <IconButton onClick={() => this.setState({ isModalOpen: true })} style={{ alignSelf: "center" }} aria-label="Delete">
            <Icon color="error" style={{ fontSize: 30 }}>add_circle</Icon>
          </IconButton>
          <Dialog open={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new board</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Board name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => this.setState({ newBoardName: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ isModalOpen: false })} color="primary">Cancel</Button>
              <Button onClick={() => this.createBoard(name, authorId)} color="primary">Create</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ auth, boards }) => ({ auth, boards });

const mapDispatchToProps = dispatch => ({
  addBoard: (name, authorId, members = []) => dispatch(addBoard({ name, authorId, members })),
  getBoards: () => dispatch(getBoards())
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsControlPage);