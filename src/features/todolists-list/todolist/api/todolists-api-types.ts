import { instance } from "common/api/common.api";



export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};
