import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
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
