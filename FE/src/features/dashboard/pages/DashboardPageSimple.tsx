import { useNavigate } from 'react-router-dom';

export const DashboardPageSimple = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-600 text-white">
          <div className="p-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <nav className="mt-8">
            <div className="px-6 space-y-4">
              <a href="#" className="block py-2 text-white">Tasks</a>
              <a href="#" className="block py-2 text-white">Calendar</a>
              <a href="#" className="block py-2 text-white">Settings</a>
            </div>
          </nav>
          <div className="absolute bottom-0 w-64 p-6">
            <button 
              onClick={handleLogout}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">24</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Completed</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">18</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Pending</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">6</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Complete project proposal</h4>
                      <p className="text-sm text-gray-500">Due today</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Urgent</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Review team reports</h4>
                      <p className="text-sm text-gray-500">Due tomorrow</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Medium</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Update documentation</h4>
                      <p className="text-sm text-gray-500">Due next week</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
