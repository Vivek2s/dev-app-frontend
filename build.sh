git pull

git commit -am "Building Home Page"

prod='dev-app-live'


echo "**************************************************** $1 ***********************"
if [ "$1" = "prod" ]
then 
    ng build --prod --aot --output-hashing=none --build-optimizer --base-href=https://vivek2s.github.io/dev-app-live/
    dir=$prod
fi

echo "**************************************************** $dir ***********************"

read -p "Are you sure you want to push these changes to $1 server?(y/n): " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    rm -rf ../$dir/*

    mv dist/* ../$dir/

    cd ../$dir

    git add . && git commit -am "Build DevApp"

    git push origin master
else
    echo "*************** You Choose No: Deleting dist file ******************";
    rm -rf dist/
fi