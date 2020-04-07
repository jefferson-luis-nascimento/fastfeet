import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.button`
  background: ${(props) => (props.visible ? '#bbb' : 'none')};
  border: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const ActionList = styled.div`
  display: ${(props) => {
    return props.visible ? 'block' : 'none';
  }};
  z-index: 1;
  position: absolute;
  width: 180px;
  left: calc(50% - 90px);
  top: calc(100% + 30px);
  background: #fff;
  border-radius: 4px;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
`;

export const ActionItem = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
  border: 0;
  width: 100%;
  padding: 15px;

  & + button {
    border-top: 1px solid #aaa;
    width: 100%;
  }

  span {
    margin-left: 10px;
    color: #999;
  }

  &:hover {
    background: #eee;
  }
`;
