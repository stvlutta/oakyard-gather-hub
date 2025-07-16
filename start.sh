#!/bin/bash

# Oakyard Application Startup Script
echo "🏢 Starting Oakyard Application"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up cleanup trap
trap cleanup INT TERM EXIT

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
python -m pip install -r requirements.txt
cd ..

# Start backend server
echo "🚀 Starting backend server..."
cd backend
python start_dev.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if ! curl -s http://localhost:5000/health > /dev/null; then
    echo "❌ Backend failed to start"
    exit 1
fi

echo "✅ Backend is running on http://localhost:5000"

# Start frontend server
echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 3

echo "✅ Frontend is running on http://localhost:5173"
echo ""
echo "🎉 Oakyard is ready!"
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5000/api"
echo "Backend Health: http://localhost:5000/health"
echo ""
echo "Demo Login Credentials:"
echo "Email: admin@oakyard.com"
echo "Password: admin123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Keep script running
wait