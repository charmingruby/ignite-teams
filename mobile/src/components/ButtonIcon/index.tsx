import * as S from './styles';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  type?: S.ButtonIconTypeStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <S.Icon name={icon} type={type} />
    </S.Container>
  );
}
