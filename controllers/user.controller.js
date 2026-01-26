const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
  try {
	const user = await userService.createUser(req.body);
	return res.status(201).json(user);
  } catch (err) {
	return res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
	try {
		const users = await userService.getUsers();
		return res.json(users);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};
