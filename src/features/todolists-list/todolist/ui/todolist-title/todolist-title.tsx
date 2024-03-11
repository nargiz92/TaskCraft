import React, { FC, useCallback } from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolist/model/todolists.reducer";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks);
  const removeTodolistCallback = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    },
    [todolist.id, changeTodolistTitle]
  );

  return (
    <>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
        <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3></>
  );
};

export default TodolistTitle;