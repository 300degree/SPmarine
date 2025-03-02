#! /usr/bin/env bash

rm -rf ./env-config.ts
touch ./env-config.ts

echo "const env = {" >> ./env-config.ts

while read -r line || [[ -n "$line" ]]; do
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi

    value=$(printf '%s\n' "${!varname}")
    [[ -z $value ]] && value=${varvalue}

    echo " $varname = \"$value\"," >> ./env-config.ts
done < .env

echo "}" >> ./env-config.ts
printf "dont use for production!\n"
