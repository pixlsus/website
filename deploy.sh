#!/bin/bash

echo "Build successful!"
#echo $TRAVIS_BRANCH
#echo $TRAVIS_PULL_REQUEST
#echo $TRAVIS_BUILD_ID

if ([ $TRAVIS_BRANCH == "master" ] && [ $TRAVIS_PULL_REQUEST == "false" ])
then
    echo "Publishing."
    openssl aes-256-cbc -K $encrypted_b87c1b5f2320_key \
        -iv $encrypted_b87c1b5f2320_iv \
        -in pixls_rsa.enc  \
        -out /tmp/pixls_rsa -d
    chmod 600 /tmp/pixls_rsa
    #eval "$(ssh-agent -s)"
    #ssh-add /tmp/deploy_rsa
    ls -lha
    rsync --stats -PSauvhe "ssh -i /tmp/pixls_rsa -o StrictHostKeyChecking=no" build/ pixlsus@pixls.us:/home4/pixlsus/pixls-deploy/incoming
    if [ $? -eq 0 ]
    then
        echo "rsync successful."
        echo "todo: mv the dir into place"
        echo "todo: Creating symlinks. (much later)"
    else
        echo "rsync failed! :("
    fi
else
    echo "Not publishing (not on master, or is a PR)."
fi
