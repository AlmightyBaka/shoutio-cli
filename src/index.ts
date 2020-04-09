import { program } from 'commander'


console.log('it works!')

program
  .command('listen')
  .description('listen to messages in a directory')
  .action(() => {
    console.log('listen command called')
  })

program
  .command('say <message>')
  .description('send message to a directory')
  .action((message) => {
    console.log(`said ${message}`)
  })

program.parse(process.argv)