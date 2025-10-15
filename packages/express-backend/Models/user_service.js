//Models/user_service.js
import userModel from "../user.js";

function getUsers(name, job) {
  let promise;
  if (!name && !job) return promise = userModel.find();
  if (name && !job) return promise = findUserByName(name);
  if (job && !name) return promise = findUserByJob(job);
  if (name && job) return promise = userModel.find({ name, job });
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};