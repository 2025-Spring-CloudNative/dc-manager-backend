#!/bin/sh

set -e

npm run db:migrate & PID=$!
wait $PID

npm run local & PID=$!
wait $PID