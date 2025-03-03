import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePlanById } from "../common";
import Textfield from "../components/modules/Textfield";

type PlanFormInputs = {
  order: string;
  load: number;
  assign_barge: { name: string; load: number }[];
  barge_load: string;
};

export default function FormPlans() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const { data: plan, isLoading } = usePlanById(isNew ? undefined : id);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlanFormInputs>({
    defaultValues: {
      order: "",
      load: 0,
      assign_barge: [{ name: "", load: 0 }],
      barge_load: "",
    },
  });

  // ใช้ useFieldArray สำหรับ assign_barge
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assign_barge",
  });

  useEffect(() => {
    if (plan && !isNew) {
      setValue("order", plan.order);
      setValue("load", plan.load);
      setValue("assign_barge", plan.assign_barge);
      setValue("barge_load", plan.barge_load.join(", "));
    }
  }, [plan, setValue, isNew]);

  const onSubmit = async (data: PlanFormInputs) => {
    const newPlan = {
      order: data.order,
      load: Number(data.load),
      assign_barge: data.assign_barge,
      barge_load: data.barge_load.split(",").map((item) => item.trim()),
    };

    console.log("Submitting:", newPlan);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">{isNew ? "New Plan" : "Edit Plan"}</h1>

      {isLoading && !isNew ? (
        <h1>Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* Order & Load */}
          <div className="flex w-full items-center gap-x-5">
            <div className="flex flex-1 items-center gap-x-2">
              <label className="block font-semibold text-neutral-600">
                Order:
              </label>
              <Textfield
                register={register("order", { required: "Order is required" })}
              />
              {errors.order && (
                <p className="text-red-500">{errors.order.message}</p>
              )}
            </div>

            <div className="flex flex-1 items-center gap-x-2">
              <label className="block font-semibold text-neutral-600">
                Load:
              </label>
              <Textfield
                type="number"
                register={register("load", {
                  required: "Load is required",
                  valueAsNumber: true,
                })}
              />
              {errors.load && (
                <p className="text-red-500">{errors.load.message}</p>
              )}
            </div>
          </div>

          {/* Assign Barge (Dynamic Line Items) */}
          <div>
            <h2 className="text-lg font-semibold">Assign Barge</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-x-2 items-center mb-2">
                {/* Name */}
                <Textfield
                  register={register(`assign_barge.${index}.name`)}
                  placeholder={`Barge ${index + 1} Name`}
                />
                {/* Load */}
                <Textfield
                  type="number"
                  register={register(`assign_barge.${index}.load`, {
                    valueAsNumber: true,
                  })}
                  placeholder="Load"
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  X
                </button>
              </div>
            ))}
            {/* Add Barge Button */}
            <button
              type="button"
              onClick={() => append({ name: "", load: 0 })}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              + Add Barge
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isNew ? "Create Plan" : "Update Plan"}
          </button>
        </form>
      )}
    </div>
  );
}
