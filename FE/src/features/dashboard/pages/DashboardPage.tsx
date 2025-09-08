import React, { useEffect, useState } from 'react';
  import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Input } from '@/shared/components/ui/input';
import { Skeleton } from '@/shared/components/ui/skeleton';
import TodayInfo from '../hooks/todayInfo';
import { apiService } from '@/shared/services/api';
import AddTaskModal from '../components/addTaskModal';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
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

  const handleUpdateTask = (taskId: string, updates: Task['status']) => {
    updateTaskMutation.mutate({
      id: taskId,
      data: { status: updates }
    });
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    if (user && user.username) {
      createTaskMutation.mutate({ 
        taskData, 
        username: user.username 
      });
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
    <div className="h-screen bg-gray-50">
      {/* Header - Full width */}
      <header style={{background: '#fdf6ea'}} className="shadow-sm border-b border-gray-200 px-6 py-3 h-15 mb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-3xl font-bold ml-7">
              <span style={{ color: '#FF6767' }}>Dash</span>
              <span className="text-gray-900">board</span>
            </h1>
          </div>

          {/* Centered Search Bar */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search your task here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[500px] pr-0 border-0 bg-white shadow-md rounded-lg rounded-r-none"
                style={{ 
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <button 
                className=" absolute -right-2 h-full px-3 rounded-lg shadow-md"
                style={{ 
                  backgroundColor: '#FF6767',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Search className="  text-white" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative rounded-xl text-white" style={{ backgroundColor: '#FF6767'}}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-black bg-white text-xs rounded-xl w-4 h-4 flex items-center justify-center">3</span>
            </Button>
            <Button className='rounded-xl' variant="ghost" size="icon" style={{ backgroundColor: '#FF6767'}}>
              <Settings className="w-5 h-5 text-white" />
            </Button>
            <div className="text-right">
              <p><TodayInfo /></p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] relative">
        {/* Avatar positioned to overlap header and sidebar */}
        <div className="absolute top-[-3em] left-32 transform -translate-x-1/2 z-30">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-white text-2xl font-bold" style={{ color: '#FF6767' }}>
              {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Sidebar */}
        <div style={{ backgroundColor: '#FF6767' }} className="rounded-lg w-64 bg-gradient-to-b text-white flex flex-col">
          
          {/* User info section with top padding for avatar */}
          <div className="pt-12 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-10"></div> {/* Spacer for avatar */}
              <h3 className="font-semibold text-lg mb-1">{user?.fullName || user?.username || 'Loading...'}</h3>
              <p className="text-pink-100 text-sm opacity-90">{user?.email || 'Senior Data Scientist'}</p>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 px-6 mt-4">
            <ul className="space-y-3">
            <li>
              <button 
                onClick={() => setActiveMenu('dashboard')}
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                  activeMenu === 'dashboard' 
                    ? 'bg-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={activeMenu === 'dashboard' ? { color: '#FF6767' } : {}}
              >
                <LayoutDashboard   className=" w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('vital-task')}
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                  activeMenu === 'vital-task' 
                    ? 'bg-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={activeMenu === 'vital-task' ? { color: '#FF6767' } : {}}
              >
                <Eye className="w-5 h-5" />
                <span>Vital Task</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('my-task')}
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                  activeMenu === 'my-task' 
                    ? 'bg-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={activeMenu === 'my-task' ? { color: '#FF6767' } : {}}
              >
                <CheckSquare className="w-5 h-5" />
                <span>My Task</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('task-categories')}
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                  activeMenu === 'task-categories' 
                    ? 'bg-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={activeMenu === 'task-categories' ? { color: '#FF6767' } : {}}
              >
                <FolderOpen className="w-5 h-5" />
                <span>Task Categories</span>
              </button>
            </li>
          </ul>
            </nav>

            {/* Logout section */}
            <div className="p-6 mt-auto">
              <button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-white/10 w-full text-left text-white/80 hover:text-white transition-colors disabled:opacity-50"
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
        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
           <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Welcome back, {user?.fullName?.split(' ')[0] || user?.username || 'User'} 👋
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks List */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Tasks</span>
                    {tasksLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    <Button variant="ghost" size="sm" className="" style={{ color: '#FF6767' }} onClick={() => setShowAddModal(true)}>
                                        + Add task
                                      </Button>
                                      <AddTaskModal 
                                        open={showAddModal}
                                        onClose={() => setShowAddModal(false)}
                                        onSubmit={async (form) => {
                                          await createTaskMutation.mutateAsync(form);
                                          setShowAddModal(false);
                                        }}
                                      />

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
                                  onClick={() => handleUpdateTask(task.id.toString(), 
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
    </div>
  );
};
