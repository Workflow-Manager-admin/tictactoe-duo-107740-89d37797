#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-duo-107740-89d37797/tic_tac_toe_duo
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

