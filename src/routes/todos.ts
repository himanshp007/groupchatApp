import {Router} from 'express';
import {Todo} from '../models/todo';

let todos : Todo[]= [];
type RequestBody = {text: string};
type RequestParams = {id: string};

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos});
});

router.post('/todo', (req, res, next) => {

    const body = req.body as RequestBody;
    const newTodo : Todo = {
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newTodo);
    res.status(201).json({message: 'Todo added successfully', todos:todos});
});




router.delete('/todo/:id', (req, res, next) => {
    const params = req.params as RequestParams;
    const todoId = params.id;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).send({ message: 'Todo deleted successfully', todos:todos});
});



router.put('/todo/:id', async(req, res, next) => {

    const params = req.params as RequestParams;
    const body = req.body as RequestBody;
    const todoId = params.id;
    const index = todos.findIndex(todo => todo.id === todoId);

    if (index >= 0) {
        todos[index] = {id: todos[index].id, text: body.text};
        return res.status(200).send({ message: 'Todo edited successfully', todos: todos});
    }
    res.status(404).send({ message: 'Todo not found' });
});


export default router;