import { useState } from "react";
import clsx from "clsx";
import {
  appInputLabelStyles,
  appInputFieldStyles,
  type AppInputLabelVariant,
  type AppInputFieldVariant,
} from "./inputStyles";

type AppTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  AppInputLabelVariant &
  AppInputFieldVariant & {
    label: string;
    labelClassName?: string;
    errorMessage?: string;
  };

export default function AppTextField({
  label,
  className,
  labelClassName,
  errorMessage,
  ...props
}: AppTextFieldProps) {
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = props.maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(e.target.value.length);
    // preserve consumer's onChange
    props.onChange?.(e);
  };

  return (
    <>
      <label
        htmlFor={props.id}
        className={clsx(appInputLabelStyles(), labelClassName)}
      >
        {label}
      </label>
      <input
        type="text"
        className={clsx(appInputFieldStyles(), className)}
        {...props}
        // The bindings below will override {...props}
        onChange={handleChange}
      />

      <ValidationData
        currentLength={currentLength}
        maxLength={maxLength}
        errorMessage={errorMessage}
      />
    </>
  );
}

export function ValidationData({
  currentLength,
  maxLength,
  errorMessage,
}: {
  currentLength?: number;
  maxLength?: number;
  errorMessage?: string;
}) {
  return (
    <div className="flex gap-2 text-xs py-0.5 px-1">
      <div className="grow">
        {errorMessage && <span className="text-rose-500">{errorMessage}</span>}
      </div>
      {maxLength && maxLength > 0 && (
        <div className="shrink-0 text-muted">
          <span>
            {currentLength}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
