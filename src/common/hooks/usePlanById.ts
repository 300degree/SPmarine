import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlansResponse } from '../types';
import { httpClient } from '../services';

const fetchPlanById = async (id: string): Promise<PlansResponse> => {
  const { data } = await httpClient.get<PlansResponse>(`plan/${id}`);
  return data;
};

export function usePlanById(
  id?: string,
): UseQueryResult<PlansResponse, unknown> {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: () => fetchPlanById(id!),
    enabled: !!id,
  });
}
