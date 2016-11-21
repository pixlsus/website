#!/bin/bash

echo "Build successful!"
#echo $TRAVIS_BRANCH
#echo $TRAVIS_PULL_REQUEST
#echo $TRAVIS_BUILD_ID

touch ~/.ssh/config
echo "Host *" > ~/.ssh/config
echo "	StrictHostKeyChecking no" >> ~/.ssh/config
echo "	LogLevel error" >> ~/.ssh/config

if ([ $TRAVIS_BRANCH == "master" ] && [ $TRAVIS_PULL_REQUEST == "false" ])
then
    echo "Publishing."
    openssl aes-256-cbc -K $encrypted_b87c1b5f2320_key \
        -iv $encrypted_b87c1b5f2320_iv \
        -in pixls_rsa.enc  \
        -out /tmp/pixls_rsa -d
    chmod 600 /tmp/pixls_rsa
    eval "$(ssh-agent -s)"
    ssh-add /tmp/pixls_rsa
#    ls -lha
#    rsync --stats -PSauvhe "ssh -i /tmp/pixls_rsa -o StrictHostKeyChecking=no" build/ pixlsus@pixls.us:/home4/pixlsus/pixls-deploy/incoming/
#    if [ $? -eq 0 ]
#    then
#        echo "rsync successful."
#        echo "todo: mv the dir into place"
#        echo "todo: Creating symlinks. (much later)"
#    else
#        echo "rsync failed! :("
#    fi
############################

	# This file is pure insanity.
	# I apologize in advance if you're trying to do something with it.

	# Get server epoch time into TIMEVAR
	#TIMEVAR=$(ssh pixlsus@pixls.us 'date +%s')
	#TIMEVAR=$(ssh -i /tmp/pixls_rsa -o StrictHostKeyChecking=no -o LogLevel=error pixlsus@pixls.us 'date +%Y%m%d%H%M')
	#TIMEVAR=$(ssh -o StrictHostKeyChecking=no -o LogLevel=error pixlsus@pixls.us 'date +%Y%m%d%H%M')
	TIMEVAR=$(ssh pixlsus@pixls.us 'date +%Y%m%d%H%M')
	if [ $? -eq 0 ]
	then
		echo "TIMEVAR: $TIMEVAR"
	else
		echo "error code: $?"
		echo "failed getting server time, exiting"
		exit 1
	fi

	NEWDIR=pixls-$TIMEVAR
	echo "NEWDIR: $NEWDIR"

	# Get the current, active directory name
	CURRDIR=$(ssh pixlsus@pixls.us 'cd ~/pixls-deploy/; find . -mindepth 1 -maxdepth 1 -type d -name pixls* -printf "%P\n"')
	if [ $? -eq 0 ]
	then
		echo "CURRDIR: $CURRDIR"
	else
		echo "error code: $?"
		echo "failed getting current directory, exiting"
		exit 1
	fi

	# Hardlink copy current directory to new directory
	# (this is the dir we will rsync against/into
	ssh pixlsus@pixls.us "cd ~/pixls-deploy/; cp -la $CURRDIR $NEWDIR"
	if [ $? -eq 0 ]
	then
		echo "cp -al successful"
	else
		echo "exit code: $?"
		echo "cp -al failed!"
		exit 1
	fi

	# rsync into new directory, pixls-$TIMEVAR/
	rsync -PSauvhe ssh --exclude='.DS_Store' build/ pixlsus@pixls.us:/home4/pixlsus/pixls-deploy/$NEWDIR/
	if [ $? -eq 0 ]
	then
		echo "rsync successful."
	else
		echo "exit  code: $?"
		echo "rsync failed!"
		# failed, so delete the directory
		echo "cleaning up $NEWDIR"
		ssh pixlsus@pixls.us "rm -r /home4/pixlsus/pixls-deploy/$NEWDIR"
		if [ $? -eq 0 ]
		then
			echo "Removed ~/pixls-deploy/$NEWDIR"
		else
			echo "Uh oh.  Check the directory, I might not have cleaned up"
		fi
		exit 1
	fi

	# create symlink inside new directory to ~/files
	ssh pixlsus@pixls.us "ln -s ~/files ~/pixls-deploy/$NEWDIR/files"
	if [ $? -eq 0 ]
	then
		echo "ln -s ~/files ~/pixls-deploy/$NEWDIR/files"
		echo "Created symlink to ~/files"
	else
		echo "exit code: $?"
		echo "ln -s for ~/files/ failed!"
		echo "Check it manually!  Continuing..."
	fi

	# create a temporary symlink to the new directory
	ssh pixlsus@pixls.us "ln -s ~/pixls-deploy/$NEWDIR ~/public_html-tmp"
	if [ $? -eq 0 ]
	then
		echo "ln -s successful"
		echo "created ~/public_html-tmp -> ~/pixls-deploy/$NEWDIR"
	else
		echo "exit  code: $?"
		echo "ln -s failed!"
		# failed, so delete the directory
		echo "cleaning up (rm -r $NEWDIR)"
		ssh pixlsus@pixls.us 'rm -r /home4/pixlsus/pixls-deploy/$NEWDIR'
		if [ $? -eq 0 ]
		then
			echo "Removed ~/pixls-deploy/$NEWDIR"
		else
			echo "Uh oh.  Check the directory, I might not have cleaned up"
		fi
		exit 1
	fi

	# Now move tmp symlink to actual public_html
	ssh pixlsus@pixls.us "mv -Tf ~/public_html-tmp ~/public_html"
	if [ $? -eq 0 ]
	then
		echo "mv -Tf ~/public_html-tmp ~/public_html successful"
	else
		echo "exit  code: $?"
		echo "Failed to mv -Tf ~/public_html-tmp ~/public_HTML!"
		# failed, so handle it
		echo "Check the symlinks and manually replace if needed"
		exit 1
	fi


	# At the end, migrate and move old directories
	ssh pixlsus@pixls.us rm -r "~/pixls-deploy/previous*"
	ssh pixlsus@pixls.us mv "~/pixls-deploy/$CURRDIR" "~/pixls-deploy/${CURRDIR//pixls/previous}"



############################
else
    echo "Not publishing (not on master, or is a PR)."
fi


 
