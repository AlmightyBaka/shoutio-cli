import { program } from 'commander'

import fbInit from './lib/ShoutioApp'
import ShoutioApp from './lib/ShoutioApp'
import { listen, say } from './cliApp'


console.log('it works!')

program
  .command('listen <channelName>')
  .description('listen to messages in a directory')
  .action(async (channelName) => {
      await listen(channelName)
  })

program
  .command('say <channelName> <message>')
  .description('send message to a directory')
  .action(async (channelName, message) => {
    console.log(await say(channelName, message))

  })

program.parse(process.argv)