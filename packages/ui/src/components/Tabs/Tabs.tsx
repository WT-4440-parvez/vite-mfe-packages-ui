import React, { useState } from 'react';
import type { TabsProps } from './Tabs.types';
import Button from '../Button/Button';

export const Tabs: React.FC<TabsProps> = ({ items }) => {
  const [active, setActive] = useState<string>(items[0]?.key || '');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {items.map((it) => (
          <Button
            key={it.key}
            variant='primary'
            onClick={() => setActive(it.key)}
            className={`px-4 py-2 rounded-md ${active === it.key ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
          >
            {it.label}
          </Button>
        ))}
      </div>
      <div className="p-4 bg-white rounded-md shadow-sm">
        {items.find((i) => i.key === active)?.content}
      </div>
    </div>
  );
};

export default Tabs;
