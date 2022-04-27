cd nodeapp
node menu.js ; ret=$?

if [[ $ret == 88 ]] ; then
    ./cstartdev.sh
fi
echo exit code : $ret

cd -