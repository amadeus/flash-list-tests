import {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {FlashList, type ListRenderItemInfo} from '@shopify/flash-list';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: '#222',
    bottom: '50%',
  },
  launchPadWrapper: {
    margin: 16,
    marginTop: 100,
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  intermediaryWrapper: {
    flexGrow: 1,
  },
  itemWrapper: {
    marginHorizontal: 8,
    height: 44,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeScrollView: {
    flexShrink: 1,
    flexGrow: 0,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable: {
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  title: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const ESTIMATED_LIST_SIZE = {
  width: 400,
  height: 400,
};

interface FakeFlashList {
  data: any[];
  renderItem(info: {index: number}): React.ReactNode;
  estimatedItemSize: number;
  estimatedListSize: any;
}

function FakeFlashList({data, renderItem}: FakeFlashList) {
  return <ScrollView style={styles.fakeScrollView}>{data.map((_, index) => renderItem({index}))}</ScrollView>;
}

interface ItemProps {
  index: number;
}

function Item({index}: ItemProps) {
  return (
    <View style={styles.itemWrapper} key={index}>
      <Text>Item: {index}</Text>
    </View>
  );
}

function renderItem({index}: ItemProps) {
  return <Item index={index} />;
}

export default function App() {
  const [fakeList, setFakeList] = useState(false);
  const [items, setItems] = useState<any[]>([null, null]);
  const List = fakeList ? FakeFlashList : FlashList;
  return (
    <View style={[StyleSheet.absoluteFill, styles.bg]}>
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <StatusBar style="auto" />
        <View style={styles.launchPadWrapper}>
          <View style={styles.header}>
            <Pressable style={styles.pressable} onPress={() => setFakeList(!fakeList)}>
              <Text>Swap To {fakeList ? 'FlashList' : 'FakeList'}</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => setItems([...items, null])}>
              <Text>Add Item</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => setItems([null, null])}>
              <Text>Reset Items</Text>
            </Pressable>
          </View>
          <List data={items} renderItem={renderItem} estimatedItemSize={44} estimatedListSize={ESTIMATED_LIST_SIZE} />
        </View>
      </View>
    </View>
  );
}
