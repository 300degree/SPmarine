import { useParams } from 'react-router-dom';
import { usePlans } from '../common';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch } from '../common/store/store';
import { planAsync, planSelector } from '../common/store/slices/planSlice';
import { useSelector } from 'react-redux';

export default function FormPlans() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const planReducer = useSelector(planSelector);

  useEffect(() => {
    if (id) {
      dispatch(planAsync({ id }));
    }
  }, [id, dispatch]);

  if (planReducer.isPending || !planReducer.result) return 'Loading...';

  return (
    <div className="container mx-auto">
      <h1>FormPlans</h1>
      <p>Plan ID: {JSON.stringify(planReducer.result.load)}</p>
    </div>
  );
}
