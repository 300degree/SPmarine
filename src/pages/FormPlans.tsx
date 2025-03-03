import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlanById } from '../common';
import { useEffect } from 'react';

type PlanFormInputs = {
  order: string;
  load: number;
  assign_barge: string;
  barge_load: string;
};

export default function FormPlans() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const { data: plan, isLoading } = usePlanById(isNew ? undefined : id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlanFormInputs>();

  useEffect(() => {
    if (plan && !isNew) {
      setValue('order', plan.order);
      setValue('load', plan.load);
      setValue('assign_barge', plan.assing_barge.join(', '));
      setValue('barge_load', plan.barge_load.join(', '));
    }
  }, [plan, setValue, isNew]);

  const onSubmit = async (data: PlanFormInputs) => {
    const newPlan = {
      order: data.order,
      load: Number(data.load),
      assign_barge: data.assign_barge.split(',').map((item) => item.trim()),
      barge_load: data.barge_load.split(',').map((item) => item.trim()),
    };

    console.log('Submitting:', newPlan);

    try {
      if (isNew) {
        await fetch('http://127.0.0.1:5000/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPlan),
        });
        alert('New plan created!');
      } else {
        await fetch(`http://127.0.0.1:5000/plans/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPlan),
        });
        alert('Plan updated successfully!');
      }
      navigate('/plans');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan');
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">{isNew ? 'New Plan' : 'Edit Plan'}</h1>

      {isLoading && !isNew ? (
        <h1>Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <label className="block font-bold">Order:</label>
            <input
              {...register('order', { required: 'Order is required' })}
              className="border p-2 w-full rounded"
            />
            {errors.order && (
              <p className="text-red-500">{errors.order.message}</p>
            )}
          </div>

          <div>
            <label className="block font-bold">Load:</label>
            <input
              type="number"
              {...register('load', {
                required: 'Load is required',
                valueAsNumber: true,
              })}
              className="border p-2 w-full rounded"
            />
            {errors.load && (
              <p className="text-red-500">{errors.load.message}</p>
            )}
          </div>

          <div>
            <label className="block font-bold">
              Assign Barge (comma separated):
            </label>
            <input
              {...register('assign_barge')}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-bold">
              Barge Load (comma separated):
            </label>
            <input
              {...register('barge_load')}
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isNew ? 'Create Plan' : 'Update Plan'}
          </button>
        </form>
      )}
    </div>
  );
}
