#!/bin/bash

bun run build &&cp -r ./dist/static /Volumes/ACASIS/100_Work/Haishi/cf-cloak/public && cd /Volumes/ACASIS/100_Work/Haishi/cf-cloak && bun run deploy