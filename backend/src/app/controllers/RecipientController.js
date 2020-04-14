import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { recipient_id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const {
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    } = recipient;

    return res.json({
      id: recipient_id,
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    });
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

    const recipients = await Recipient.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'address_complement',
        'city',
        'state',
        'zip_code',
      ],
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      address_complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .min(2)
        .max(2),
      zip_code: Yup.string()
        .required()
        .min(8)
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.number(),
      address_complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2),
      zip_code: Yup.string()
        .min(8)
        .max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { recipient_id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const {
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id: recipient_id,
      name,
      address,
      number,
      address_complement,
      city,
      state,
      zip_code,
    });
  }
}

export default new RecipientController();
