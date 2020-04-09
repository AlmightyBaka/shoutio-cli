import { program } from 'commander'

import fbInit from './lib/firebase'
import FirebaseApp from './lib/firebase'


console.log('it works!')

program
  .command('listen')
  .description('listen to messages in a directory')
  .action(() => {
    console.log('listen command called')
    const fb = new FirebaseApp()
  })

program
  .command('say <message>')
  .description('send message to a directory')
  .action((message) => {
    console.log(`said ${message}`)
  })

program.parse(process.argv)