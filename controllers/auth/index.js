const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const avatars = require('./avatars')
const verify = require('./verify')
const sendAgain = require('./sendAgain')

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  avatars,
  verify,
  sendAgain
}
