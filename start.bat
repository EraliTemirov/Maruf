@echo off
title JAMO Textile Server
echo Starting JAMO Textile local server on port 8080...
start http://localhost:8080
python server.py 8080
pause
