import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlansResponse } from '../types';
import { httpClient } from '../services';

const fetch = async (): Promise<PlansResponse[]> => {
  const { data } = await httpClient.get<PlansResponse[]>('plans');
  return data;
};

export function usePlans(): UseQueryResult<PlansResponse[], unknown> {
  return useQuery({
    queryKey: ['plans'],
    queryFn: fetch,
  });
}
