#!/bin/zsh
cd "$(dirname "$0")"
pnpm install --prefer-offline || pnpm install
pnpm run dev &
server_pid=$!
sleep 3
open http://localhost:3000
wait $server_pid
