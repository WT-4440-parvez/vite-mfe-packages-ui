import React, { useState } from 'react';
import type { CustomTabsProps } from '@mf/shared';
import CustomTabs from 'utilityApp/CustomTabs';
import Card from 'utilityApp/Card';

// Example wrapper component that types props using the federated CustomTabsProps
const CustomTabsDemo: React.FC = () => {

  const tabs: CustomTabsProps['tabs'] = [
      { key: "photos", title: "Photos" },
      { key: "music", title: "Music" },
      { key: "videos", title: "Videos" }
  ];

  const [selected, setSelected] = useState("photos");

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">CustomTabs Demo</h3>
      
      <Card>
          <CustomTabs
            tabs={tabs}
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            {/* Tab 1 content */}
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>

            {/* Tab 2 content */}
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco...
            </div>

            {/* Tab 3 content */}
            <div>
              Excepteur sint occaecat cupidatat non proident...
            </div>
          </CustomTabs>
        </Card>
    </div>
  );
};

export default CustomTabsDemo;
