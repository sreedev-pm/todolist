import React, {useState,useEffect} from 'react'
import {CheckCircle,XCircle} from 'lucide-react'

export default function EditTaskForm({ editingTask, onUpdateTask, onCancelEdit }) {
  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(()=>{
    if (editingTask) {
      setTaskName(editingTask.name)
      setDueDate(editingTask.dueDate)
    }
  }, [editingTask])

  const handleSubmit =(e)=>{
    e.preventDefault()
    if (!taskName.trim() || !dueDate) return

    onUpdateTask({ ...editingTask, name: taskName.trim(), dueDate })
    onCancelEdit() // Close the edit form after updating
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Edit Task</h3>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Update task name"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) =>setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
        >
          <CheckCircle size={20} />
          Save
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <XCircle size={20} />
          Cancel
        </button>
      </div>
    </form>
  )
}
