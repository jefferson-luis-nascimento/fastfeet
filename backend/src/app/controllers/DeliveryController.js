import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
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

    await Queue.add(DeliveryMail.key, { deliveryman, recipient, createdAt });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      created_at: createdAt,
    });
  }
}

export default new DeliveryController();
