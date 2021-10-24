echo "create custom reactjs directory..."
mkdir -p /my-app/src/components/custom

echo "copying customer Code Mirror to custom react src folder ...eg: js template starter file..."
cp -p  ../../my-app/src/components/templates/cmmode.js ../../my-app/src/components/custom/
echo "copying customer Menus to custom react src folder ...eg: js template starter file..."
cp -p  ../../my-app/src/components/templates/custommenus.js ../../my-app/src/components/custom/

echo "installing nodejs dependancy packages for this project"
cd ../../nodeapp/ ; npm i ; cd -
echo "installing reactjs dependancy packages for this project"
cd ../../my-app/ ; npm i --force ; cd -