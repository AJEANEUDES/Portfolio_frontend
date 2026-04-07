'use client';

import clsx from 'clsx';

interface FilterTabsProps {
  tabs: { value: string; label: string }[];
  activeTab: string;
  onChange: (value: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeTab === tab.value
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-card dark:text-gray-300 dark:hover:bg-gray-700'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}