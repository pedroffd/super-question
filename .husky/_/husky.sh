#!/bin/sh
if [ -z "$HUSKY" ]; then
  export HUSKY=1
fi

if [ -f ~/.huskyrc ]; then
  . ~/.huskyrc
fi

if [ -f ~/.config/husky/init.sh ]; then
  . ~/.config/husky/init.sh
fi
echo "husky - DEPRECATED

Please remove the following two lines from $0:

#!/usr/bin/env sh
. \"\$(dirname -- \"\$0\")/_/husky.sh\"

They WILL FAIL in v10.0.0
"