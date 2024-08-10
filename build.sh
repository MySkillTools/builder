#!/bin/bash

# Default debug mode
DEBUG_MODE="none"

# Check if an argument was provided for debug mode
if [ "$1" == "--debug" ]; then
    DEBUG_MODE=$2
fi

echo "Debug mode set to: $DEBUG_MODE"

case $DEBUG_MODE in 

    # Debug frontend only
    "frontend")
        echo "Starts in frontend debugging mode..."
        cd frontend
        #npm install
        npm start
        cd ..
        ;;

    # Debug backend only
    "backend")
        echo "Starts in backend debugging mode..."
        cd backend
        npm start
        ;;

    # Production mode
    "none")
        echo "Starts in roduction mode..."
        cd frontend
        npm run build
        cd ..
        cd backend
        npm start
        ;;
    *)
    echo "Invalid debug mode specified. Use 'frontend', 'backend', or 'none'."
    exit 1
    ;;
esac

echo "Script execution completed."
