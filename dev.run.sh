#!/bin/bash

# File to store PIDs
PID_FILE="pids.txt"

# Ensure PID file is clean before use
: > "$PID_FILE"

# Function to clean up background processes
cleanup() {
    echo "Cleaning up..."
    # Read PIDs from file and terminate the processes
    if [ -f "$PID_FILE" ]; then
        while IFS= read -r pid; do
            if [ -n "$pid" ]; then
                echo "Stopping process $pid"
                kill "$pid" 2>/dev/null
            fi
        done < "$PID_FILE"
        rm -f "$PID_FILE"
    fi
    exit
}

# Trap signals and call cleanup function
trap cleanup INT TERM

# Start the backend server
cd backend || exit 1
pip3 install -r requirements.txt
nohup python3 app.py > backend.log 2>&1 &
BACKEND_PID=$!
echo "$BACKEND_PID" >> "$PID_FILE"
cd ..

# Start the frontend server
cd frontend || exit 1
npm install
nohup npm start > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "$FRONTEND_PID" >> "$PID_FILE"
cd ..

# Start the devserver
cd devserver || exit 1
nohup npm start > devserver.log 2>&1 &
DEVSERVER_PID=$!
echo "$DEVSERVER_PID" >> "$PID_FILE"
cd ..

# Wait for all background processes to finish
wait "$BACKEND_PID"
wait "$FRONTEND_PID"
wait "$DEVSERVER_PID"
