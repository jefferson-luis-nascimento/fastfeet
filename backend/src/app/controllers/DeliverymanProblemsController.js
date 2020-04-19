import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async show(req, res) {
    const { delivery_id } = req.params;

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
      where: {
        delivery_id,
      },
      attributes: ['id', 'description', 'delivery_id', 'created_at'],
    });

    return res.json(deliveryProblems);
  }
}

export default new DeliveryProblemController();
