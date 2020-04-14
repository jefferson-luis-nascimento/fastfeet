import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      res.status(404).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async show(req, res) {
    const { page = 1, q: query } = req.query;

    const limit = 200;

    let where = null;

    if (query) {
      where = {
        name: { [Op.iLike]: `%${query}%` },
      };
    }

    const deliverymen = await Deliveryman.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const { email, avatar_id } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const avatarExists = await File.findByPk(avatar_id);

    if (!avatarExists) {
      res.status(400).json({ error: 'Avatar does not exist.' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({ id, name, email, avatar_id, avatar: avatarExists });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { email } = req.body;

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        res
          .status(400)
          .json({ error: 'Deliveryman already exists in other register.' });
      }
    }

    const { avatar_id } = req.body;

    const avatarExists = await File.findByPk(avatar_id);

    if (!avatarExists) {
      res.status(404).json({ error: 'Avatar does not exist.' });
    }

    const deliverymanUpdated = await deliveryman.update(req.body);

    return res.json(deliverymanUpdated);
  }

  async delete(req, res) {
    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      res.status(404).json({ error: 'Deliveryman not found' });
    }

    try {
      await deliveryman.destroy();
      return res.json({ ok: true });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Deliveryman still have deliveries' });
    }
  }
}

export default new DeliverymanController();
