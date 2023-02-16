import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Filter } from '@components/Filter';

import { FlatList, TextInput } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import * as S from './styles';
import { EmptyList } from '@components/EmptyList';
import { PlayerCard } from '@components/PlayerCard';
import { Button } from '@components/Button';

import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Squad A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New partner', 'Type the name of the partner to add.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New partner', error.message);
      }
      console.log(error);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      playerRemoveByGroup(playerName, group);
    } catch (error) {
      console.log(error);
      Alert.alert('Remove player', 'Unable to remove this person.');
    }
  }

  async function groupRemove(groupName: string) {
    try {
      await groupRemoveByName(groupName);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remove group', 'Unable to remove the group.');
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remove player', 'Do you want to remove the squad?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => groupRemove(group) },
    ]);
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Partners', 'Not possible to load partners.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team, players]);

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add your partners and part the teams"
      />
      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Partner name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

      {!isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handlePlayerRemove(item.name);
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList message="This team is empty." />}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remove Squad"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}
