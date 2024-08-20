#!/bin/bash

# Default paramaters
DEV_MODE=false
MSG_WIDTH=80
PID_FILE="pids.txt"

# Text color and attributes
EQUALS="========"
BOLD='\033[1m'
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'

# Get running mode from commend line (dev or prod)
while [ "$1" != "" ]; do
    case $1 in
        --dev | -d)
            DEV_MODE=true
            ;;
        *)
            DEV_MODE=false
            ;;
    esac
    shift
done

if [ "$DEV_MODE" = true ]; then
    STARTUP_MSG="MSB Development Mode"
else
    STARTUP_MSG="MSB Production Mode"
fi

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
    echo "${BOLD}${BLUE}+$(printf '%*s' $width | tr ' ' '=')+"
    echo "|$(printf '%*s' $left_padding)${message}$(printf '%*s' $right_padding)|"
    echo "+$(printf '%*s' $width | tr ' ' '=')+"
    echo "${RESET}\n"
}
display_startup_message "STARTING: $STARTUP_MSG" $MSG_WIDTH

# Store PIDs
ABS_PID_FILE=$(realpath "$PID_FILE")
: > "$ABS_PID_FILE"

# Clean up background processes
cleanup() {
    echo "\n"
    display_startup_message "SHUTTING DOWN: $STARTUP_MSG" $MSG_WIDTH

    # Read PIDs from file and terminate the processes
    if [ -f "$ABS_PID_FILE" ]; then
        while IFS= read -r pid; do
            if [ -n "$pid" ]; then

                echo "${YELLOW}Stopping process $pid ${RESET}"
                #echo "Stopping process $pid"
                kill "$pid" 2>/dev/null
                if [ $? -ne 0 ]; then
                    echo "${RED}Failed to stop process $pid.${RESET}"
                    #echo "Failed to stop process $pid"
                else
                    echo "${GREEN}Process $pid has stopped.${RESET}"
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
    echo "${BOLD}${YELLOW}${EQUALS} STARTING: Dev/Prod backend server startup ${EQUALS}${RESET}"
    cd backend || exit 1
    pip3 install -r requirements.txt
    nohup python3 app.py > backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo "$BACKEND_PID" >> "$ABS_PID_FILE"
    echo "${BOLD}${GREEN}${EQUALS} COMPLETED: Dev/Prod backend server startup, PID:$BACKEND_PID ${EQUALS}${RESET}\n"
}

# Dev frontend server
dev_frontend() {
    echo "${BOLD}${YELLOW}${EQUALS} STARTING: Dev frontend server startup ${EQUALS}${RESET}"
    cd frontend || exit 1
    npm install
    nohup npm start > frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo "$FRONTEND_PID" >> "$ABS_PID_FILE"
    echo "${BOLD}${GREEN}${EQUALS} COMPLETED: Dev frontend server startup, PID:$FRONTEND_PID ${EQUALS}${RESET}\n\n"
}

# Prod frontend build
prod_frontend() {
    echo "${BOLD}${YELLOW}${EQUALS} STARTING: Dev frontend build ${EQUALS}${RESET}"
    cd frontend || exit 1
    npm install
    npm run build
    cd ..
    echo "${BOLD}${GREEN}${EQUALS} COMPLETED: Dev frontend build ${EQUALS}${RESET}\n"
}

# Start the proxy server
dev_proxy() {
    echo "${BOLD}${YELLOW}${EQUALS} STARTING: Dev proxy server ${EQUALS}${RESET}"
    cd devserver || exit 1
    npm install
    nohup npm start > devserver.log 2>&1 &
    PROXY_PID=$!
    cd ..
    echo "$PROXY_PID" >> "$ABS_PID_FILE"
    echo "${BOLD}${GREEN}${EQUALS} COMPLETED: Dev proxy server, PID:$PROXY_PID ${EQUALS}${RESET}\n"
}

# Reatart the nginx production server
prod_deploy() {
    echo "${BOLD}${YELLOW}${EQUALS} STARTING: Prod static deployment ${EQUALS}${RESET}"
    sudo service nginx restart
    echo "${BOLD}${GREEN}${EQUALS} COMPLETED: Prod static deployment ${EQUALS}${RESET}\n"
}

# Wait for all background processes to finish


if [ "$DEV_MODE" = true ]; then
    # Run development functions
    dev_backend
    dev_frontend
    dev_proxy


    
else
    # Run production functions
    dev_backend
    prod_frontend
    prod_deploy
    #echo "123"

    #wait "$BACKEND_PID"
    #wait "$FRONTEND_PID"
    #wait "$PROXY_PID"
fi

display_startup_message "COMPLETED: $STARTUP_MSG" $MSG_WIDTH
echo "${BLUE}NOTE: Press Ctrl+C to shutdown all servers. ${RESET}"

wait "$BACKEND_PID"
wait "$FRONTEND_PID"
wait "$PROXY_PID"