import React, { useState} from "react";
import {useDrag} from "react-dnd";
import {Pencil,Trash2,Check,X,AlertTriangle} from "lucide-react";

export default function TaskItem({task,onEdit,onDelete,onToggleComplete}) {
  const [{isDragging},drag]=useDrag({
    type:"TASK",
    item:{id:task.id },
    collect:(monitor)=>({
      isDragging:!!monitor.isDragging(),
    }),
  });

  
  const [isEditing,setIsEditing]=useState(false);
  const [editedTask,setEditedTask] =useState({ ...task });


  const isOverdue =new Date(task.dueDate) < new Date() && !task.completed;



  
  const handleSave=()=>{
    if (!editedTask.name.trim()) return;
    onEdit(editedTask);
    setIsEditing(false);
  };

    
  const handleChange=(e)=>{
    setEditedTask({ ...editedTask,[e.target.name]:e.target.value });
  };

  return (
    <div
      ref={drag}
      className={`border p-4 rounded-md shadow-md bg-white cursor-pointer ${
        isDragging?"opacity-50":""
      } ${isOverdue?"border-red-500":"border-gray-200"}`}
    >
      



      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-medium text-gray-800 ${task.completed ? "line-through" : ""}`}>
              {task.name}
            </h3>
            <div className="flex gap-2">
              {!task.completed && (
                <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
                  <Pencil size={16} />
                </button>
              )}
              <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {task.completed ? "Completed" : `Due: ${new Date(task.dueDate).toLocaleDateString()}`}
            </p>
            {isOverdue && (
              <span className="text-red-500 flex items-center gap-1">
                <AlertTriangle size={16} /> Overdue
              </span>
            )}
            <button
              onClick={() => onToggleComplete(task.id)}
              className={task.completed ? "text-yellow-500 hover:text-yellow-600" : "text-green-500 hover:text-green-600"}
            >
              {task.completed ?<X size={20}/>: <Check size={20} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
