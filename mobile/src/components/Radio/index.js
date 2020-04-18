import React, { useState } from 'react';

import { Container, RadioButton, RadioButtonText } from './styles';

export default function Radio() {
  const [checkedPending, setCheckedPending] = useState(true);
  const [checkedDelivered, setCheckedDelivered] = useState(false);

  function handleChecked() {
    setCheckedPending(!checkedPending);
    setCheckedDelivered(!checkedDelivered);
  }

  return (
    <Container>
      <RadioButton>
        <RadioButtonText
          checked={checkedPending}
          onPress={() => handleChecked()}
        >
          Pendentes
        </RadioButtonText>
      </RadioButton>
      <RadioButton>
        <RadioButtonText
          checked={checkedDelivered}
          onPress={() => handleChecked()}
        >
          Entregues
        </RadioButtonText>
      </RadioButton>
    </Container>
  );
}

Radio.defaultProps = {
  onChecked: null,
};
