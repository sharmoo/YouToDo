import express from 'express';
import Todo from './data/models/todo.mjs';
const app = express();

app.use(express.json());

app.get('/api/v1/todo', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.error(`failed with error ${err}`)
      res.status(501).send(JSON.stringify(err))
    } else {
      console.log(`successfully fetched: ${todos}`)
      res.status(200).send(JSON.stringify(todos))
    }
  })
})

app.post('/api/v1/todo', (req, res) => {
  console.log(req.body);
  const todo = new Todo(req.body);
  todo.save(
    err => {
      if (err) {
        console.error(`failed with error ${err}`)
        // 500 is internal service error
        res.status(500).send(JSON.stringify(err))
      } else {
        console.log(`successfully saved: ${todo}`)
        res.status(200).send(JSON.stringify(todo))
      }
    }
  );
})

app.put('/api/v1/todo', (req, res) => {
  // 501 is not implemented
  console.log("updating todo")
  Todo.updateOne({ _id: req.body._id }, req.body, (err, updated) => {
    if (err) {
      console.error(`failed to update ${req.body}`);
      res.status(500).send(JSON.stringify(err))
    } else {
      console.log(`successfully updated to ${updated}`);
      res.status(200).send(JSON.stringify(updated));
    }
  })
});

app.delete('/api/v1/todo', (req, res) => {
  console.log("deleting todo")
  Todo.deleteOne({ _id: req.body._id }, err => {
    if (err) {
      console.error(`failed to delete ${req.body} fron database`)
      res.status(500).send(JSON.stringify(err))
    } else {
      console.log(`successfully deleted ${req.body}`);
      res.status(200).send({ status: "ok" });
    }
  });
})

app.listen(9000, () => {
  console.log("listening");
})