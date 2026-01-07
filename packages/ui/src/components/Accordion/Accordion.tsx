import { Accordion, AccordionItem } from "@heroui/react";
import type {
  AppAccordionProps,
  AppAccordionItemProps,
} from "./Accordion.types";

/* Root */
const AppAccordionRoot = ({
  children = null,
  variant = "splitted",
  selectionMode = "single",
  defaultExpandedKeys,
  className,
}: AppAccordionProps) => {
  return (
    <Accordion
      variant={variant}
      selectionMode={selectionMode}
      defaultExpandedKeys={defaultExpandedKeys}
      className={className}
    >
      {children}
    </Accordion>
  );
};

/* Item */
const AppAccordionItem = ({
  itemKey,
  title,
  ariaLabel,
  isDisabled,
  children,
}: AppAccordionItemProps) => {
  return (
    <AccordionItem
      key={itemKey}
      aria-label={ariaLabel ?? title}
      title={title}
      isDisabled={isDisabled}
    >
      {children}
    </AccordionItem>
  );
};

/* Compound export */
export const AppAccordion = Object.assign(AppAccordionRoot, {
  Item: AppAccordionItem,
});

export default AppAccordion;