import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Filter } from '@components/Filter';

import { FlatList } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import * as S from './styles';
import { EmptyList } from '@components/EmptyList';
import { PlayerCard } from '@components/PlayerCard';
import { Button } from '@components/Button';

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState('Squad A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add your partners and part the teams"
      />
      <S.Form>
        <Input placeholder="Partner name" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </S.Form>

      <S.ListHeader>
        <FlatList
          data={['Squad A', 'Squad B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => {
                setTeam(item);
              }}
            />
          )}
          horizontal={true}
        />
        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.ListHeader>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyList message="This team is empty." />}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remove Squad" type="SECONDARY" />
    </S.Container>
  );
}
