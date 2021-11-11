cd ../../nodeapp/ ; git pull ; cd -
cd ../../nodeapp/ ; npm i -s ; cd -
cd ../../my-app/ ; npm i -s --force ; cd -
echo "you may need to upgrade nodejs to minimum required verion which is "
echo ""
echo "to do this run"
echo "curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh"       
echo "sudo bash /tmp/nodesource_setup.sh"
echo "sudo apt-get update"                                               
echo "sudo apt-get install -y nodejs"                                                   
echo "node -v"  