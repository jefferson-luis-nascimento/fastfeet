import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

const attributes = {
  attributes: [
    'id',
    'recipient_id',
    'deliveryman_id',
    'signature_id',
    'created_at',
    'canceled_at',
    'start_date',
    'end_date',
    'status',
  ],
  include: [
    {
      model: Recipient,
      as: 'recipient',
      attributes: [
        'name',
        'address',
        'number',
        'address_complement',
        'city',
        'state',
        'zip_code',
      ],
    },
    {
      model: Deliveryman,
      as: 'deliveryman',
      attributes: ['name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    },
    {
      model: File,
      as: 'signature',
      attributes: ['name', 'path', 'url'],
    },
  ],
  order: ['id'],
};

class DeliveryController {
  async index(req, res) {
    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id, attributes);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    const limit = 5;

    const deliveries = await Delivery.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      ...attributes,
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, signature_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found.' });
    }

    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res.status(404).json({ error: 'Signature not found.' });
    }

    const { id, createdAt } = await Delivery.create({
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });

    await Queue.add(DeliveryMail.key, {
      deliveryman,
      recipient,
      product,
      createdAt,
    });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      created_at: createdAt,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const { recipient_id, deliveryman_id, signature_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found.' });
    }

    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res.status(404).json({ error: 'Signature not found.' });
    }

    const { createdAt: created_at } = await delivery.update(req.body);

    return res.json({
      id: delivery_id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      created_at,
    });
  }

  async delete(req, res) {
    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.destroy(delivery_id);

    return res.json({ ok: true });
  }
}

export default new DeliveryController();
