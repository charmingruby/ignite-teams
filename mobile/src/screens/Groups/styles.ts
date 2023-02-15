import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 24px;
  flex: 1;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 32px;
`;
