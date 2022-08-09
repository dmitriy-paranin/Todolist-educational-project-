import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
[key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistsId1 = v1();
    let todolistsId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"},
    ]);
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistsId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ],
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
       }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
        }


    const removeTodolist = (todolistsId: string) => {
        const action = removeTodolistAC(todolistsId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle));
        }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId));
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
