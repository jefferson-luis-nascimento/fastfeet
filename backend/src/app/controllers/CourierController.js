import * as Yup from 'yup';

import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async index(req, res) {
    const { courier_id } = req.params;

    const courier = await Courier.findByPk(courier_id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    }

    return res.json(courier);
  }

  async show(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const couriers = await Courier.findAll({
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
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

    const { email } = req.body;

    const courierExists = await Courier.findOne({ where: { email } });

    if (courierExists) {
      res.status(400).json({ error: 'Courier already exists.' });
    }

    const { id, name, avatar_id } = await Courier.create(req.body);

    return res.json({ id, name, email, avatar_id });
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

    const { courier_id } = req.params;
    const courier = await Courier.findByPk(courier_id);

    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    }

    const { email } = req.body;

    if (email && email !== courier.email) {
      const courierExists = await Courier.findOne({ where: { email } });

      if (courierExists) {
        res
          .status(400)
          .json({ error: 'Courier already exists in other register.' });
      }
    }

    const courierUpdated = await courier.update(req.body);

    return res.json(courierUpdated);
  }

  async delete(req, res) {
    const { courier_id } = req.params;
    const courier = await Courier.findByPk(courier_id);

    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    }

    await courier.destroy();

    return res.json({ ok: true });
  }
}

export default new CourierController();
