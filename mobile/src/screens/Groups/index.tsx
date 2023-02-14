import * as S from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { useState } from 'react';

import { FlatList } from 'react-native';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Study Group', 'Work']);
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
    </S.Container>
  );
}
