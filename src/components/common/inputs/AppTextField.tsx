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
  };

export default function AppTextField({
  label,
  className,
  labelClassName,
  ...props
}: AppTextFieldProps) {
  return (
    <>
      <label
        htmlFor={props.id}
        className={clsx(appInputLabelStyles(), labelClassName)}
      >
        {label}
      </label>
      <input className={clsx(appInputFieldStyles(), className)} {...props} />
    </>
  );
}
