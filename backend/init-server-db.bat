@echo off
ECHO.
ECHO.

if exist server.db (
    ECHO Server already set up!
    ECHO.
    GOTO end
) else (
    sqlite3 server.db < server.sql
    ECHO Created successfully
    ECHO.
)

:end
PAUSE