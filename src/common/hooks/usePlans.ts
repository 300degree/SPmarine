import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PlansResponse } from '../types';

const fetch = async (): Promise<PlansResponse[]> => {
  const { data } = await axios.get<PlansResponse[]>(
    'https://67b086673fc4eef538e7a359.mockapi.io/orders',
  );
  console.log(data);
  return data;
};

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: fetch,
  });
}
