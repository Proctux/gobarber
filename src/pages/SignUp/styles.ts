import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin: 64px 0 24px;
  color: #f4ede8;
`;

export const BackToLogonButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-color: #232129;
`;

export const BackToLogonButtonText = styled.Text`
  margin-left: 16px;
  color: #f4ede8;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
`;
