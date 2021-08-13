import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../type/ToDoListType";

export const actionAddTask = (newTask) => ({
    type: ADD_TASK,
    newTask
})
export const actionChangeTheme = (themeId) => ({
        type: CHANGE_THEME,
        themeId
})
export const actionDeleteTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
})
export const actionDoneTask = (taskId) => ({
    type: DONE_TASK,
    taskId
})
export const actionEditTask = (task) => ({
    type: EDIT_TASK,
    task
})
export const actionUpdateTask = (taskName) => ({
    type: UPDATE_TASK,
    taskName
})


