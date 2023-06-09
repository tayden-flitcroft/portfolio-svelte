#!/bin/bash

pids=$(pgrep java)

if [[ $pids ]]; then
echo "Stopping existing java processes..."
    for pid in $pids; do
        kill $pid
    done
fi

echo "Starting Firebase Emulators..."
echo "Starting Development Server..."

npm run start:dev