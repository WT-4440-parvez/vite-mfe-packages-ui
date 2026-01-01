import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import React from "react";
import { CustomTabsProps } from './CustomTabs.types';

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  selectedKey,
  onSelectionChange,
  children,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`flex w-full flex-col ${className || ""}`}>
      <Tabs
        aria-label="Dynamic Tabs"
        selectedKey={selectedKey}
        onSelectionChange={(key) => onSelectionChange(String(key))}
        disabledKeys={tabs.filter((t) => t.disabled).map((t) => t.key)}
      >
        {tabs.map((tab, index) => (
          <Tab key={tab.key} title={tab.title}>
            <Card>
              <CardBody>{childrenArray[index]}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
