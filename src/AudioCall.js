import React, { useEffect, useState } from 'react'
import { Device } from '@twilio/voice-sdk'

import axios from 'axios'

export default function AudioCall () {
  // useEffect(async () => {

  //   console.log('*** token ***', 'token')
  // }, [])

  const [device, setDevice] = useState()

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('https://5fslb.localtonet.com/twilio/token')

      console.log('*** twilio access token ***', res.data.token)

      const device = new Device(res.data.token, {
        // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
        // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
        codecPreferences: ['pcmu', 'opus'],
        // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
        // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
        // a second time and sending the tone twice. This will be default in 2.0.
        fakeLocalDTMF: true,
        // Use `enableRingingState` to enable the device to emit the `ringing`
        // state. The TwiML backend also needs to have the attribute
        // `answerOnBridge` also set to true in the `Dial` verb. This option
        // changes the behavior of the SDK to consider a call `ringing` starting
        // from the connection to the TwiML backend to when the recipient of
        // the `Dial` verb answers.
        enableRingingState: true,
        disableAudioContextSounds: true
      })

      device.on('ready', function (device) {
        console.log('Twilio.Device Ready!')
      })

      device.on('registered', function (device) {
        console.log('Twilio.Device Ready!')
      })

      device.on('error', function (error) {
        console.log('Twilio.Device Error: ' + error.message)
      })

      device.on('connect', function (conn) {
        console.log('Twilio.Device Successfully established call!')
      })

      device.on('disconnect', function (conn) {
        console.log('Twilio.Device disconnected')
      })

      device.on('incoming', function (conn) {
        console.log('Twilio.Device call received')
      })

      setDevice(device)
    })()
  }, [])

  const makePhoneCall = () => {
    console.log('*** Twilio.Device making phone call ***')

    if (device) {
      device.connect({
        phoneNumber: '+923405943551'
      })
    }
  }

  return <h1 onClick={makePhoneCall}>Make Phone Call</h1>
}
