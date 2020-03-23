import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product, createdAt } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'deliveryMail',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product,
        address: recipient.address,
        number: recipient.number,
        address_complement: recipient.address_complement,
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
        date: format(parseISO(createdAt), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new DeliveryMail();
