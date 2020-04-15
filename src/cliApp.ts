import ShoutioApp from './lib/ShoutioApp'

function messageReceivedCb(data: any): void {
    console.log(`Received new message: ${data.message}`)
}

export async function listen(channelName: string) {
    const fb = new ShoutioApp()

    if (!await fb.channelExists(channelName)) {
        console.log(`creating channel ${channelName}`)
        fb.channelCreate(channelName)
    } else {
        console.log(`channel ${'test'} already exists`)
    }


    fb.listen('test', messageReceivedCb)
}

export async function say(channelName: string, message: string): Promise<boolean> {
    const fb = new ShoutioApp()

    await fb.say(channelName, message)

    return true
}