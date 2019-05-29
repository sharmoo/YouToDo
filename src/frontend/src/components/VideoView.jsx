import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <iframe width="100%" height="360px" src={`https://www.youtube.com/embed/${this.props.video.vid.videoId}`} allowFullScreen></iframe>
  }
}

class VideoDescription extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Paper width="100%">
      <Typography variant="subtitle2">{this.props.video.snippet.title}</Typography>
      <Typography variant="body2">{this.props.video.snippet.description}</Typography>
    </Paper>
  }
}

export default class VideoView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={3} justify="center"
        alignItems="center">
        <Grid item xs={12}>
          <VideoPlayer video={this.props.video}></VideoPlayer>
        </Grid>
        <Grid item xs={12}>
          <VideoDescription video={this.props.video}></VideoDescription>
        </Grid>
      </Grid>
    );
  }
}