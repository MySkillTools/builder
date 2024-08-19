#!/bin/bash
# On Windows: run C:\cygwin64\bin\bash.exe first

# Start the backend server
cd backend
python3 app.py &
BACKEND_PID=$!

# Return to the root directory
cd ..

# Start the frontend server
cd frontend
npm start &
FRONTEND_PID=$!

# Return to the root directory
cd ..

# Start the devserver
cd devserver
npm start &
DEVSERVER_PID=$!

# Wait for all background processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID
wait $DEVSERVER_PID
