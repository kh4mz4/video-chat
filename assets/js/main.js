const APP_ID = '7e88ffb3c167414f8e4451793167c0bf'
const CHANNEL = 'main'
const TOKEN = '0067e88ffb3c167414f8e4451793167c0bfIACTw8qwKLNa6f2IF0OXJt49C99PMHviMd7E6EYX8j7p5WTNKL8AAAAAEACNSCPi1to5YgEAAQDW2jli'
let UID;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                      <div class="username-wrapper">
                        <span class="user-name">My Name</span>
                      </div>
                      <div class="video-player" id="user-${UID}"></div>
                  </div>`

    document.getElementById(`video-streams`).insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()
