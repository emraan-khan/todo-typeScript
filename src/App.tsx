import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './Components/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange =(event: ChangeEvent<HTMLInputElement>):void =>{
    if(event.target.name === "task")
    setTask(event.target.value);
    setDeadline(Number(event.target.value));
  }

  const completeTask = (taskNameToDelete: string): void =>{
    setTodoList(todoList.filter((task)=>{
      return task.taskName != taskNameToDelete
    }))
  }

  const addTask = ():void =>{
    const newTask = {taskName: task, deadline: deadline? deadline:0}
    setTodoList([...todoList,newTask]);
    console.log(todoList);
    setTask("");
    setDeadline(0);
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
        <input type='text' placeholder='Task...' name='task' value={task} onChange={handleChange}/>
        <input type='number' placeholder='Deadline in days...' value={deadline} name='deadline' onChange={handleChange}/>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {
          todoList.map((task: ITask, key: number) => {
            return <TodoTask key={key} task={task} completeTask={completeTask}/>;
          })
        }
      </div>
    </div>
  );
}

export default App;
