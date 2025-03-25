import { useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { JSX, useEffect, useState, useCallback } from 'react';
import { usePlanById } from '../common';
import Textfield from '../components/modules/Textfield';
import Card from '../components/modules/Card';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { CustomTable, CustomTd, CustomTh } from '../components/CustomTable';
import clsx from 'clsx';

type PlanFormInputs = {
  order: string;
  load: number;
  assign_barge: { name: string; load: number }[];
  barge_load: string;
};

export default function FormPlans(): JSX.Element {
  const { id } = useParams();
  const isNew = id === 'new';
  const { data: plan, isLoading } = usePlanById(isNew ? undefined : id);
  const [editableLines, setEditableLines] = useState<Set<number>>(new Set());

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlanFormInputs>({
    defaultValues: {
      order: '',
      load: 0,
      assign_barge: [{ name: '', load: 0 }],
      barge_load: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assign_barge',
  });

  useEffect(() => {
    if (plan && !isNew) {
      setValue('order', plan.order);
      setValue('load', plan.load);
      setValue('assign_barge', plan.assign_barge);
      setValue('barge_load', plan.barge_load.join(', '));
    }
  }, [plan, setValue, isNew]);

  const onSubmit = async (data: PlanFormInputs) => {
    const newPlan = {
      order: data.order,
      load: Number(data.load),
      assign_barge: data.assign_barge,
      barge_load: data.barge_load.split(',').map((item) => item.trim()),
    };

    console.log('Submitting:', newPlan);
  };

  const handleEditLine = (index: number): void => {
    setEditableLines((prev) => new Set(prev.add(index)));
  };

  const handleSaveLine = (index: number): void => {
    setEditableLines((prev) => {
      const updated = new Set(prev);
      updated.delete(index);
      return updated;
    });
  };

  const handleRemoveLine = (index: number): void => {
    remove(index);
    setEditableLines((prev) => {
      const updated = new Set(prev);
      updated.delete(index);
      return updated;
    });
  };

  const handleAddLine = useCallback((): void => {
    append({ name: '', load: 0 });
    setEditableLines((prev) => {
      const updated = new Set(prev);
      const newIndex = fields.length;
      updated.add(newIndex);
      return updated;
    });
  }, [append, fields.length]);

  const titles = ['No.', 'Assign barge', 'Barge load', 'action'];

  return (
    <form className="container mx-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5">
        <h1 className="text-2xl font-bold">Plan</h1>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
      {isLoading && !isNew ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mt-5 space-y-4">
          <Card className="h-fit p-5">
            <div className="flex w-full gap-x-5">
              <div className="flex flex-1 gap-x-2">
                <label className="block items-center flex font-semibold text-neutral-600">
                  Order:
                </label>
                <Textfield
                  register={register('order', {
                    required: 'Order is required',
                  })}
                />
                {errors.order && (
                  <p className="text-red-500">{errors.order.message}</p>
                )}
              </div>

              <div className="flex flex-1 gap-x-2">
                <label className="block items-center flex font-semibold text-neutral-600">
                  Load:
                </label>
                <Textfield
                  type="number"
                  register={register('load', {
                    required: 'Load is required',
                    valueAsNumber: true,
                  })}
                />
                {errors.load && (
                  <p className="text-red-500">{errors.load.message}</p>
                )}
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mx-5">Plan Lines</h2>
            <CustomTable>
              <thead>
                <tr>
                  {titles.map((title, index) => (
                    <CustomTh
                      key={index}
                      className={clsx(
                        index === 0 && 'text-left rounded-l-lg w-1',
                        index === titles.length - 1 &&
                          'text-right rounded-r-lg',
                        index !== 0 &&
                          index !== titles.length - 1 &&
                          'text-center',
                      )}
                    >
                      {title}
                    </CustomTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id} className="bg-white">
                    <CustomTd className="max-w-0 rounded-l-lg text-left">
                      {index + 1}
                    </CustomTd>
                    <CustomTd className="text-center">
                      <Textfield
                        readonly={!editableLines.has(index)}
                        register={register(`assign_barge.${index}.name`)}
                        placeholder={`Barge ${index + 1} Name`}
                      />
                    </CustomTd>
                    <CustomTd className="text-center">
                      <Textfield
                        type="number"
                        readonly={!editableLines.has(index)}
                        register={register(`assign_barge.${index}.load`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Load"
                      />
                    </CustomTd>
                    <CustomTd className="text-right">
                      {!editableLines.has(index) ? (
                        <button
                          type="button"
                          onClick={() => handleEditLine(index)}
                          className="p-1.5 bg-red-500 text-white rounded-md"
                        >
                          <Pencil size={15} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSaveLine(index)}
                          className="p-1.5 bg-green-500 text-white rounded-md"
                        >
                          <Save size={15} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveLine(index)}
                        className="p-1.5 bg-red-500 text-white rounded-md ml-2"
                      >
                        <Trash2 size={15} />
                      </button>
                    </CustomTd>
                  </tr>
                ))}
              </tbody>
            </CustomTable>
            <button type="button" onClick={handleAddLine} className="ml-5">
              Add a line
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
