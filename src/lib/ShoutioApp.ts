import * as firebase from 'firebase-admin'

export default class ShoutioApp {
    db = null

    constructor() {
        const serviceAccount = require('../../firebaseKey.json')

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: 'https://usde-519c3.firebaseio.com'
          })

        this.db = firebase.firestore()

        console.log('fb initialized')
    }

    async channelExists(channelName: string): Promise<boolean> {
        const channelsCollection = await this.db.collection('Channel').doc(channelName).get()

        return channelsCollection.exists
    }

    async channelCreate(channelName: string): Promise<boolean> {
      const channelsCollection = await this.db.collection('Channel')
        .doc(channelName)
        .set({
          createdBy: 'tester',
          createdAt: new Date()
        })

      return channelsCollection.exists
    }

    async say(channelName: string, message: string): Promise<boolean> {
        if (!await this.channelExists(channelName)) {
          return false
        }

        await this.db.collection('Channel').doc(channelName)
          .collection('Messages').add({
            message,
            createdAt: new Date()
          })

        return true
    }

    async listen(channelName: string): Promise<void> {
        const doc = await this.db.collection('Channel').doc(channelName)
          .collection('Messages').onSnapshot(async docSnapshot => {
              docSnapshot.docChanges().forEach(change => {
                  console.log(`Received new message: ${change.doc.data().message}`)
                })
          }, err => {
              console.log(`Encountered error: ${err}`)
          })
    }
}