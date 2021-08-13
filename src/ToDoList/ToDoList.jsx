
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { Container } from '../StyleComponent/Container'
import { Dropdown } from '../StyleComponent/Dropdown'

import { Thead, Th, Tr, Table } from '../StyleComponent/Table'

import { TextField } from '../StyleComponent/TextField'

import { connect } from 'react-redux'
import { actionAddTask, actionChangeTheme, actionDeleteTask, actionDoneTask, actionEditTask, actionUpdateTask } from '../Redux/action/ToDoListAction.jsx'
import { Button } from '../StyleComponent/Button'
import { Heading3 } from '../StyleComponent/Heading'
import { arrTheme } from '../Themes/ArrayTheme'



class ToDoList extends Component {
    state = {
        taskName: "",
        disableUpdate: false,
        disableAddTask: true,
    }
    taskToDo = () => {
        const taskList = this.props.taskList.filter(task => !task.done)
        return taskList.map(task => {
            return <Tr>
                <Th>
                    {task.taskName}
                </Th>
                <Th className="text-right">
                    <Button onClick={() => {
                        this.setState({
                            disableAddTask: false,
                            disableUpdate: true
                        }, () => {
                            this.props.dispatch(actionEditTask(task))
                        })


                    }}>
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button onClick={() => {
                        this.props.dispatch(actionDoneTask(task.id))
                    }}>
                        <i className="fa fa-check"></i>
                    </Button>
                    <Button onClick={() => {
                        this.props.dispatch(actionDeleteTask(task.id))
                    }}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </Th>
            </Tr>
        })
    }
    taskCompleted = () => {
        const taskList = this.props.taskList.filter(task => task.done)
        return taskList.map(task => (
            <Tr>
                <Th>
                    {task.taskName}
                </Th>
                <Th className="text-right">

                    <Button onClick={() => {
                        this.props.dispatch(actionDeleteTask(task.id))
                    }}>
                        <i className="fa fa-trash"></i> </Button>
                </Th>
            </Tr>
        ))
    }
    renderTheme = () => {
        return arrTheme.map(theme => (
            <option value = {theme.id}>{theme.name}</option>
        ))
    }
    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList} >
                <Container className="w-50">
                    <Dropdown onChange={(e) => {
                        this.props.dispatch(actionChangeTheme(e.target.value))
                    }}>
                        {this.renderTheme()}
                    </Dropdown>

                    <Heading3 className="my-3">TASK TO LIST</Heading3>
                    <TextField value={this.state.taskName} className="w-50" label="Task name" name="taskName" onChange={(e) => {
                        this.setState({
                            taskName: e.target.value
                        }, () => {
                            console.log(this.state.taskName);
                        })
                    }}></TextField>
                    {/* ADD TASK  */}
                    {
                        this.state.disableAddTask ? <Button className="ml-2" onClick={() => {
                            // lấy dữ liẹu từ input
                            let taskName = this.state.taskName
                            // tạo object task 
                            let newTask = {
                                id: Date.now(),
                                taskName: taskName,
                                done: false
                            }
                            // đưa lên redux 
                            this.props.dispatch(actionAddTask(newTask))
                        }}>  <i className="fa fa-plus"></i> Add task</Button> :
                            <Button disabled className="ml-2">  <i className="fa fa-plus"></i> Add task</Button>
                    }

                    {/* //UPDATE TASK  */}
                    {
                        this.state.disableUpdate ? <Button onClick={() => {
                            this.setState({
                                disableUpdate: false,
                                disableAddTask: true
                            }, () => {
                                this.props.dispatch(actionUpdateTask(this.state.taskName))
                            })

                        }} className="ml-2">
                            <i className="fa fa-upload">Update task</i></Button> : <Button disabled className="ml-2">  <i className="fa fa-upload">Update task</i></Button>

                    }
                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.taskToDo()}

                        </Thead>
                    </Table>
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.taskCompleted()}

                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>


        )
    }
    // chạy sau render khi thay đổi props hoặc set lại state, tham số là props và state cũ trước khi render 
    componentDidUpdate(prevProps, prevState) {
        // khi nhấn nút update thì props,editTask thay đổi,nên set lại state đúng bằng task name và biding ra value 
        if (prevProps.editTask.id != this.props.editTask.id) {
            this.setState({
                taskName: this.props.editTask.taskName

            })
        }

    }

}






const mapStateToProps = (state) => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        editTask: state.ToDoListReducer.editTask
    }

}


export default connect(mapStateToProps)(ToDoList)

