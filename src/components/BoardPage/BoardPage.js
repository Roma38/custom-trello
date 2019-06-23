import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { getColumns, addColumn } from '../../redux/actions/columns';
import { getBoards } from '../../redux/actions/boards';
import { getCards } from '../../redux/actions/cards';

import ColumnComponent from "./ColumnComponent";




class BoardPage extends Component {
  state = {
    isModalOpen: false,
    newColumnName: ""
  }

  addColumnHandler = (name, authorId, boardId) => {
    this.props.addColumn(name, authorId, boardId);
    this.setState({
      isModalOpen: false,
      newColumnName: ""
    });
  }

  render() {
    const { newColumnName: name } = this.state;
    const { id: authorId } = this.props.auth;
    const { id: boardId } = this.props.match.params;
    const { columns, boards } = this.props;
    
    return (
      <div>
        {<h1>{boards.items.length && boardId && boards.items.find(({ id }) => id === parseInt(boardId)).name}</h1>}
        <div className="wrapper columnsBoard">
          {columns.items.map(column => column.boardId === boardId && <ColumnComponent key={column.id} column={column} />)}
          <IconButton onClick={() => this.setState({ isModalOpen: true })} style={{ alignSelf: "center" }} aria-label="Delete">
            <Icon color="error" style={{ fontSize: 30 }}>add_circle</Icon>
          </IconButton>
          <Dialog open={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} aria-labelledby="form-dialog-title">
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
          </Dialog>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ auth, boards, columns }) => ({ auth, boards, columns });

const mapDispatchToProps = dispatch => ({
  addColumn: (name, authorId, boardId, order = 1) => dispatch(addColumn({ name, authorId, boardId, order })),
  getColumns: () => dispatch(getColumns()),
  getBoards: () => dispatch(getBoards()),
  getCards: () => dispatch(getCards())
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(withRouter(BoardPage)));
