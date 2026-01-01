import type {ButtonProps as BaseButtonProps} from "@heroui/button";

import {forwardRef} from "react";
import {useButton, Ripple, Spinner} from "@heroui/react";

export interface ButtonProps extends BaseButtonProps {}

const HeroButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    // ---- Default Props ----
    color = "primary",
    radius = "md",
    size = "md",

    // ---- User Props (overrides default) ----
    ...rest
  } = props;

  const {
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({
    ref,
    color, 
    radius,
    size,
    ...rest,
  });

  const {ripples, onClear} = getRippleProps();

  return (
    <button ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
    </button>
  );
});

HeroButton.displayName = "Button";

export default HeroButton;
