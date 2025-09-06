import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Input } from '@/shared/components/ui/input';
import { Skeleton } from '@/shared/components/ui/skeleton';
import TodayInfo from '../components/todayInfo';
import { apiService } from '@/shared/services/api';
import { 
  Search, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  LayoutDashboard,
  Eye,
  CheckSquare,
  FolderOpen,
  Calendar,
  Clock,
  Users,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Edit
} from 'lucide-react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { useUser, useLogout } from '@/features/auth/hooks/useAuth';
import { Task, TodoItem, User } from '@/shared/types';

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const fetchProfileAndTasks = async () => {
      setUserLoading(true);
      try {
        const user = await apiService.getProfile();
        setUser(user);
        setUserLoading(false);
        setTasksLoading(true);
        if(user && user.username){
         const todos = await apiService.getTaskByUsername(user.username);
         
         setTasks(todos);
        }
        setTasksLoading(false);
      } catch (err) {
        setUserLoading(false);
        setTasksLoading(false);
        setTasksError('Lỗi lấy dữ liệu');
        console.error('Lỗi lấy profile/todos:', err);
      }
    };
    fetchProfileAndTasks();
  }, []);

  console.log('📋 Dashboard tasks:', tasks);
  console.log('📋 Tasks type:', typeof tasks);
  console.log('📋 Is array:', Array.isArray(tasks));
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const logoutMutation = useLogout();

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task => {
    console.log('🔍 Filtering task:', task);
    if (!task.title || !task.description) {
      console.log('⚠️ Task missing title or description:', task);
      return false;
    }
    return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log('📋 Total tasks:', tasks.length);
  console.log('🔍 Filtered tasks:', filteredTasks.length);
  console.log('🔍 Search query:', searchQuery);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    updateTaskMutation.mutate({
      id: taskId,
      data: { status: newStatus }
    });
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-pink-500 to-pink-600 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        <div className="px-6 mb-8">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.fullName || user?.username || 'Loading...'}</p>
              <p className="text-xs text-pink-100 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 py-2 px-3 rounded-lg bg-white/20">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10">
                <CheckSquare className="w-5 h-5" />
                <span>Tasks</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10">
                <Calendar className="w-5 h-5" />
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10">
                <Users className="w-5 h-5" />
                <span>Team</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-6 space-y-2">
          <button className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10 w-full text-left">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10 w-full text-left">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
          <button 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/10 w-full text-left disabled:opacity-50"
          >
            {logoutMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <p><TodayInfo /></p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
           <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.fullName || 'Loading...'} 👋</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks List */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Tasks</span>
                    {tasksLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                     <Button variant="ghost" size="sm" className="text-pink-500">
                   + Add task
                     </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tasksError ? (
                    <div className="flex items-center justify-center py-8 text-red-500">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Failed to load tasks</span>
                    </div>
                  ) : tasksLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <Skeleton className="h-12 w-12 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No tasks found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredTasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              <CheckSquare className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {task.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                                    {task.completed ? 'Completed' : 'In Progress'}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                                    {task.category || 'General'}
                                  </Badge>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {task.username}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateTaskStatus(task.id.toString(), 
                                    task.completed ? 'In Progress' : 'Completed'
                                  )}
                                  disabled={updateTaskMutation.isPending}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteTask(task.id.toString())}
                                  disabled={deleteTaskMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Tasks</span>
                      <span className="font-medium">{tasks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-medium text-green-600">
                        {tasks.filter(t => t.completed).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="font-medium text-blue-600">
                        {tasks.filter(t => !t.completed).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Categories</span>
                      <span className="font-medium text-purple-600">
                        {Array.from(new Set(tasks.map(t => t.category))).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent activity</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
