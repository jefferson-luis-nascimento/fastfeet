import * as Yup from 'yup';
import Op from 'sequelize/lib/operators';
import { getYear, getMonth, getDate } from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

const attributes = {
  attributes: [
    'id',
    'product',
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
        'fullAddress',
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

class StartEndDeliveryController {
  async show(req, res) {
    const { page = 1, status } = req.query;

    const limit = 20;

    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    let where = {
      deliveryman_id,
      canceled_at: null,
    };

    if (status) {
      if (status.toLowerCase() === 'pendentes') {
        where = {
          ...where,
          end_date: null,
        };
      }

      if (status.toLowerCase() === 'entregues') {
        where = {
          ...where,
          end_date: { [Op.ne]: null },
        };
      }
    }

    const deliveries = await Delivery.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      ...attributes,
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Delivery_id not provided' });
    }

    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { delivery_id } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.start_date) {
      return res
        .status(404)
        .json({ error: 'Delivery already on the way to recipient' });
    }

    const start_date = new Date();

    const minDate = new Date(
      getYear(start_date),
      getMonth(start_date),
      getDate(start_date),
      8,
      0,
      0
    );

    const maxDate = new Date(
      getYear(start_date),
      getMonth(start_date),
      getDate(start_date),
      20,
      0,
      0
    );

    if (start_date <= minDate || start_date >= maxDate) {
      return res
        .status(400)
        .json({ error: 'Delivery is permitted between 08:00 and 18:00' });
    }

    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    if (deliveries.count >= 5) {
      return res
        .status(400)
        .json({ error: 'Only 5 deliveries is permitted per day' });
    }

    await delivery.update({ start_date });

    const newDelivery = await Delivery.findByPk(delivery_id, {
      ...attributes,
    });

    return res.json(newDelivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Delivery_id or Signature_id not provided' });
    }

    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { delivery_id, signature_id } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery already is delivered' });
    }

    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    const { end_date } = await delivery.update({
      end_date: new Date(),
      signature_id,
    });

    return res.json({
      delivery_id,
      end_date,
    });
  }
}

export default new StartEndDeliveryController();
