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
        const db = firebase.firestore()

        const data = await db.collection('Channel').doc('hrqKHdvvwOvghyM2OEWp').get()
        console.log(data.exists)
        console.log(await data.data())

        const messages = await db.collection('Channel').doc('hrqKHdvvwOvghyM2OEWp').collection('Messages').doc().get()
        console.log(messages.exists)
        console.log(await messages.data())


        const doc = await db.collection('Channel').doc('hrqKHdvvwOvghyM2OEWp').collection('Messages').doc()
        doc.onSnapshot(async docSnapshot => {
            console.log('Received doc snapshot:')
            console.log(await docSnapshot.data())
          }, err => {
            console.log(`Encountered error: ${err}`)
          })
    }
}