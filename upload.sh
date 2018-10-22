#!/bin/bash

rsync -PSauve ssh --exclude='.DS_Store' build/ pixlsus@pixls.us:/home/pixlsus/public_html/
