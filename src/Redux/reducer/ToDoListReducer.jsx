import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../type/ToDoListType.js"
import { arrTheme } from "../Themes/ArrayTheme.jsx"
import { ToDoListDarkTheme } from "../Themes/ToDoListDarkTheme"



const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [
        { id: "task-1", taskName: "task 1  ", done: true, sl: 1 },
        { id: "task-2", taskName: "task 2  ", done: false, sl: 1 },
        { id: "task-3", taskName: "task 3  ", done: false, sl: 1 },
        { id: "task-4", taskName: "task 4  ", done: true, sl: 1 },
    ],
    editTask: { id: "task-4", taskName: "task 4", done: false, sl: 1 }

}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            //bóc tách phần tử
            const { newTask } = action
            // nnếu taskName trống
            if (newTask.taskName.trim() === "") {
                alert("Task name is required !")
                return { ...state }
            }
            // nếu task name trùng 
            const index = state.taskList.findIndex(task => task.taskName === newTask.taskName)
            console.log(index);
            if (index !== -1) {
                alert("Task name already exists !")
                return { ...state }
            }

            return { ...state, taskList: [...state.taskList, newTask] }
        }
        case CHANGE_THEME: {
            let themeSelect = arrTheme.find(theme => theme.id == action.themeId)
            state.themeToDoList = themeSelect.theme
            return { ...state }
        }
        case DONE_TASK: {
            const index = state.taskList.findIndex(task => task.id === action.taskId)
            if (index !== -1) {
                state.taskList[index].done = true
                // set laij taskList
                return { ...state, taskList: [...state.taskList] }
            }
            return { ...state }

        }
        case DELETE_TASK: {
            return { ...state, taskList: [...state.taskList.filter(task => task.id !== action.taskId)] }
        }
        case EDIT_TASK: {
            console.log(111, state.taskList);
            return { ...state, editTask: action.task }
        }
        case UPDATE_TASK: {
            let updateTask = state.taskList.find(task => task.id === state.editTask.id)
            updateTask.taskName = action.taskName
            state.editTask = { id: "-1", taskName: "", done: false }

            return { ...state }
        }


        default:
            return { ...state }
    }
}
