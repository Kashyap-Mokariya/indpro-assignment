'use client'

import { Task } from '@/lib/types'
import { TaskCard } from './task-card'
import { Plus } from 'lucide-react'

interface TaskColumnProps {
  title: string
  status: 'todo' | 'in_progress' | 'completed'
  tasks: Task[]
  count: number
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
  onAddClick: () => void
}

export function TaskColumn({ title, status, tasks, count, onUpdate, onDelete, onAddClick }: TaskColumnProps) {
  const statusColors = {
    todo: 'text-gray-700',
    in_progress: 'text-blue-600',
    completed: 'text-gray-700',
  }

  const statusDots = {
    todo: 'bg-gray-400',
    in_progress: 'bg-blue-600',
    completed: 'bg-gray-400',
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-2 h-2 rounded-full ${statusDots[status]}`} />
        <h3 className={`font-semibold ${statusColors[status]}`}>
          {title} <span className="text-gray-500">{count}</span>
        </h3>
        <button
          onClick={onAddClick}
          className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No tasks</p>
        </div>
      )}
    </div>
  )
}
