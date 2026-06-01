'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Home, ListTodo, Settings, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

export function Sidebar() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    try {
      await supabase.auth.signOut()
      toast('Signed out')
      router.push('/auth/login')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign out failed'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">TaskFlow</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </button>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{isLoading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  )
}
