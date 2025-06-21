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
      <div className="border-b dark:border-white-15 border-black-15 pb-3 gap-5 flex flex-row mb-4 md:mb-6">
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            className={activeTab === index ? "active" : "!no-underline"}
            onPress={() => setActiveTab(index)}
          >
            <Text
              className={cn(
                "dark:text-white-50 text-black-50 text-base font-medium dark:hover:text-white hover:text-black transition-all duration-150 capitalize",
                activeTab === index ? "dark:text-white text-black" : "",
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </div>
      <section>{tabs[activeTab]?.content}</section>
    </div>
  );
};

export default Tabs;
