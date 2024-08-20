#!/bin/bash

# Default paramaters
DEV_MODE=false

# Get running mode from commend line (dev or prod)
while [ "$1" != "" ]; do
    case $1 in
        --dev | -d)
            DEV_MODE=true
            STARTUP_MSG="MSB Development Mode"
            ;;
        *)
            #echo "Error: Invalid argument $1"
            #exit 1
            DEV_MODE=false
            TARTUP_MSG="MSB Production Mode"
            ;;
    esac
    shift
done

# Startup message param
if [ "$DEV_MODE" = true ]; then
    STARTUP_MSG="MSB Development Mode"
else
    STARTUP_MSG="MSB Production Mode"
fi
MSG_WIDTH=80
#MSG_PADDING=$(((WIDTH - ${#STARTUP_MSG} - 2) / 2 ))

display_startup_message() {
    local message=$1
    local width=$2

    # Calculate padding
    local message_length=${#message}
    local total_padding=$((width - message_length - 2))
    local left_padding=$(((total_padding + 1) / 2))
    local right_padding=$(((total_padding) / 2))

    # Create the box
    echo "+$(printf '%*s' $width | tr ' ' '=')+"
    echo "|$(printf '%*s' $left_padding)${message}$(printf '%*s' $right_padding)|"
    echo "+$(printf '%*s' $width | tr ' ' '=')+"
    echo "\n"
}
display_startup_message "$STARTUP_MSG" $MSG_WIDTH

# Display dev mode
#echo "+$(printf '%*s' $MSG_WIDTH | tr ' ' '=')+"
#echo "|$(printf '%*s' $MSG_PADDING)${STARTUP_MSG}$(printf '%*s' $MSG_PADDING)|"
#echo "+$(printf '%*s' $MSG_WIDTH | tr ' ' '=')+"
#echo "\n"

# Store PIDs
ABS_PID_FILE=$(realpath "pids.txt")
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


# Start the dev backend server
dev_backend() {
    echo "===== Starting backend server ====="
    cd backend || exit 1
    pip3 install -r requirements.txt
    nohup python3 app.py > backend.log 2>&1 &
    BACKEND_PID=$!
    echo "Backend server started with PID: $BACKEND_PID"
    echo "$BACKEND_PID" >> "$ABS_PID_FILE"
    cd ..
}

# Start the dev frontend server
dev_frontend() {
    echo "===== Starting frontend server ====="
    cd frontend || exit 1
    npm install
    nohup npm start > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "Fronted server started with PID: $FRONTEND_PID"
    echo "$FRONTEND_PID" >> "$ABS_PID_FILE"
    cd ..
}

# Start the proxy server
dev_proxy() {
    echo "===== Starting proxy server ====="
    cd devserver || exit 1
    npm install
    nohup npm start > devserver.log 2>&1 &
    PROXY_PID=$!
    echo "Proxy server started with PID: $PROXY_PID"
    echo "$PROXY_PID" >> "$ABS_PID_FILE"
    cd ..
}

# Wait for all background processes to finish
#wait "$BACKEND_PID"
#wait "$FRONTEND_PID"
#wait "$PROXY_PID"
