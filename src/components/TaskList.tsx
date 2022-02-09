import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { transformFileAsync } from '@babel/core';

interface Task {
  id: string; //id: number
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle.length === 0){
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      isComplete: false
    }
    
    setTasks(tasks => [...tasks, newTask]);
    //setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // const index: number = tasks.findIndex(task => {
    //   return task.id === id;
    // })

    // if(index === -1){
    //   return;
    // }

    // tasks[index].isComplete = !tasks[index].isComplete;

    

    // const newTaskArray = tasks.map((task) => {
    //   task.isComplete = task.id === id ? !task.isComplete : task.isComplete;
    //   return task;
    // });

    const newTaskArray = tasks.map((task) => {
      if(task.id === id) task.isComplete = !task.isComplete;
      return task;
    });
    setTasks(newTaskArray);
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    
    // Essa funciona, mas ainda não atualiza direito na página. Não sei o pq

    // let newTaskArray: Task[] = tasks;
    // const index: number = tasks.findIndex(task => {
    //   return task.id === id;
    // })

    // if(index === -1){
    //   return;
    // }
    
    // newTaskArray.splice(index,1);
    // setTasks(newTaskArray);

    // Esta funciona, mas sei lá pq essa funciona e outro não, tenho que procurar mais sobre.
    const newTaskArray = tasks.filter(task => {return task.id !== id;})
    setTasks(newTaskArray);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}