#!/bin/bash

bun run build
cp -r ./dist/mjSFqQ /Users/yy/Project/Haishi/cf-cloak/public
cp ./dist/favicon.ico /Users/yy/Project/Haishi/cf-cloak/public
cd /Users/yy/Project/Haishi/cf-cloak
bun run deploy
