import clsx from "clsx";

type AppTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className: string;
  labelClassName: string;
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
        className={clsx(
          "block text-xs text-gray font-semibold uppercase tracking-wider mb-2",
          labelClassName,
        )}
      >
        {label}
      </label>
      <input
        className={clsx(
          "w-full",
          "bg-[rgb(10 10 26 / 50%)]",
          "backdrop-blur-md",
          "border border-white/6",
          "rounded-xl",
          "px-4.5 py-3.5",
          "text-primary text-sm",
          "outline-none",
          "transition-[background,border-color,box-shadow] duration-300 ease-in-out",
          "placeholder:text-muted",
          "focus:bg-[rgb(10 10 26 / 70%)]",
          "focus:border-[rgb(var(--rgb-primary)/0.35)]",
          "focus:shadow-[0_0_0_3px_rgb(var(--rgb-primary)/0.08),0_0_25px_rgb(var(--rgb-primary)/0.06)]",
          className,
        )}
        {...props}
      />
    </>
  );
}
