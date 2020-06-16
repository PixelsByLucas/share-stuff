export default fullName => {
  const fullNameArr = fullName.split(" ")

  if (fullNameArr.length < 1) {
    return { firstName: "", lastName: "" }
  }

  if (fullNameArr.length < 2) {
    return { firstName: fullName, lastName: "" }
  }

  const firstName = fullNameArr[0]
  const lastName = fullNameArr[fullNameArr.length - 1]

  return { firstName, lastName }
}
