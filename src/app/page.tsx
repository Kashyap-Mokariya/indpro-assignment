'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { TaskStats } from '@/components/task-stats'
import { TaskColumn } from '@/components/task-column'
import { AddTaskModal } from '@/components/add-task-modal'
import { Task } from '@/lib/types'
import { toast } from 'sonner'

export default function Home() {
  const router = useRouter()
  const supabase = createClient()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addToStatus, setAddToStatus] = useState<'todo' | 'in_progress' | 'completed'>('todo')

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login')
        return
      }

      await fetchTasks()
    }

    checkAuth()
  }, [])

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...newTask,
            user_id: user.id,
          },
        ])
        .select()

      if (error) throw error

      if (data) {
        setTasks([data[0], ...tasks])
        toast.success('Task added')
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updatedTask.title,
          status: updatedTask.status,
          priority: updatedTask.priority,
          due_date: updatedTask.due_date,
        })
        .eq('id', updatedTask.id)

      if (error) throw error

      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
      toast.success('Task updated')
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)

      if (error) throw error

      setTasks(tasks.filter((t) => t.id !== taskId))
      toast.success('Task deleted')
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Separate tasks by status
  const todoTasks = filteredTasks.filter((t) => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in_progress')
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed')

  // Get counts from all tasks (not filtered, for stats)
  const todoCount = tasks.filter((t) => t.status === 'todo').length
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length
  const completedCount = tasks.filter((t) => t.status === 'completed').length

  const openAddModal = (status: 'todo' | 'in_progress' | 'completed') => {
    setAddToStatus(status)
    setIsAddModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={setSearchQuery} />
        <div className="flex-1 overflow-auto p-6">
          <TaskStats todoCount={todoCount} inProgressCount={inProgressCount} completedCount={completedCount} />

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              All
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              To Do
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              In Progress
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Completed
            </button>
          </div>

          {/* Task Board */}
          <div className="flex gap-6">
            <TaskColumn
              title="To Do"
              status="todo"
              tasks={todoTasks}
              count={todoCount}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAddClick={() => openAddModal('todo')}
            />
            <TaskColumn
              title="In Progress"
              status="in_progress"
              tasks={inProgressTasks}
              count={inProgressCount}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAddClick={() => openAddModal('in_progress')}
            />
            <TaskColumn
              title="Completed"
              status="completed"
              tasks={completedTasks}
              count={completedCount}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAddClick={() => openAddModal('completed')}
            />
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => {
              setAddToStatus('todo')
              setIsAddModalOpen(true)
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
          >
            New task
          </button>
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(newTask) => {
          handleAddTask({
            ...newTask,
            status: addToStatus,
            // preserve title and any provided progress; defaults handled in modal
          })
        }}
      />
    </div>
  )
}
