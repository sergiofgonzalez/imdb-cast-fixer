#!/bin/bash -e

PORT=5000

curl --verbose \
"http://localhost:${PORT}/" \
--header "Accept: text/plain" \
--compressed

echo ""