// == Welcome ==
const welcomeText = (firstName) =>
  `Hey  ${firstName},
  \n\nthanks for joining the ShareStuff community!  
  \nNavigate to your profile to post items for others to borrow. You will receive karma points for lending your stuff to other users. You can use the points you accumulate to borrow stuff from other members.
  \n\nWe've given you a gift of 1000 karma to get you started. 
  \n\nDo good,
  \nShareStuff`

// == Lending Request ==
const lendingRequestText = (notification, lenderUsername) =>
  `Hey ${lenderUsername},
  \n\nyou've just received a new lending request!
  \n${notification.borrowerUsername} is requesting to borrow ${notification.itemName}
  \nLogin to view your notifications. 
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

// == Borrow Request ==
const borrowRequestText = (notification, borrowerUsername, status) =>
  `Hey ${borrowerUsername},
  \n\nyour request to borrow ${notification.itemName} from ${notification.lenderUsername} has been ${status.toLowerCase()}.
  \nLogin to view your notifications. 
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

// == Pick Up Reminder ==
const borrowerPickUpReminderText = (notification) =>
  `Hey ${notification.borrowerUsername},
  \n\nyour pick up date to borrow ${notification.itemName} from ${notification.lenderUsername} is less than 24 hours away.
  \nLogin to view your notifications.
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

const lenderPickUpReminderText = (notification) =>
  `Hey ${notification.lenderUsername}
  \n\n${notification.borrowerUsername} will be arriving to pick up ${notification.itemName} in less than 24 hours.
  \nLogin to view your notifications.
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

// == Drop Off Reminder ==
const borrowerDropOffReminderText = (notification) =>
  `Hey ${notification.borrowerUsername},
  \n\nThe drop off date for ${notification.itemName} from ${notification.lenderUsername} is less than 24 hours away.
  \nLogin to view your notification.
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

const lenderDropOffReminderText = (notification) =>
  `Hey ${notification.lenderUsername},
  \n\n${notification.borrowerUsername} will be arriving to drop off ${notification.itemName} in less than 24 hours.
  \nLogin to view your notifications.
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

module.exports = {
  welcomeText,
  lendingRequestText,
  borrowRequestText,
  borrowerPickUpReminderText,
  lenderPickUpReminderText,
  borrowerDropOffReminderText,
  lenderDropOffReminderText
}

