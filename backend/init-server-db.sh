#!/bin/bash

if [ -e "./server.db" ]
then
    echo "Server already set up!"
else
    sqlite3 server.db < server.sql
    echo "Created successfully!"
fi
