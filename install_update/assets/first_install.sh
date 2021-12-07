echo "before running please install nodejs and npm : apt-get update; apt-get install nodejs npm"

echo "create custom reactjs directory..."
mkdir -p ../../my-app/src/components/custom

echo "copying customer Code Mirror to custom react src folder ...eg: js template starter file..."
cp -p  ../../my-app/src/components/templates/cmmode.js ../../my-app/src/components/custom/
echo "copying customer Menus to custom react src folder ...eg: js template starter file..."
cp -p  ../../my-app/src/components/templates/custommenus.js ../../my-app/src/components/custom/

echo "installing nodejs dependancy packages for this project"
cd ../../nodeapp/ ; npm install --save --force; cd -
echo "installing reactjs dependancy packages for this project"
cd ../../my-app/ ; npm install --save --force ; cd -

echo "creating empty database "
cp -Rp ../../data/template/db1 ../../data
echo "creating settings json file "
cp -p ../../data/template/settings.json ../../data
echo "ccreate data/usershome and uploads_temp"
mkdir -p ../../data/usershome/uploads_temp

echo "building react"
cd ../../my-app/ ; npm run build; cd -

echo "please change youre host IP address in data/setting.json from localhost to your WSL IP address"
ip a l | grep net | grep -vE "localhost|inet6|127\.0\.0\.1|grep"

echo "login as 'admin'  ; password '' ;(password blank) ;please change password after logging in "
echo "globaly install nodemon; sudo npm i -g nodemon"