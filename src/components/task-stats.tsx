'use client'

interface TaskStatsProps {
  todoCount: number
  inProgressCount: number
  completedCount: number
}

export function TaskStats({ todoCount, inProgressCount, completedCount }: TaskStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* To Do Card */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{todoCount}</p>
            <p className="text-sm text-gray-600 mt-1">To Do</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-gray-400" />
          </div>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{inProgressCount}</p>
            <p className="text-sm opacity-90 mt-1">In Progress</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-white/60 animate-spin" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <div className="text-gray-400">✓</div>
          </div>
        </div>
      </div>
    </div>
  )
}
