"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully', todos: todos });
});
router.delete('/todo/:id', (req, res, next) => {
    const params = req.params;
    const todoId = params.id;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(200).send({ message: 'Todo deleted successfully', todos: todos });
});
router.put('/todo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const body = req.body;
    const todoId = params.id;
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index >= 0) {
        todos[index] = { id: todos[index].id, text: body.text };
        return res.status(200).send({ message: 'Todo edited successfully', todos: todos });
    }
    res.status(404).send({ message: 'Todo not found' });
}));
exports.default = router;
