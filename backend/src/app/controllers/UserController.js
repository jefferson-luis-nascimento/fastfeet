import User from '../models/User';

class UserController {
  async index(req, res) {
    return res.json({ index: true });
  }

  async show(req, res) {
    return res.json({ show: true });
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    return res.json({ update: true });
  }

  async delete(req, res) {
    return res.json({ delete: true });
  }
}

export default new UserController();
