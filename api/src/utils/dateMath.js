const dateMath = {
  duration(pickUpTime, dropOffTime) {
    let result = 0;

    if (pickUpTime && dropOffTime) {

      const pickUpTimeRounded = new Date(pickUpTime)
      pickUpTimeRounded.setHours(00)
      pickUpTimeRounded.setMinutes(00)
      pickUpTimeRounded.setSeconds(00)
      pickUpTimeRounded.setMilliseconds(00)

      const dropOffTimeRounded = new Date(dropOffTime)
      dropOffTimeRounded.setHours(00)
      dropOffTimeRounded.setMinutes(00)
      dropOffTimeRounded.setSeconds(00)
      dropOffTimeRounded.setMilliseconds(00)

      const timeDifference = dropOffTimeRounded.getTime() - pickUpTimeRounded.getTime()
      result = timeDifference / (1000 * 3600 * 24) + 1
    }
    return result
  }
}

module.exports = dateMath