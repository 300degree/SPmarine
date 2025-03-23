import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PlansResponse } from '../types';

const fetchPlanById = async (id: string): Promise<PlansResponse> => {
  const { data } = await axios.get<PlansResponse>(
    `http://127.0.0.1:5000/plan/${id}`,
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
