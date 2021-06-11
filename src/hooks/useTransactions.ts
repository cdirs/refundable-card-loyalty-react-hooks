import {GetTransactions} from '@cll.rest/core';
import {Transaction} from '@cll.rest/types';
import {useCallback, useEffect, useState} from 'react';

type UseTransactionsProp = {
  loadTransactions: () => void;
  loading: boolean;
  transactions: Transaction[];
  error: string | undefined;
};

export const useTransactions = (
  apikey: string,
  userId: string,
  initialValue: Transaction[] = [],
): UseTransactionsProp => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateTransactions = (pageNumber: number = 1) => {
    setLoading(true);
    GetTransactions(apikey, userId)
      .then((res) => setTransactions(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadTransactions = useCallback(updateTransactions, []);

  useEffect(() => updateTransactions(), []);

  return { loadTransactions, loading, transactions, error };
};
