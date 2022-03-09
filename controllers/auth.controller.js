const {
  signUpService,
  signInService,
  getProfileService,
} = require("../services/auth.service");

function signUpController(req, res) {
  const resolve = signUpService(req, res);
  return resolve;
}
function signInController(req, res) {
  const resolve = signInService(req, res);
  return resolve;
}
function getProfileController(req, res) {
  const resolve = getProfileService(req, res);
  return resolve;
}

module.exports = {
  signUpController,
  signInController,
  getProfileController,
};
