import {GetCards} from '@cll.rest/core';
import {Card} from '@cll.rest/types';
import {useCallback, useEffect, useState} from 'react';

type UseCardsProp = {
  loadCards: () => void;
  loading: boolean;
  cards: Card[];
  error: string | undefined;
};

export const useCards = (initialValue: Card[] = []): UseCardsProp => {
  const [cards, setCards] = useState<Card[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateCards = (pageNumber: number = 1) => {
    setLoading(true);
    GetCards('', '')
      .then((res) => setCards(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadCards = useCallback(updateCards, []);

  useEffect(() => updateCards(), []);

  return { loadCards, loading, cards, error };
};
