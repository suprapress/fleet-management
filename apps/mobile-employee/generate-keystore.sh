#!/bin/bash

# Generate keystore with non-interactive input
echo "RobzLabz" | keytool -genkey -keystore mobile-employee-keystore.jks -alias mobileemployee -keyalg RSA -keysize 2048 -validity 10000 -storepass mykeystorepassword -keypass mykeypassword -dname "CN=RobzLabz, OU=Mobile, O=RobzLabz, L=San Francisco, ST=California, C=US"