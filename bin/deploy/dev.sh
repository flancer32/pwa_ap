#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}

echo "Remove installed dependencies and lock file."
rm -fr "${DIR_ROOT}/node_modules" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install

echo "Remove cloned dependencies (sources)."
#rm -fr "${DIR_ROOT}/own_modules/@flancer32"
#rm -fr "${DIR_ROOT}/own_modules/@teqfw"

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_ROOT}/own_modules/@teqfw/"
mkdir -p "${DIR_ROOT}/own_modules/@flancer32/"
git clone git@github.com:flancer32/mod_ap_user.git "${DIR_ROOT}/own_modules/@flancer32/mod_ap_user"
git clone git@github.com:teqfw/core-app.git "${DIR_ROOT}/own_modules/@teqfw/core-app"
git clone git@github.com:teqfw/di.git "${DIR_ROOT}/own_modules/@teqfw/di"
git clone git@github.com:teqfw/email.git "${DIR_ROOT}/own_modules/@teqfw/email"
git clone git@github.com:teqfw/http2.git "${DIR_ROOT}/own_modules/@teqfw/http2"
git clone git@github.com:teqfw/ui-quasar.git "${DIR_ROOT}/own_modules/@teqfw/ui-quasar"
git clone git@github.com:teqfw/vue.git "${DIR_ROOT}/own_modules/@teqfw/vue"

echo "Link dependencies to '/usr/lib/node_modules/'."
cd "${DIR_ROOT}/own_modules/@flancer32/mod_ap_user" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/core-app" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/di" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/email" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/http2" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/ui-quasar" || exit 255
sudo npm link
cd "${DIR_ROOT}/own_modules/@teqfw/vue" || exit 255
sudo npm link

echo "Link dependencies to the project."
cd "${DIR_ROOT}" || exit 255
npm link \
  "@flancer32/mod_ap_user" \
  "@teqfw/core-app" \
  "@teqfw/di" \
  "@teqfw/email" \
  "@teqfw/http2" \
  "@teqfw/ui-quasar" \
  "@teqfw/vue" \

echo "Done."
