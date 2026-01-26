const User = require("../models/User");

async function createUser(data) {
  return await User.create(data);
}

async function getUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
