import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Business Analytics Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Dashboard />
      </main>
      <footer className="bg-gray-200 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;