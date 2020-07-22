import { Howl } from 'howler'
import messageMp3 from '../assets/sounds/message.mp3'
import messageWebm from '../assets/sounds/message.webm'
import notificationMp3 from '../assets/sounds/notification.mp3'
import notificationWebm from '../assets/sounds/notification.webm'

const sounds = {
  message: new Howl({
    src: [messageWebm, messageMp3]
  }),
  notification: new Howl({
    src: [notificationWebm, notificationMp3]
  })
}

export default sounds

