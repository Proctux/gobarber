import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  text-align: center;

  padding: 0 30px ${Platform.OS === 'ios' ? 150 : 40}px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 93px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin: 24px 0;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
`;
