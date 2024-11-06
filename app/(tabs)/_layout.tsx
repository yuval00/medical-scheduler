import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

type TabIconProps = {
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = ({ color, name, focused }: TabIconProps) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Text
            className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
            style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
  };

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0fa968",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Home"
                focused={focused}
              />
            ),
            tabBarIconStyle: {
                width: 16,
                height: 16
            }
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Schedule"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout