import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

import * as S from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { groupGetAll } from '@storage/group/groupGetAll';
import { groupCreate } from '@storage/group/groupCreate';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      navigation.navigate('new');
    } catch (error) {
      throw error;
    }
  }

  async function fetchGroups() {
    try {
      const data = await groupGetAll();

      setGroups(data);
    } catch (error) {
      throw error;
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <S.Container>
      <Header />
      <Highlight title="Squads" subtitle="Play with your squad" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        ListEmptyComponent={() => <EmptyList message="Empty Squad List." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          groups.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Create new squad" onPress={handleNewGroup} />
    </S.Container>
  );
}
