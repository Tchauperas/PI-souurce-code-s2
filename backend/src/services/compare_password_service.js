function comparePasswordService(password, user_password) {
  if (password == user_password) {
    return true;
  } else {
    return false;
  }
}

module.exports = comparePasswordService;
