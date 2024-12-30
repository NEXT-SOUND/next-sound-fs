import React, { useState } from "react";
import { Button } from "../button";
import { Pressable } from "../primitives/slot";
import { Text } from "../text";
import { cn } from "../utils/cn";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

const Tabs: React.FC<{ tabs: TabProps[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-white-15 pb-3 gap-5 flex flex-row mb-4 md:mb-6">
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            className={activeTab === index ? "active" : "!no-underline"}
            onPress={() => setActiveTab(index)}
          >
            <Text
              className={cn(
                "text-white-50 text-base font-medium hover:text-white transition-all duration-150 capitalize",
                activeTab === index ? "text-white" : "",
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
