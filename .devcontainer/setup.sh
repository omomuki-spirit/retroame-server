#!/bin/bash
# Setup dev container.

# Intall package
apt update;
apt install -y git;

# Configure git
git config --global --add safe.directory /app;
