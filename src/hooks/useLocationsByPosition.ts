import { GetLocationsByPosition } from '@cll.rest/core';
import { Location } from '@cll.rest/types';
import { useCallback, useEffect, useState } from 'react';

type UseLocationsProp = {
  loadLocations: (pageNumber: number, longitudeOverride: number, latitudeOverride: number) => void;
  loading: boolean;
  locations: Location[];
  error: string | undefined;
};

export const useLocationsByPosition = (
  apikey: string,
  longitude: number,
  latitude: number,
  initialValue: Location[] = [],
): UseLocationsProp => {
  const [locations, setLocations] = useState<Location[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateLocations = (
    pageNumber: number = 1,
    longitudeOverride: number = longitude,
    latitudeOverride: number = latitude,
  ) => {
    setLoading(true);
    GetLocationsByPosition(apikey, longitudeOverride, latitudeOverride)
      .then((res) => setLocations(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadLocations = useCallback(updateLocations, []);

  return { loadLocations, loading, locations, error };
};
