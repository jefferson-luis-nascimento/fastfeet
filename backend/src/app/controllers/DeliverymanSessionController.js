import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Deliveryman_id is not provided.' });
    }

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'createdAt'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found.' });
    }

    const { name, email, avatar, createdAt } = deliveryman;

    return res.json({
      user: {
        id,
        name,
        email,
        created_at: createdAt,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new DeliverymanSessionController();
