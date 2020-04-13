import styled from 'styled-components';

export const DeliveryInfo = styled.div`
  margin: 0px 10px;
  padding: 10px 10px 0px 10px;
  color: #444;

  h3 {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  strong {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

export const DeliveryDates = styled.div`
  border-top: 1px solid #ccc;
  margin: 10px;
  padding: 10px 10px 0px 10px;
  color: #444;

  h3 {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  strong {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;
export const DeliverySignature = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  margin: 10px;
  padding: 10px 10px 0px 10px;
  color: #444;

  img {
    margin-top: 10px;
    width: 200px;
    height: 50px;
    border-radius: 4px;
    border: none;
    background: #ddd;
    align-self: center;
  }
`;
