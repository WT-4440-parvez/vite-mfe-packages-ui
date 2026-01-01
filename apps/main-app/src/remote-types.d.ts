declare module 'utilityApp/Button' {
  import { ButtonProps } from './types/shared-types';
  export const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module 'utilityApp/Card' {
  import { CardProps } from './types/shared-types';
  export const Card: React.FC<CardProps>;
  export default Card;
}

declare module 'utilityApp/Input' {
  import { InputProps } from './types/shared-types';
  export const Input: React.FC<InputProps>;
  export default Input;
}

declare module 'utilityApp/Modal' {
  import { ModalProps } from './types/shared-types';
  export const Modal: React.FC<ModalProps>;
  export default Modal;
}

declare module 'utilityApp/Table' {
  import { TableProps } from './types/shared-types';
  export const Table: React.FC<TableProps<any>>;
  export default Table;
}

declare module 'utilityApp/Tabs' {
  import { TabsProps } from './types/shared-types';
  export const Tabs: React.FC<TabsProps>;
  export default Tabs;
}

declare module 'utilityApp/HeroButton' {
  export const HeroButton: React.FC<any>;
  export default HeroButton;
}

declare module 'utilityApp/CustomTabs' {
  import { CustomTab, CustomTabsProps } from './types/shared-types';
  export const CustomTabs: React.FC<CustomTabsProps>;
  export default CustomTabs;
}
