#!/bin/bash

# Wait for SQL Server to start up
sleep 30s

# Run the SQL script to create the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Elitslot$45 -d master -i create-database.sql
