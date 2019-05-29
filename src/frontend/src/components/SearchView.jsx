import React from 'react';
import { AppBar, Button, Grid, TextField, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import api from '../data/api';
import _ from 'lodash';
console.log(api)

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <ListItem button onClick={e => this.props.selectSearchResult(this.props.result)}>
      <ListItemIcon>
        <img src={this.props.result.snippet.thumbnails.default.url}></img>
      </ListItemIcon>
      <ListItemText
        primary={this.props.result.snippet.title}
        secondary={this.props.result.snippet.description}
      />
      <ListItemIcon>
        <Button onClick={e => { e.stopPropagation(); this.props.addSearchResult(this.props.result) }}><AddToQueueIcon></AddToQueueIcon></Button>
      </ListItemIcon>
    </ListItem>
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }

    //debounce the fetch results
    this.fetchResults = _.debounce(this.fetchResults, 200)

    //and then bind it as usual
    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults() {
    api.fetchYouTubeResults(this.props.query)
      .then(results => results.json())
      // get the items off of the search response
      .then(results => results.items)
      .then(results => { console.log(results); return results })
      // do the remapping of the id field because mongoose reserves 'id' for its own use.
      .then(results => results.map(result => {
        result["vid"] = result["id"]
        delete result["id"];
        return result;
      }))
      .then(results => {
        this.setState({ results: results })
      })
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps) {
    // check to see whether the query has changed since React last updated the component
    // if it has, then query youtube, otherwise don't spam youtube.
    if (this.props.query !== prevProps.query) {
      this.fetchResults();
    }
  }

  render() {

    return <List>
      {this.state.results.map(result => <SearchResult result={result} addSearchResult={this.props.addSearchResult} selectSearchResult={this.props.selectSearchResult}></SearchResult>)}
    </List>
  }
}

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(query) {
    console.log(query)
    this.setState({ query: query });
  }

  render() {
    return (
      <Grid container justify="center"
        alignItems="center">
        <Grid item xs={0}>
          <SearchIcon style={{ fontSize: 50, justifyContent: "center" }}></SearchIcon>
        </Grid>
        <Grid item xs={11}>
          <TextField onChange={e => this.updateQuery(e.target.value)}
            id="filled-full-width"
            label="Search"
            style={{ margin: 8 }}
            placeholder="YouTube Search"
            fullWidth
            margin="normal"
            //variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SearchResults
            query={this.state.query}
            addSearchResult={this.props.addSearchResult}
            selectSearchResult={this.props.selectSearchResult}>
          </SearchResults>
        </Grid>
      </Grid>
    );
  }
}