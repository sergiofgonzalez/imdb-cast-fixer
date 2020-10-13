#!/bin/bash -e

PORT=5000

# Simulates
curl \
"http://localhost:${PORT}/health-check" \
--header "Content-Type: application/json" \
--header "Accept: application/json" \
--compressed

echo ""