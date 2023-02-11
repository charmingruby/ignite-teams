import * as S from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight title="Squads" subtitle="Play with your squad" />
      <GroupCard title="Pain" />
    </S.Container>
  );
}
