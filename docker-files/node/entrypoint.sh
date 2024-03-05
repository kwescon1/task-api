#!/bin/sh

# # ANSI color codes
# RED='\033[0;31m'
# GREEN='\033[0;32m'
# NC='\033[0m' # No Color

# # Default port setup
# APP_PORT=${PORT:-3000}

# # Define the root directory of your Node application
# APP_ROOT="/usr/src/app"

# # Install Node.js dependencies
# echo "Checking if Node.js dependencies need to be installed..."
# if [ -d "$APP_ROOT/node_modules" ]; then
#   echo "${GREEN}Node.js dependencies are up to date. Skipping installation.${NC}"
# else
#   echo "Installing Node.js dependencies..."
#   cd $APP_ROOT
#   if npm install --only=development; then
#     echo "${GREEN}Node.js dependencies installed successfully.${NC}"
#   else
#     echo "${RED}Failed to install Node.js dependencies.${NC}"
#     exit 1
#   fi
# fi


# # Start the application
# echo "Starting the Express application..."
# if [ "$NODE_ENV" = "development" ]; then
#   echo "${GREEN}Running in Development Mode${NC}"
#   npm run dev
# else
#   echo "${GREEN}Running in Production Mode${NC}"
#   npm start
# fi


# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Default port setup
APP_PORT=${PORT:-3000}

# Define the root directory of your Node application
APP_ROOT="/usr/src/app"

echo "Starting the Express application..."
if [ "$NODE_ENV" = "development" ]; then
  echo "${GREEN}Running in Development Mode${NC}"
  # Explicitly install devDependencies in case they were missed
  npm install --only=development
  npm run dev
else
  echo "${GREEN}Running in Production Mode${NC}"
  npm start
fi
