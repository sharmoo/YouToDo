import React from 'react';
import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, TextField, Grid, Fab, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MovieIcon from '@material-ui/icons/Movie';
import DeleteIcon from '@material-ui/icons/Delete'
class ToDoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }

    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.addToDoButtonHandler = this.addToDoButtonHandler.bind(this);
  }

  titleChangeHandler(title) {
    this.setState({ title: title });
  }

  descriptionChangeHandler(description) {
    this.setState({ description: description });
  }

  addToDoButtonHandler() {
    if (this.state.title === "") {
      return;
    }
    this.props.addToDo({ type: "todo", title: this.state.title, description: this.state.description, done: false });
    this.setState({ title: "", description: "" }) //bug
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid container xs={10}>
          <Grid item xs={12}>
            <TextField
              placeholder="Title"
              fullWidth
              onChange={e => this.titleChangeHandler(e.target.value)}
            >
              {this.state.title}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Description"
              fullWidth
              onChange={e => this.descriptionChangeHandler(e.target.value)}
            >
              {this.state.description}
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Fab color="secondary" onClick={this.addToDoButtonHandler}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTodo = this.toggleTodo.bind(this);
  }
  toggleTodo(todo) {
    todo.done = !todo.done;
    this.props.updateToDo(todo);
  }

  render() {
    return (
      <ListItem button onClick={e => this.props.selectToDo(this.props.todo)}>
        <ListItemIcon>
          {this.props.todo.type === "todo" ? <AssignmentIcon></AssignmentIcon> : <MovieIcon></MovieIcon>}
        </ListItemIcon>
        <ListItemText
          primary={this.props.todo.title}
          secondary={this.props.todo.description}
        />
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={this.props.todo.done}
            tabIndex={-1}
            //disableRipple
            onClick={e => { e.stopPropagation(); this.toggleTodo(this.props.todo) }}
          />
        </ListItemIcon>
        <ListItemIcon>
          <Button
            onClick={e => { e.stopPropagation(); this.props.deleteToDo(this.props.todo) }}
          >
            <DeleteIcon color="secondary"></DeleteIcon>
          </Button>
        </ListItemIcon>
      </ListItem>
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <List
          maxHeight="300px"
          overflow="auto">
          {this.props.todos.map(todo => <ToDoItem
            todo={todo}
            selectToDo={this.props.selectToDo}
            updateToDo={this.props.updateToDo}
            deleteToDo={this.props.deleteToDo}
          ></ToDoItem>)}
        </List>
        <ToDoInput addToDo={this.props.addToDo}></ToDoInput>
      </Container>
    );
  }
}

export default class ToDoView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToDoList
        todos={this.props.todos}
        selectToDo={this.props.selectToDo}
        addToDo={this.props.addToDo}
        deleteToDo={this.props.deleteToDo}
        updateToDo={this.props.updateToDo}
      >
      </ToDoList>
    );
  }
}