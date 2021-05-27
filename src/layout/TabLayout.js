import { TabBar } from "antd-mobile";
import { useState } from "react";

const TabLayout = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <TabBar>
      <TabBar.Item
        title="Home"
        key="home"
        selected={selectedTab === "home"}
        onPress={() => {
          setSelectedTab("home");
        }}
        icon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/home.svg')",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/home_selected.svg')",
            }}
          />
        }
      >
        {tabs[0]}
      </TabBar.Item>
      {/* <TabBar.Item
        title="History"
        key="history"
        selected={selectedTab === "history"}
        onPress={() => {
          setSelectedTab("history")
        }}
        icon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/history.svg')",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/history_selected.svg')",
            }}
          />
        }
      >
        {tabs[1]}
      </TabBar.Item> */}
      <TabBar.Item
        title="Profile"
        key="profile"
        selected={selectedTab === "profile"}
        onPress={() => {
          setSelectedTab("profile");
        }}
        icon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/profile.svg')",
            }}
          />
        }
        selectedIcon={
          <div
            style={{
              width: 22,
              height: 22,
              background: "url('/images/profile_selected.svg')",
            }}
          />
        }
      >
        {tabs[1]}
      </TabBar.Item>
    </TabBar>
  );
};

export default TabLayout
