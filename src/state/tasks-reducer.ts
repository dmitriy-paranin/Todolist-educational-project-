import {TasksStateType} from "../App";
import {v1} from "uuid";
import {type} from "os";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskACType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type addTaskACType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todolistId: string
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    newTitle: string,
    todolistId: string
}

type ActionsType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let todolistTasks = state[action.todolistId];
            let filteredTasks = todolistTasks.filter(t => t.id !== action.id);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            let stateCopy = {...state};
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [task, ...todolistTasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state};
            let todolistTasks = stateCopy[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state};
            let todolistTasks = stateCopy[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.title = action.newTitle;
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId}
}
export const removeTaskAC = (id: string, todolistId: string): removeTaskACType => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}


