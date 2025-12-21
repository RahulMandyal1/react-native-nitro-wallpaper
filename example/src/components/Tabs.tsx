import { View, StyleSheet } from 'react-native';
import { TabButton } from './TabButton';

type Tab = 'url' | 'path' | 'picker';

type TabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabs}>
        <TabButton
          label="URL"
          icon="🌐"
          isActive={activeTab === 'url'}
          onPress={() => onTabChange('url')}
        />
        <TabButton
          label="Path"
          icon="📁"
          isActive={activeTab === 'path'}
          onPress={() => onTabChange('path')}
        />
        <TabButton
          label="Gallery"
          icon="🖼️"
          isActive={activeTab === 'picker'}
          onPress={() => onTabChange('picker')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 6,
  },
});
