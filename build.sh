#!/bin/bash

#echo "Starting Backend Server..."
cd frontend
# Assuming you're using npm and your script is named 'start'
npm run build

# Navigate back to the root directory
cd ..

#echo "Starting Frontend Server..."
#cd frontend
# Assuming you're using npm and your script is named 'start'
#npm start &

# Wait for any process to exit
#wait
#echo "Servers have been stopped."
