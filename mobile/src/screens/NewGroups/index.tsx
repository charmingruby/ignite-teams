import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

import * as S from './styles';

export function NewGroups() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Squad', 'Type the name of the squad.');
      }

      await groupCreate(group);
      navigation.navigate('players', { group: `${group}` });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Squad', error.message);
      } else {
        Alert.alert('New Squad', 'Unable to create squad.');
      }
    }
  }

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="New Squad"
          subtitle="Create a squad to add your friends."
        />
        <Input placeholder="Squad name" onChangeText={setGroup} />
        <Button title="Create" style={{ marginTop: 16 }} onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
}
