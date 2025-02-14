import React, { useState } from 'react'
import {PlusCircle} from 'lucide-react'

export default function TaskForm({onAddTask}) {
  const [newTask,setNewTask]=useState('')
  const [newDueDate,setNewDueDate]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!newTask.trim()||!newDueDate) return

    onAddTask(newTask.trim(),newDueDate)
    setNewTask('')
    setNewDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            id="taskName"
            type="text"
            value={newTask}
            onChange={(e)=>setNewTask(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task name"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={newDueDate}
            onChange={(e)=>setNewDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <PlusCircle size={20}/>  Add Task
        </button>
      </div>
    </form>
  )
}