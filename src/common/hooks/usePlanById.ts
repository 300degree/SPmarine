import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PlansResponse } from '../types';

const fetchPlanById = async (id: string): Promise<PlansResponse> => {
  const { data } = await axios.get<PlansResponse>(
    `https://67b086673fc4eef538e7a359.mockapi.io/orders/${id}`,
  );
  return data;
};

export function usePlanById(id?: string) {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: () => fetchPlanById(id!),
    enabled: !!id,
  });
}
