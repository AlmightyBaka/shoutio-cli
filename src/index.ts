import { program } from 'commander'

import { listen, say } from './cliApp'


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