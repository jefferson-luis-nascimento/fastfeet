import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.INTEGER,
        address_complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        fullAddress: {
          type: Sequelize.VIRTUAL,
          get() {
            let returnValue = `${this.getDataValue(
              'address'
            )}, nº ${this.getDataValue('number')}`;

            if (this.getDataValue('number')) {
              returnValue += ` - ${this.getDataValue('address_complement')}`;
            }

            return returnValue;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
