export default fullName => {
  const fullNameArr = fullName.split(" ");

  if (fullNameArr.length < 1) {
    return { firstName: "Unknown", lastName: "Unknown" };
  }

  if (fullNameArr.length < 2) {
    return { firstName: fullName, lastName: "Unknown" };
  }

  const firstName = fullNameArr[0];
  const lastName = fullNameArr[fullNameArr.length - 1];

  return { firstName, lastName };
};
