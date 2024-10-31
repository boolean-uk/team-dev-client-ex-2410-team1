const isValidEmail = (email) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validRegex.test(email);
};

const isValidPassword = (password) => {
  const validRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validRegex.test(password);
};

export { isValidEmail, isValidPassword };
