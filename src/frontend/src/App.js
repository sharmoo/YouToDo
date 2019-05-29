import React from 'react';
import './App.css';
import { Grid, Paper } from '@material-ui/core';
import ToDoView from './components/ToDoView';
import VideoView from './components/VideoView';
import SearchView from './components/SearchView';
import api from './data/api';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      video: { vid: { videoId: "" }, snippet: { title: "", description: "" } }
    }

    this.addSearchResultAsToDo = this.addSearchResultAsToDo.bind(this);
    this.setSearchResultAsActive = this.setSearchResultAsActive.bind(this);
    this.selectToDoHandler = this.selectToDoHandler.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
  }

  componentDidMount() {
    api
      .readTodos()
      .then(todos => todos.json())
      .then(todos => {
        console.log(`fetched ${todos} from backend`)
        this.setState({ todos: todos })
      })
  }

  addToDo(todo) {
    console.log("Sending a todo to backend");
    console.log(todo)
    api.createTodo(todo)
      .then(todo => todo.json())
      .then(todo => { console.log(`received ${JSON.stringify(todo)} from backend`); return todo })
      .then(todo => {
        let todos = this.state.todos.concat(todo)
        this.setState({ todos: todos })
      })
  }

  updateToDo(todo) {
    //#TODO implement backend communication here.
    console.log("Updating a todo, waiting for backend confirmation")
    console.log(todo);
    api.updateTodo(todo)
      .then(response => response.json())
      .then(response => {
        console.log(JSON.stringify(response))
        let indexToModify = this.state.todos.indexOf(todo)
        // if not found do nothing
        if (indexToModify === -1) {
          return
        }
        // get a copy of the array we can safely splice so that we do not modify state directly
        let todos = this.state.todos.slice();
        //overwrite the old todo with the modified one.
        todos[indexToModify] = todo;
        // now let react handle updating the view.
        this.setState({ todos: todos });
      })
  }

  deleteToDo(todo) {
    console.log("Deleting a todo, waiting for backend confirmation")
    console.log(todo)
    api.deleteTodo(todo)
      .then(response => response.json())
      .then(response => {
        console.log(JSON.stringify(response));
        let indexToDelete = this.state.todos.indexOf(todo)
        // if not found do nothing
        if (indexToDelete === -1) {
          return
        }
        // get a copy of the array we can safely splice so that we do not modify state directly
        let todos = this.state.todos.slice();
        // splice out the element we want to remove from the todo list
        todos.splice(indexToDelete, 1);
        // now let react handle updating the view.
        this.setState({ todos: todos });
      })
  }

  addSearchResultAsToDo(searchResult) {
    let todo = {
      type: "video",
      title: searchResult.snippet.title,
      description: searchResult.snippet.description,
      done: false,
      video: searchResult
    }
    this.addToDo(todo);
  }

  setSearchResultAsActive(searchResult) {
    this.setState({ video: searchResult });
  }

  selectToDoHandler(todo) {
    if (todo.type === "video") {
      this.setState({ video: todo.video })
    }
  }

  render() {
    return (
      <Grid container justify="center"
        alignItems="center" xs={12}>
        <Grid container justify="center"
          alignItems="center" xs={12}>
          <Grid item xs={6}>
            <VideoView
              video={this.state.video}>
            </VideoView>
          </Grid>
          <Grid item xs={6}>
            <ToDoView
              todos={this.state.todos}
              selectToDo={this.selectToDoHandler}
              addToDo={this.addToDo}
              updateToDo={this.updateToDo}
              deleteToDo={this.deleteToDo}>
            </ToDoView>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <SearchView
              addSearchResult={this.addSearchResultAsToDo}
              selectSearchResult={this.setSearchResultAsActive}
              search={query => api.fetchYouTubeResults(query)}>
            </SearchView>
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

export default App;
