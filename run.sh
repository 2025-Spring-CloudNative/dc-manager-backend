#!/bin/sh

set -e

npm run db:migrate & PID=$!
wait $PID

node ./build/server.js & PID=$!
wait $PID