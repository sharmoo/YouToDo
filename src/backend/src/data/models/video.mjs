import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
var VideoSchema = new mongoose.Schema({
  kind: {
    type: 'String'
  },
  etag: {
    type: 'String'
  },
  vid: {
    kind: {
      type: 'String'
    },
    videoId: {
      type: 'String'
    }
  },
  snippet: {
    publishedAt: {
      type: 'Date'
    },
    channelId: {
      type: 'String'
    },
    title: {
      type: 'String'
    },
    description: {
      type: 'String'
    },
    thumbnails: {
      default: {
        url: {
          type: 'String'
        },
        width: {
          type: 'Number'
        },
        height: {
          type: 'Number'
        }
      },
      medium: {
        url: {
          type: 'String'
        },
        width: {
          type: 'Number'
        },
        height: {
          type: 'Number'
        }
      },
      high: {
        url: {
          type: 'String'
        },
        width: {
          type: 'Number'
        },
        height: {
          type: 'Number'
        }
      }
    },
    channelTitle: {
      type: 'String'
    },
    liveBroadcastContent: {
      type: 'String'
    }
  }
});
const Video = mongoose.model('Video', VideoSchema);

export default Video;
export { VideoSchema };