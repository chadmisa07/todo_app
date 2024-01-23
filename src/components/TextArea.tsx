import React from "react";
import { useController } from "react-hook-form";

interface TextareaProps {
  name: string;
  label: string;
  control: any;
  validations?: any;
}

const TextArea = ({ label, control, name, validations }: TextareaProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: validations,
  });
  const { error, isTouched } = fieldState;

  return (
    <div className="flex flex-col px-6 mt-4">
      <label className="font-semibold">{label}:</label>

      <textarea className="border-2 rounded-md pl-2" {...field} rows={5} />
      {isTouched && error?.message && (
        <span className="text-red-500">{error?.message}</span>
      )}
    </div>
  );
};

export default TextArea;
