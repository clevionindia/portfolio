@echo off
echo Starting NYX Portfolio...

set "NODE_EXE=node"
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe" (
        set "NODE_EXE=C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe"
    ) else if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
        set "NODE_EXE=C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
    )
)

"%NODE_EXE%" -v >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js detected (%NODE_EXE%). Starting local server on http://localhost:3000 ...
    start http://localhost:3000
    "%NODE_EXE%" server.js
) else (
    echo Opening directly in default browser...
    start "" "%~dp0index.html"
)
