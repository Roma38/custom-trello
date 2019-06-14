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

import { addBoard } from '../redux/actions/boards'

class Boards extends Component {
  state = {
    isModalOpen: false,
    newBoardName: ""
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Pick a board or create new.</h1>

        <IconButton aria-label="Delete">
          <Icon onClick={() => this.setState({ isModalOpen: true })} color="error" style={{ fontSize: 30 }}>add_circle</Icon>
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
              value={this.state.newBoardName}
              onChange={(e) => this.setState({ newBoardName: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ isModalOpen: false })} color="primary">
              Cancel
            </Button>
            <Button onClick={() => { }/* this.props.boards.addBoard */} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}

const mapStateToProps = ({ auth, boards }) => ({ auth, boards });

const mapDispatchToProps = dispatch => ({
  addBoard: (name, userId) => dispatch(addBoard(name, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);