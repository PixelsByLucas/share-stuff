const welcomeText = (firstName) =>
  `Hey  ${firstName},
  \n\nthanks for joining the ShareStuff community!  
  \nNavigate to your profile to post items for others to borrow. You will receive karma points for lending your stuff to other users. You can use the points you accumulate to borrow stuff from other members.
  \n\nWe've given you a gift of 1000 karma to get you started. 
  \n\nDo good,
  \nShareStuff`

const lendingRequestText = (notification, lenderUsername) =>
  `Hey ${lenderUsername},
  \n\nyou've just received a new lending request!
  \n${notification.borrowerUsername} is requesting to borrow ${notification.itemName}
  \nLogin to view your notifications. 
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

const borrowRequestText = (notification, borrowerUsername, status) =>
  `Hey ${borrowerUsername}
  \n\nyour request to borrow ${notification.itemName} from ${notification.lenderUsername} has been ${status.toLowerCase()}.
  \nLogin to view your notifications. 
  \n${process.env.CLIENT_URL}/
  \n\nDo good,
  \nShareStuff`

module.exports = {
  welcomeText,
  lendingRequestText,
  borrowRequestText
}
