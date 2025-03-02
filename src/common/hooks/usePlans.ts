import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../services';
import { routers } from '../constants';

export function usePlans(id: string) {
  return useQuery({
    queryKey: ['sing'],
    queryFn: () => fetchPlans(id),
    // enabled: !!id,
  });
}

async function fetchPlans(id: string): Promise<any> {
  const response = await httpClient.get(`${routers.plan}/${id}`);
  return response.data;
}
