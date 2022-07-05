if [ -f .npmrc ]; then
   rm .npmrc
   echo ".npmrc is removed"
fi
_authToken=$(head -n 1 .env)
echo "@ubiquity:registry=https://gitlab.com/api/v4/projects/27274533/packages/npm/">>.npmrc
echo "//gitlab.com/api/v4/projects/27274533/packages/npm/${_authToken}">>.npmrc
echo "always-auth=true">>.npmrc