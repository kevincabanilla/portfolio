import clsx from "clsx";
import {
  appInputLabelStyles,
  appInputFieldStyles,
  type AppInputLabelVariant,
  type AppInputFieldVariant,
} from "./inputStyles";

type AppTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  AppInputLabelVariant &
  AppInputFieldVariant & {
    label: string;
    className: string;
    labelClassName: string;
  };

export default function AppTextArea({
  label,
  className,
  labelClassName,
  ...props
}: AppTextAreaProps) {
  return (
    <>
      <label
        htmlFor={props.id}
        className={clsx(appInputLabelStyles(), labelClassName)}
      >
        {label}
      </label>
      <textarea className={clsx(appInputFieldStyles(), className)} {...props} />
    </>
  );
}
