module.exports.generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
module.exports.generateRandomNumber = (length) => {
  const number = "0123456789"
  let result = "";

  for (let i = 0; i < length; i++) {
    result += number.charAt(Math.floor(Math.random() * number.length));
  }
  return result;
}