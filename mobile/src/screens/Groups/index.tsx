import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native';

import * as S from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Study Group', 'Work']);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  return (
    <S.Container>
      <Header />
      <Highlight title="Squads" subtitle="Play with your squad" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => <EmptyList message="Empty Squad List." />}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Create new squad" onPress={handleNewGroup} />
    </S.Container>
  );
}
