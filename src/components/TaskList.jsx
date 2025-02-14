import React from "react"
import TaskItem from "./TaskItem"
import {useDrop} from "react-dnd"

export  default function TaskList({
  title,
  tasks,
  editingTask,
  onEdit,
  onDelete,
  onToggleComplete,
  onUpdate,
  setEditingTask,
  moveTask,
  completed,
}) {
  const [{isOver},drop]=useDrop({
    accept:"TASK",
    drop:(item)=>moveTask(item.id,completed),
    collect:(monitor)=>({
      isOver:!!monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      className={`bg-white rounded-lg shadow-md p-6 ${
        isOver?"bg-gray-200" : ""
      }`}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task)=>(
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingTask?.id===task.id}
            editingTask={editingTask}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
            setEditingTask={setEditingTask}
          />
        ))}
        {tasks.length===0&&(
          <p className="text-gray-500 text-center py-4">
            No {title.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  )
}
