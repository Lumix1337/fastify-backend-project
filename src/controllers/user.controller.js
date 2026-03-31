import User from '../models/user.model.js'

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id)
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createUser(req, res) {
  try {
    const user = new User(req.body)
    const result = await user.save()
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.send("Not implemented yet");
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(203).send("Not implemented yet");
  } catch (error) {
    res.status(500).send(error);
  }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}