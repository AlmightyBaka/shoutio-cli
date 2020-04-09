import * as firebase from 'firebase-admin'



export default class FirebaseApp {
    constructor() {
        const serviceAccount = require('../../firebaseKey.json')

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://usde-519c3.firebaseio.com"
          })

        console.log('fb initialized')
    }
}