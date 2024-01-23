import React from "react";
import { useController } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  control: any;
  validations?: any;
}

const Input = ({ label, control, name, validations }: InputProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: validations,
  });

  const { error, isTouched } = fieldState;

  return (
    <div className="flex flex-col px-6 mt-4">
      <label className="font-semibold">{label}:</label>

      <input {...field} name={name} className="border-2 rounded-md pl-2" />
      {isTouched && error?.message && (
        <span className="text-red-500">{error?.message}</span>
      )}
    </div>
  );
};

export default Input;
