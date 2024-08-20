#!/bin/bash

# Default paramaters
DEV_MODE=false
MSG_WIDTH=80
PID_FILE="pids.txt"
#STARTUP_MSG=""

# Get running mode from commend line (dev or prod)
while [ "$1" != "" ]; do
    case $1 in
        --dev | -d)
            DEV_MODE=true
            #STARTUP_MSG="MSB Development Mode"
            ;;
        *)
            DEV_MODE=false
            #STARTUP_MSG="MSB Production Mode"
            ;;
    esac
    shift
done

if [ "$DEV_MODE" = true ]; then
    STARTUP_MSG="MSB Development Mode"
else
    STARTUP_MSG="MSB Production Mode"
fi
#echo "STARTUP_MSG: $STARTUP_MSG"

#MSG_PADDING=$(((WIDTH - ${#STARTUP_MSG} - 2) / 2 ))

#echo $STARTUP_MSG

# Define color codes
BOLD='\033[1m'
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'

# Display startup message with a box
display_startup_message() {
    local message=$1
    local width=$2

    # Calculate padding
    local message_length=${#message}
    local total_padding=$((width - message_length - 2))
    local left_padding=$(((total_padding + 1) / 2))
    local right_padding=$(((total_padding) / 2))

    # Create the box
    echo "${BLUE}+$(printf '%*s' $width | tr ' ' '=')+"
    echo "|$(printf '%*s' $left_padding)${message}$(printf '%*s' $right_padding)|"
    echo "+$(printf '%*s' $width | tr ' ' '=')+"
    echo "${RESET}\n"
}
display_startup_message "$STARTUP_MSG" $MSG_WIDTH

# Display dev mode
#echo "+$(printf '%*s' $MSG_WIDTH | tr ' ' '=')+"
#echo "|$(printf '%*s' $MSG_PADDING)${STARTUP_MSG}$(printf '%*s' $MSG_PADDING)|"
#echo "+$(printf '%*s' $MSG_WIDTH | tr ' ' '=')+"
#echo "\n"

# Store PIDs
ABS_PID_FILE=$(realpath "$PID_FILE")
: > "$ABS_PID_FILE"

# Clean up background processes
cleanup() {
    echo "Cleaning up..."
    # Read PIDs from file and terminate the processes
    if [ -f "$ABS_PID_FILE" ]; then
        while IFS= read -r pid; do
            if [ -n "$pid" ]; then
                echo "Stopping process $pid"
                kill "$pid" 2>/dev/null
                if [ $? -ne 0 ]; then
                    echo "Failed to stop process $pid"
                fi
            fi
        done < "$ABS_PID_FILE"
        rm -f "$ABS_PID_FILE"
    fi
    exit
}

# Trap signals and call cleanup function
trap cleanup INT TERM


# Dev/Prod backend server
dev_backend() {
    echo "${YELLOW}===== STARTING: Dev/Prod backend server startup =====${RESET}"
    cd backend || exit 1
    pip3 install -r requirements.txt
    nohup python3 app.py > backend.log 2>&1 &
    BACKEND_PID=$!
    #echo "Backend server started with PID: $BACKEND_PID"
    echo "$BACKEND_PID" >> "$ABS_PID_FILE"
    cd ..
    echo "${GREEN}===== COMPLETED: Dev/Prod backend server startup, PID:$BACKEND_PID =====${RESET}\n"
}

# Dev frontend server
dev_frontend() {
    echo "===== STARTING: Dev frontend server startup ====="
    cd frontend || exit 1
    npm install
    nohup npm start > frontend.log 2>&1 &
    FRONTEND_PID=$!
    #echo "Fronted server started with PID: $FRONTEND_PID"
    echo "$FRONTEND_PID" >> "$ABS_PID_FILE"
    cd ..
    echo "===== COMPLETED: Dev frontend server startup, PID:$FRONTEND_PID  =====\n"
}

# Prod frontend build
prod_frontend() {
    echo "===== STARTING: Dev frontend build ====="
    cd frontend || exit 1
    npm install
    #nohup npm start > frontend.log 2>&1 &
    npm run build
    #FRONTEND_PID=$!
    #echo "Fronted server started with PID: $FRONTEND_PID"
    #echo "$FRONTEND_PID" >> "$ABS_PID_FILE"
    cd ..
    echo "===== COMPLETED: Dev frontend build ====="
}

# Start the proxy server
dev_proxy() {
    echo "===== STARTING: Dev proxy server ====="
    cd devserver || exit 1
    npm install
    nohup npm start > devserver.log 2>&1 &
    PROXY_PID=$!
    #echo "Proxy server started with PID: $PROXY_PID"
    echo "$PROXY_PID" >> "$ABS_PID_FILE"
    cd ..
    echo "===== COMPLETED: Dev proxy server, PID:$PROXY_PID =====\n"
}

prod_deploy() {
    echo "===== STARTING: Prod static deployment ====="
    sudo service nginx restart
    echo "===== COMPLETED: Prod static deployment ====="
}

# Wait for all background processes to finish


if [ "$DEV_MODE" = true ]; then
    # Run development functions
    dev_backend
    dev_frontend
    dev_proxy

    wait "$BACKEND_PID"
    wait "$FRONTEND_PID"
    wait "$PROXY_PID"
    
else
    # Run production functions
    dev_backend
    prod_frontend
    prod_deploy
    #echo "123"

    wait "$BACKEND_PID"
    #wait "$FRONTEND_PID"
    #wait "$PROXY_PID"
fi

