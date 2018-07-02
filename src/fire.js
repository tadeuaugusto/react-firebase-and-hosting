import firebase from 'firebase';
import * as config from './config';

var fire_config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: config.FIRE_API_KEY,
    authDomain: config.FIRE_AUTH_DOMAIN,
    databaseURL: config.FIRE_DB_URL,
    storageBucket: config.FIRE_STORAGE_BUCKET,
    messagingSenderId: config.FIRE_MSG_SENDER_ID
};
var fire = firebase.initializeApp(fire_config);

export default fire;
