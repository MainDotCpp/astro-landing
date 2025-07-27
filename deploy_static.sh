#!/bin/bash

bun run build
cp -r ./dist/mjSFqQ /Volumes/ACASIS/100_Work/Haishi/cf-cloak/public
cp ./dist/favicon.ico /Volumes/ACASIS/100_Work/Haishi/cf-cloak/public
cd /Volumes/ACASIS/100_Work/Haishi/cf-cloak
bun run deploy
