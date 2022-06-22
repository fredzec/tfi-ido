#!/bin/zsh
source ~/.nvm/nvm.sh
nvm use 16
rm -rf ./build
npm run build
rsync -avP ./build/ root@3.0.61.146:/var/www/tfi-ido-build
