import ShoutioApp from './lib/ShoutioApp'

export async function listen(channelName: string) {
    const fb = new ShoutioApp()

    if (!await fb.channelExists(channelName)) {
        console.log(`creating channel ${channelName}`)
        fb.channelCreate(channelName)
    } else {
        console.log(`channel ${'test'} already exists`)
    }
}

export async function say(channelName: string, message: string): Promise<boolean> {
    const fb = new ShoutioApp()

    await fb.say(channelName, message)

    return true
}