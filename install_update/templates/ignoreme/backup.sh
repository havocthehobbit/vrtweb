cd ignoreme
mkdir -p backupdir
mkdir -p ./backupdir/data/db1
mkdir -p ./backupdir/data/dbs
mkdir -p ./backupdir/my-app/src/components/custom
mkdir -p ./backupdir/nodeapp
mkdir -p ./backupdir/ignoreme

rsync -avgpour ../data/db1 ./backupdir/data
rsync -avgpour ../data/dbs ./backupdir/data
rsync -avgpour ../data/settings.json ./backupdir/data
rsync -avgpour ../ignoreme/*.sh ./backupdir/ignoreme
rsync -avgpour ../ignoreme/*.txt ./backupdir/ignoreme
rsync -avgpour ../ignoreme/*.js ./backupdir/ignoreme
rsync -avgpour ../ignoreme/*.json ./backupdir/ignoreme




rsync -avgpour ../my-app/package.json ./backupdir/my-app
rsync -avgpour ../my-app/src/components/custom ./backupdir/my-app/src/components

rsync -avgpour ../nodeapp/l_node_modules_auto*  ./backupdir/nodeapp
rsync -avgpour ../nodeapp/package.json  ./backupdir/nodeapp

#rsync -avgpour ./backupdir /mnt/c/nodeproj/backup/localvrtweb
#zip -ru  /mnt/c/nodeproj/backup/backupdir$(date +%Y%m).zip  /mnt/c/nodeproj/backup/localvrtweb/backupdir
# $(date +%Y%m%d%H%M%S)