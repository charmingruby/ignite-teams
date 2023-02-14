import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import * as S from './styles';

export function NewGroups() {
  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="New Squad"
          subtitle="Create a squad to add your friends."
        />
        <Input placeholder="Squad name" />
        <Button title="Create" style={{ marginTop: 16 }} />
      </S.Content>
    </S.Container>
  );
}
