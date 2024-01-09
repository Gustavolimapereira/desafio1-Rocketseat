import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';


const app = express()
const port = process.env.port || 3000

app.use(bodyParser.json());

const tasks = []

function validateTask(req, res, next){
    const taskId = req.params.id
    const task = tasks.find(item => item.id === taskId)

    if(!task){
        return res.status(400).json({error: 'Tarefa não encontrada'})
    }

    req.task = task
    next();
}

app.post('/tasks', (req, res) => {
    const {title, description} = req.body
    const id = uuidv4().substring(0, 4)
    const createdAt = new Date()
    const updatedAt = createdAt
    const completedAt = null

    const newTask = {id, title, description, createdAt, updatedAt, completedAt}
    tasks.push(newTask)

    res.status(201).json(newTask)
})


app.get('/tasks', (req, res) => {
    res.status(201).json(tasks)
}) 

app.put('/tasks/:id', validateTask, (req, res) => {
    const { title, description } = req.body;
  const task = req.task;

  if (title) {
    task.title = title;
  }

  if (description) {
    task.description = description;
  }

  task.updatedAt = new Date();

  res.json(task);

})

app.delete('/tasks/:id', validateTask, (req, res) => {

const taskId = req.params.id
const taskIndex = tasks.findIndex(item => item.id === taskId);
console.log(taskIndex)

tasks.splice(taskIndex, 1);

res.json({ message: 'Task deleted successfully' });
})

app.patch('/tasks/:id/complete', validateTask, (req, res) => {
    const task = req.task
    task.completedAt = new Date()
    console.log(task)

    res.json(task);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });