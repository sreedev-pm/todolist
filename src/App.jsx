import React, { useState, useEffect } from "react"
import TaskForm  from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

function App() {
  const [tasks,setTasks]=useState(()=>{
    const savedTasks=localStorage.getItem("tasks")
    return savedTasks?JSON.parse(savedTasks) :[]
  })

  const [editingTask,setEditingTask]=useState(null)
  const [searchQuery,setSearchQuery] =useState("")

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }, [tasks])

  const addTask=(name,dueDate)=>{
    const task={
      id:Date.now().toString(),
      name,
      dueDate,
      completed: false,
    }
    setTasks([...tasks, task])
  }

  const deleteTask=(id)=>{
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const startEditing =(task)=>{
    setEditingTask(task)
  }

  const updateTask=(e)=>{
    e.preventDefault()
    if (!editingTask) return


    setTasks(tasks.map((task)=>(task.id===editingTask.id?editingTask:task)))
    setEditingTask(null)
  }



  const toggleComplete=(id)=>{
    setTasks(
      tasks.map((task)=>task.id === id ? { ...task,completed:!task.completed }:task
      )
    )
  }


  const moveTask=(taskId,completedStatus)=>{
    setTasks(
      tasks.map((task)=>task.id===taskId?{ ...task,completed:completedStatus}:task
      )
    )
  }

  const filteredTasks=tasks.filter((task)=>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const incompleteTasks=filteredTasks.filter((task)=>!task.completed)
  const completedTasks=filteredTasks.filter((task) => task.completed)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Task Manager
          </h1>



            <input
                          placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
          
          <TaskForm onAddTask={addTask}/>

          <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Task Stats</h2>
            <div className="flex justify-between text-gray-700 mt-2">
              <p>Total Tasks: <span className="font-semibold">{tasks.length}</span></p>
              <p>Completed: <span className="font-semibold text-green-600">{completedTasks.length}</span></p>
              <p>Pending: <span className="font-semibold text-red-600">{incompleteTasks.length}</span></p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <TaskList
              title="Incomplete Tasks"
              tasks={incompleteTasks}
              editingTask={editingTask}
              onEdit={startEditing}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onUpdate={updateTask}
              setEditingTask={setEditingTask}
              moveTask={moveTask}
              completed={false}
            />

            <TaskList
              title="Completed Tasks"
              tasks={completedTasks}
              editingTask={editingTask}
              onEdit={startEditing}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onUpdate={updateTask}
              setEditingTask={setEditingTask}
              moveTask={moveTask}
              completed={true}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default App
