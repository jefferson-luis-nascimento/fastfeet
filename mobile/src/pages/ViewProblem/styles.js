import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const BackgroundNavigation = styled.View`
  background: #7d40e7;
  height: 180px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #fff;
  margin: -100px 20px 20px;
  border-radius: 4px;
  padding: 10px;
`;

export const ListItem = styled.View`
  border: 1px solid #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Problem = styled.Text`
  color: #999;
  flex: 1;
`;

export const Date = styled.Text`
  color: #999;
  margin-left: 10px;
`;
