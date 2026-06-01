'use client'

import { Task } from '@/lib/types'
import { Calendar, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { EditTaskModal } from './edit-task-modal'

interface TaskCardProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

const statusIcons: Record<string, React.ReactNode> = {
  todo: <div className="w-4 h-4 rounded-full border-2 border-gray-400" />,
  in_progress: <div className="w-4 h-4 rounded-full border-2 border-blue-500 animate-spin" style={{ animationDuration: '2s' }} />,
  completed: <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center"><div className="text-green-500">✓</div></div>,
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsEditOpen(true)}
        className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1">{statusIcons[task.status]}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm wrap-break-word">{task.title}</h3>

            {/* progress removed: no visual progress bar shown for in-progress tasks */}

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {task.due_date && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  {new Date(task.due_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
              {task.priority && (
                <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority] || ''}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={onUpdate}
        onDelete={onDelete}
      />
    </>
  )
}
