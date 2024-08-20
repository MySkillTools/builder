#!/bin/bash

# =================================================================
# |                         PARAMATERS                            |
# =================================================================

# Default values
DEV_MODE=false              # True -> Development Mode; False -> Production Mode
MSG_WIDTH=80
PID_FILE="pids.txt"
LOGS_DIR="logs"

# Text color and attributes
EQUALS="========"
BOLD='\033[1m'
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'

# =================================================================
# |                      UITLITY FUNCTIONS                        |
# =================================================================

# Display startup message with a box
display_startup_message() {
    local message=$1
    local width=$2

    # Calculate padding
    local message_length=${#message}
    local total_padding=$((width - message_length))
    local left_padding=$(((total_padding + 1) / 2))
    local right_padding=$(((total_padding) / 2))

    # Create the box
    echo "${BOLD}${BLUE}+$(printf '%*s' $width | tr ' ' '=')+"
    echo "|$(printf '%*s' $left_padding)${message}$(printf '%*s' $right_padding)|"
    echo "+$(printf '%*s' $width | tr ' ' '=')+"
    echo "${RESET}"
}

# Clean up background processes
cleanup() {
    echo "\n"
    display_startup_message "SHUTTING DOWN: $STARTUP_MSG" $MSG_WIDTH

    # Read PIDs from file and terminate the processes
    if [ -f "$ABS_PID_FILE" ]; then
        while IFS= read -r pid; do
            if [ -n "$pid" ]; then
                echo "${YELLOW}Stopping process $pid ${RESET}"
                kill "$pid" 2>/dev/null
                if [ $? -ne 0 ]; then
                    echo "${RED}Failed to stop process $pid.${RESET}"
                else
                    echo "${GREEN}Process $pid has stopped.${RESET}"
                fi
            fi
        done < "$ABS_PID_FILE"
        rm -f "$ABS_PID_FILE"
    fi
    exit
}

# =================================================================
# |                        SERVER SCRIPTS                         |
# =================================================================

# Dev/Prod backend server
dev_backend() {
    echo "${YELLOW}STARTING: Dev/Prod backend server startup ${RESET}"
    cd backend || exit 1
    pip3 install -r requirements.txt > "${ABS_LOG_DIR}/backend.build.log" 2>&1
    nohup python3 app.py > "${ABS_LOG_DIR}/backend.run.log" 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo "$BACKEND_PID" >> "$ABS_PID_FILE"
    echo "${GREEN}COMPLETED: Dev/Prod backend server startup, PID:$BACKEND_PID ${RESET}\n"
}

# Dev frontend server
dev_frontend() {
    echo "${YELLOW}STARTING: Dev frontend server startup ${RESET}"
    cd frontend || exit 1
    npm install > "${ABS_LOG_DIR}/frontend.build.log" 2>&1
    nohup npm start > "${ABS_LOG_DIR}/frontend.run.log" 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo "$FRONTEND_PID" >> "$ABS_PID_FILE"
    echo "${GREEN}COMPLETED: Dev frontend server startup, PID:$FRONTEND_PID ${RESET}\n\n"
}

# Prod frontend build
prod_frontend() {
    echo "${YELLOW}STARTING: Prod frontend build ${RESET}"
    cd frontend || exit 1
    npm install > "${ABS_LOG_DIR}/frontend.build.log" 2>&1
    npm run build > "${ABS_LOG_DIR}/frontend.run.log" 2>&1
    cd ..
    echo "${GREEN}COMPLETED: Prod frontend build ${RESET}\n"
}

# Start the proxy server
dev_proxy() {
    echo "${YELLOW}STARTING: Dev proxy server ${RESET}"
    cd devserver || exit 1
    npm install > "${ABS_LOG_DIR}/proxy.build.log" 2>&1
    nohup npm start > "${ABS_LOG_DIR}/proxy.run.log" 2>&1 &
    PROXY_PID=$!
    cd ..
    echo "$PROXY_PID" >> "$ABS_PID_FILE"
    echo "${GREEN}COMPLETED: Dev proxy server, PID:$PROXY_PID ${RESET}\n"
}

# Reatart the nginx production server
prod_deploy() {
    echo "${YELLOW}STARTING: Prod static deployment ${RESET}"
    sudo service nginx restart
    echo "${GREEN}COMPLETED: Prod static deployment ${RESET}\n"
}

# =================================================================
# |                         MAIN PROCESS                          |
# =================================================================

# Get running mode from commend line
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

# Display running mode
if [ "$DEV_MODE" = true ]; then
    STARTUP_MSG="MSB Development Mode"
else
    STARTUP_MSG="MSB Production Mode"
fi
display_startup_message "STARTING: $STARTUP_MSG" $MSG_WIDTH

# Store PID and logs
ABS_PID_FILE=$(realpath "$PID_FILE")
ABS_LOG_DIR=$(realpath "$LOGS_DIR")
: > "$ABS_PID_FILE"
mkdir -p "$LOGS_DIR"
rm -rf "$ABS_PID_FILE/*.log"

# Trap signals and call cleanup function
trap cleanup INT TERM

# Execute commend blocks based on running mode
if [ "$DEV_MODE" = true ]; then
    dev_backend
    dev_frontend
    dev_proxy
else
    dev_backend
    prod_frontend
    prod_deploy
fi

# Post-execute message
display_startup_message "READY: $STARTUP_MSG" $MSG_WIDTH
echo "${BLUE}NOTE: Press Ctrl+C to shutdown all servers. ${RESET}"

wait "$BACKEND_PID"
wait "$FRONTEND_PID"
wait "$PROXY_PID"