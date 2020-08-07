const dateMath = {
  duration(pickUpDate, dropOffDate) {
    let result = 0;

    if (pickUpDate && dropOffDate) {
      const timeDifference =
        new Date(dropOffDate).getTime() - new Date(pickUpDate).getTime();

      result = timeDifference / (1000 * 3600 * 24) + 1;
    }
    return result;
  }
}

module.exports = dateMath