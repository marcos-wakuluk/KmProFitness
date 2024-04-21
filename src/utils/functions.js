const calculateAge = (birthday) => {
  const currentDate = new Date();
  const birthDate = new Date(birthday);
  let ageDiff = currentDate - birthDate;
  const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

  return age;
};

module.exports = {
  calculateAge
};