#forces an overwrite
echo "getting new files and overwriting"
cd ../
git fetch --all
git branch backup-master
git reset --hard origin/master


echo "check difference in settings file"
diff data/settings.json data/template/settings.json

echo "data/db1"
diff -qr data/db1 data/template/db1