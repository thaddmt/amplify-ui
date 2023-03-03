#!/bin/bash
set -e
IFS='|'

# Get args
dir=$1
region=$2

echo "$AWS_PROFILE"

# In development, AWS_PROFILE will be set explicitly. In CI,
# it will use the default aws profile.
[ -z "$AWS_PROFILE" ] && AWS_PROFILE="default"

echo "$AWS_PROFILE"

# We set `useProfile` to true, because Amplify CLI does not support headless
# pull with temporary credentials when `useProfile` is set to false.
# See https://github.com/aws-amplify/amplify-cli/issues/5275.
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":\"true\",\
\"profileName\":\"$AWS_PROFILE\",\
\"region\":\""$region\""\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

cd $dir

# `--yes` flag is to added to say yes to the CLI prompts.
# See https://github.com/aws-amplify/amplify-cli/issues/5275.
yarn pull --providers $PROVIDERS --yes
