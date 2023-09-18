#!/bin/bash

# Go to the web root directory
pwd
cd /var/www/html/margo-laundry-frontend-nextjs || exit 1

# Pull the latest code from the Bitbucket repository (assuming you have set up SSH agent forwarding)
DEPLOY_BRANCH="qa"

# Check if a different branch is specified as an argument
if [ $# -eq 1 ]; then
    DEPLOY_BRANCH="$1"
fi

echo "DEPLOY_BRANCH is set to: $DEPLOY_BRANCH"

# Pull the latest code from the Bitbucket repository (assuming you have set up SSH agent forwarding)
sudo git fetch --all
sudo git checkout -f "$DEPLOY_BRANCH"
sudo git pull --rebase origin "$DEPLOY_BRANCH"
sudo git status

#application build
if sudo npm i && sudo npm run build; then
    # Build successful, restart the application
    pm2 restart 0
else
    # Build failed, exit the script with an error code
    echo "npm run build failed, stopping the pipeline"
    exit 1
fi