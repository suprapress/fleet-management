#!/bin/bash

# Create a script that simulates the keystore configuration
# by providing the keystore information through environment variables

# Set environment variables for the keystore
export EXPO_ANDROID_KEYSTORE_PATH="./android/mobile-employee-keystore.jks"
export EXPO_ANDROID_KEYSTORE_PASSWORD="mykeystorepassword"
export EXPO_ANDROID_KEYSTORE_ALIAS="mobileemployee"
export EXPO_ANDROID_KEYSTORE_PASSWORD_ALIAS="mykeypassword"

# Try to build
echo "Attempting to build with keystore configuration..."
npx eas build --platform android --profile production