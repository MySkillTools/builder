#!/bin/bash

# File to read PIDs from
PID_FILE="pids.txt"

if [ -f "$PID_FILE" ]; then
    while IFS= read -r pid; do
        if [ -n "$pid" ]; then
            echo "Stopping process $pid"
            kill "$pid" 2>/dev/null
        fi
    done < "$PID_FILE"
    rm -f "$PID_FILE"
else
    echo "PID file not found."
fi
