import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  todolistsThunks
} from "features/todolists-list/todolist/model/todolists.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "features/todolists-list/todolist/ui/todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTasks } from "features/todolists-list/tasks/model/tasks.selectors";
import { selectTodolists } from "features/todolists-list/todolist/model/todolists.selectors";
import s from 'features/todolists-list/todolist/ui/todolists-list.module.css'

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {addTodolist, fetchTodolists} = useActions(todolistsThunks);



  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists({});
  }, []);



  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={s.todobox}>
      <Grid container className={s.cridContainerStyle}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper className={s.nextContainer}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}

                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
