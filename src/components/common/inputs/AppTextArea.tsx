import { useState } from "react";
import clsx from "clsx";
import {
  appInputLabelStyles,
  appInputFieldStyles,
  type AppInputLabelVariant,
  type AppInputFieldVariant,
} from "./inputStyles";
import { ValidationData } from "./AppTextField";

type AppTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  AppInputLabelVariant &
  AppInputFieldVariant & {
    label: string;
    labelClassName?: string;
    errorMessage?: string;
  };

export default function AppTextArea({
  label,
  className,
  labelClassName,
  errorMessage,
  ...props
}: AppTextAreaProps) {
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = props.maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        data-lenis-prevent
        className={clsx(appInputFieldStyles(), className)}
        {...props}
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
