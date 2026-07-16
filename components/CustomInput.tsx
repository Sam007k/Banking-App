import React from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "@base-ui/react/input";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, label, name, placeholder }: CustomInput) => {
  return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="form-item">
            <FieldLabel htmlFor={name} className="form-label">
              {label}
            </FieldLabel>
            <div className="flex w-full flex-col">
              <Input
                {...field}
                id={name}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete="off"
                type={name === "password" ? "password" : "text"}
                className="input-class px-3 py-2 "
              />
            </div>

            {fieldState.invalid && (
              <FieldError
                className="form-message"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
  );
};

export default CustomInput;
