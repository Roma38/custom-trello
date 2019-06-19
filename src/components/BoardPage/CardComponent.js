import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import { relative } from 'path';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    position: 'relative'
  },
  title: {
    fontSize: 14
  },
  icons: {
    textAlign: 'right'
    // position: 'absolute',
    // top: 0,
    // right: 0
    //float: 'right'
  }
});

function CardComponent(props) {
  const classes = useStyles();

  return (
    <ButtonBase component={Link} to={`/card/${props.card.id}`}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.card.authorId === props.auth.id && (
              <div className={classes.icons}>
                <IconButton /* onClick={() => this.setState({ isModalOpen: true })} */ aria-label="Delete">
                  <Icon color="error" style={{ fontSize: 15 }}>edit</Icon>
                </IconButton>
                <IconButton /* onClick={() => this.setState({ isModalOpen: true })} */ className={classes.icon} aria-label="Delete">
                  <Icon color="error" style={{ fontSize: 15 }}>delete</Icon>
                </IconButton>
              </div>)}
            {props.card.name}
          </Typography>
          <p>{props.card.description}</p>
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
  );
}

const mapStateToProps = ({ auth }) => ({ auth });

// const mapDispatchToProps = dispatch => ({
//   addCard: (name, authorId, columnId, description, order = 1, members = [authorId]) => dispatch(addCard({ name, authorId, columnId, description, order, members })),
// });

export default connect(mapStateToProps)(CardComponent);