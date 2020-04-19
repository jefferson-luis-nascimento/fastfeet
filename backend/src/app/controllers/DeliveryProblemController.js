import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const { problem_id } = req.params;

    const problem = await DeliveryProblem.findByPk(problem_id);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const { id, description, delivery_id, created_at } = problem;

    return res.json({ id, description, delivery_id, created_at });
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    const limit = 20;

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'description', 'delivery_id', 'created_at'],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Description not provided.' });
    }

    const { delivery_id } = req.params;

    const {
      id,
      description,
      createdAt: created_at,
    } = await DeliveryProblem.create({
      delivery_id,
      ...req.body,
    });

    return res.json({ id, description, created_at });
  }

  async delete(req, res) {
    const { problem_id } = req.params;

    const { delivery_id } = await DeliveryProblem.findByPk(problem_id);

    if (!delivery_id) {
      return res.status(404).json({ error: 'Delivery Problem not found' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    const { canceled_at } = await delivery.update({ canceled_at: new Date() });

    return res.json({ id: problem_id, canceled_at });
  }
}

export default new DeliveryProblemController();
