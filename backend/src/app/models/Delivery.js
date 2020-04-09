import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.getDataValue('canceled_at')) {
              return 'Cancelada';
            }

            if (
              this.getDataValue('end_date') &&
              !this.getDataValue('canceled_at')
            ) {
              return 'Entregue';
            }

            if (
              this.getDataValue('start_date') &&
              !this.getDataValue('end_date') &&
              !this.getDataValue('canceled_at')
            ) {
              return 'Retirada';
            }

            return 'Pendente';
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
