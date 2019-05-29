import mockSearchResults from './mock';
import YOUTUBE_API_KEY from '../config/config';

// this wrapper is to centralize all the data concerns in one place
class api {
  constructor() {
    // replace with a debounce
    this.fetchYouTubeResults = this.fetchYouTubeResults
  }

  async fetchYouTubeResults(searchText) {

    // rename the id field to vid because mongoose reserves the id field for its own use.
    let maxResults = 10;
    return await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${maxResults}&q=${searchText}&type=video&videoEmbeddable=true`)
    //return mockSearchResults;
  }

  async createTodo(todo) {
    console.log('Creating a ToDo in the backend');
    return await fetch('/api/v1/todo', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(todo), // body data type must match "Content-Type" header
    })
  }

  async readTodos() {
    console.log('Reading ToDos from the backend');
    return await fetch('/api/v1/todo');
  }

  async updateTodo(todo) {
    console.log('Creating a ToDo in the backend');
    return await fetch('/api/v1/todo', {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(todo), // body data type must match "Content-Type" header
    })
  }

  async deleteTodo(todo) {
    console.log(`Attempting to delete ${todo} from database`);
    return await fetch('/api/v1/todo', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(todo), // body data type must match "Content-Type" header
    })
  }

}

export default new api()