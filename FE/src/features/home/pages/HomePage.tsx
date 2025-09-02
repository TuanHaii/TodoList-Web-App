export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-center">
      <div className="space-y-8 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome to MGX</h1>

        <p className="text-lg text-gray-600 animate-in fade-in delay-300 duration-700">Let's build something amazing</p>
        
        <div className="animate-in fade-in delay-500 duration-700">
          <a 
            href="/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};
