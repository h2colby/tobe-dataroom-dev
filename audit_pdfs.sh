#!/bin/bash

# Find all PDFs and process them
find public/docs -name "*.pdf" -type f | sort | while read pdf; do
    echo "=== $pdf ==="
    pdftotext "$pdf" - 2>&1
    echo ""
    echo "--- END OF FILE ---"
    echo ""
done
