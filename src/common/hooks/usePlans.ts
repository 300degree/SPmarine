import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PlansResponse } from '../types';

const fetch = async (): Promise<PlansResponse[]> => {
  const { data } = await axios.get<PlansResponse[]>(
    'http://127.0.0.1:5000/plans',
  );
  return data;
};

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: fetch,
  });
}
