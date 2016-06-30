#!/bin/bash

rsync -PSauve ssh --exclude='.DS_Store' build/ pixlsus@pixls.us:/home4/pixlsus/public_html/
