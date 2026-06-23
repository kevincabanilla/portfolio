import React from "react";
import clsx from "clsx";
import { useRipple } from "@/hooks";
import { RippleLayer } from "../ui";

type RippleContainerProps = {
  children: React.ReactNode;
  className?: string;
  rippleClassName?: string;
};

export default function RippleContainer({
  children,
  className = "",
  rippleClassName = "",
}: RippleContainerProps) {
  const { ripples, addRipple } = useRipple();

  return (
    <div
      onClick={addRipple}
      className={clsx("relative overflow-hidden", className)}
    >
      {children}

      <RippleLayer ripples={ripples} className={rippleClassName} />
    </div>
  );
}
