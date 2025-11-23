import { useState } from "react";

const tabs = ["Pets", "Animations", "Themes"];

export function ShopTabs({ children }) {
  const [activeTab, setActiveTab] = useState("Pets");

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 px-4 font-medium transition-colors touch-target
              ${
                activeTab === tab
                  ? "text-accent-warm border-b-2 border-accent-warm"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{children({ activeTab })}</div>
    </div>
  );
}
