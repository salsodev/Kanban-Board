import { createSlice } from "@reduxjs/toolkit";

let nextID = 1;
let nextSubtaskID = 0.1;

const slice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    todoAdded: (todos, action) => {
      const subtask = action.payload.subtasks.map((subtask) => {
        subtask.id = nextID + nextSubtaskID;
        nextSubtaskID += 0.1;
        return subtask;
      });

      todos.push({
        id: nextID++,
        title: action.payload.title,
        description: action.payload.description,
        subtasks: subtask,
        status: action.payload.status,
        categoryID: action.payload.categoryID,
      });

      nextSubtaskID = 0.1;
    },
    todoUpdate: (todos, action) => {
      const todo = todos.find((todo) => todo.id === action.payload.id);
      nextSubtaskID = 0.0;
      const subtask = action.payload.subtasks.map((subtask) => {
        if (subtask.id) {
          nextSubtaskID += 0.1;
          return subtask;
        }
        nextSubtaskID += 0.1;
        subtask.id = action.payload.id + nextSubtaskID;
        return subtask;
      });
      nextSubtaskID = 0.1;

      todo.title = action.payload.title;
      todo.description = action.payload.description;
      todo.subtasks = subtask;
      todo.status = action.payload.status;
    },

    todoRemove: (todos, action) => {
      const index = todos.findIndex((todo) => todo.id === action.payload.id);
      todos.splice(index, 1);
    },

    todoRemoveRelatedCategory: (todos, action) => {
      return todos.filter(
        (todo) => todo.categoryID !== action.payload.categoryID
      );
    },

    todoRemoveAll: (todos) => {
      todos.splice(0, todos.length);
    },

    todoSubtaskResolve: (todos, action) => {
      const todo = todos.find((todo) => todo.id === action.payload.todoID);
      const subtaskIndex = todo.subtasks.findIndex(
        (subtask) => subtask.id === action.payload.subtaskID
      );
      todo.subtasks[subtaskIndex].completed =
        !todo.subtasks[subtaskIndex].completed;
    },

    todoStatusChanged: (todos, action) => {
      const index = todos.findIndex((todo) => todo.id === action.payload.id);
      todos[index].status = action.payload.status;
    },

    todoAssignedToCategory: (todos, action) => {
      const { todoID, categoryID } = action.payload;
      const index = todos.findIndex((todo) => todo.id === todoID);
      todos[index].categoryID = categoryID;
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(cleanStore, (state) => {
  //     state.splice(0, state.length);
  //   });
  // },
});

export const {
  todoAdded,
  todoRemove,
  todoRemoveAll,
  todoRemoveRelatedCategory,
  todoUpdate,
  todoStatusChanged,
  todoAssignedToCategory,
  todoSubtaskResolve,
} = slice.actions;

export default slice.reducer;

export const getCategoryTodos = (todo, categoryID) => {
  return todo.filter((td) => td.categoryID === categoryID);
};

export const getTodoByStatus = (todos, status) =>
  todos.filter((todo) => todo.status === status);

export const getSubtaskResolved = (todo) => {
  let res = 0;
  todo.subtasks.forEach((subtask) => {
    if (subtask.completed) {
      res += 1;
    }
  });
  return res;
};

export const getTodoById = (todos, id) => {
  return todos.filter((todo) => todo.id === id);
};
