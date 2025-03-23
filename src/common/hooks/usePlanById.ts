import { useQuery } from '@tanstack/react-query';
import { PlansResponse } from '../types';
import { httpClient } from '../services'

const fetchPlanById = async (id: string): Promise<PlansResponse> => {
  const { data } = await httpClient.get<PlansResponse>(`http://127.0.0.1:5000/plan/${id}`);
  return data;
};

export function usePlanById(id?: string) {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: () => fetchPlanById(id!),
    enabled: !!id,
  });
}
