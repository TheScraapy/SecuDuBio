# SecuDuBio

<p align="center">
  <a href="https://vuejs.org">
    <img src="https://flat.badgen.net/badge/vue.js/2.5.2/green" alt="Vue.js version">
  </a>
  <a href="https://firebase.google.com">
    <img src="https://flat.badgen.net/badge/firebase/7.6.2/orange" alt="Firebase version">
  </a>
  <a href="https://buefy.com">
    <img src="https://flat.badgen.net/badge/buefy/0.8.9/purple" alt="Buefy version">
  </a>
  <a href="https://github.com/axios/axios">
    <img src="https://flat.badgen.net/badge/axios/0.19.1" alt="Axios version">
  </a>
  <a href="https://github.com/MauriceButler/cryptr">
    <img src="https://flat.badgen.net/badge/cryptr/6.0.1/red" alt="Cryptr version">
  </a>
</p>

Sources files are available on [Github](https://github.com/Epierrotie/foiSecuBio)
A demo is live on [Firebase](https://secudubio-46ed5.firebaseapp.com/)

A website to encrypt files using facial recognition as a two-factor authenticator combined with google. Files are encrypted using `aes-256-gcm` via [Cryptr](https://github.com/MauriceButler/cryptr). Facial recognition is done trought [Kairos](https://kairos.com) facial recognition API.

## Achitecture

This project is meant to be hosted on [Firebase](https://firebase.google.com) using firebase hosting, firebase authentification & cloud functions.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out [webpack](http://vuejs-templates.github.io/webpack/) and [vue-loader](http://vuejs.github.io/vue-loader) documentations.

## Firebase setup

``` bash
# install firebase-cli
npm i -g firebase-tools

# login into your firebase account
firebase login

# deploy to firebase
firebase deploy

# deploy only cloud functions
firebase deploy --only functions
```

For a detailed explanation on how things work, check out [firebase](https://firebase.google.com/docs/hosting/deploying).
