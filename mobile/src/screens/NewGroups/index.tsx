import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import * as S from './styles';

export function NewGroups() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group: `${group}` });
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
