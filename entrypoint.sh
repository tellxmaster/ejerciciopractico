#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start up
sleep 30s

# Run the initialization script
/usr/src/app/init-db.sh
