const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const convertTimeTo12Format = (hourIn24, minutes) => {
  let hours = Number(hourIn24)
  const amOrPm = hours >= 12 ? "PM" : "AM"

  if (hours < 1) {
    hours = 12
  }

  if (hours > 12) {
    hours = hours - 12
  }

  if (Number(minutes) < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}${amOrPm}`
}

export const dateFormat = (dateString) => {
  const date = new Date(dateString)
  // const year = date.getFullYear()
  const month = months[date.getMonth()]
  const dayOfMonth = date.getDate()
  const dayOfWeek = days[date.getDay()]
  const time = convertTimeTo12Format(date.getHours(), date.getMinutes())

  return `${dayOfWeek} ${month} ${dayOfMonth} - ${time}`
}

export const getTimeFromDate = (dateString) => {
  const date = new Date(dateString)
  return convertTimeTo12Format(date.getHours(), date.getMinutes())
}

export const combineDateAndTimeToUTC = (date, time) => {
  // NOTE: date arrives as yyyy-mm-dd
  const dateParts = date.split("-")
  const timeParts = time.split(":")
  date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1])

  return date
}

export const getVuetifyDateFormat = (date) => {
  const month = date.getMonth() >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
  return `${date.getFullYear()}-${month}-${day}`
}

export const getDurationInDays = (pickUpDate, dropOffDate) => {
  pickUpDate = new Date(pickUpDate)
  pickUpDate.setHours(0)
  pickUpDate.setMinutes(0)

  dropOffDate = new Date(dropOffDate)
  dropOffDate.setHours(0)
  dropOffDate.setMinutes(0)

  let result = 0

  const timeDifference = dropOffDate - pickUpDate

  result = timeDifference / (1000 * 3600 * 24) + 1

  return result

}