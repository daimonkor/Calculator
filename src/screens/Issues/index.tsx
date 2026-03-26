import { Animated, StyleSheet, View } from 'react-native';
import { Header, Text } from '../../components';
import { useState } from 'react';
import ScrollView = Animated.ScrollView;
import { colors } from '../../theme/colors.ts';

var arr = [
  {
    guest_type: 'crew',
    first_name: 'Marco',
    last_name: 'Burns',
    guest_booking: {
      room_no: 'A0073',
      some_array: [7, 2, 4],
    },
  },
  {
    guest_type: 'guest',
    first_name: 'John',
    last_name: 'Doe',
    guest_booking: {
      room_no: 'C73',
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: 'guest',
    first_name: 'Jane',
    last_name: 'Doe',
    guest_booking: {
      room_no: 'C73',
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: 'guest',
    first_name: 'Albert',
    last_name: 'Einstein',
    guest_booking: {
      room_no: 'B15',
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: 'crew',
    first_name: 'Jack',
    last_name: 'Daniels',
    guest_booking: {
      room_no: 'B15',
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: 'guest',
    first_name: 'Alan',
    last_name: 'Turing',
    guest_booking: {
      room_no: 'B15',
      some_array: [2, 5, 6, 3],
    },
  },
];

function mutateArray(a) {
  return a.reduce((accumulator, current) => {
    const newCurrent = Object.entries(current)
      ?.map(item => {
        if (typeof item[1] === 'object') {
          return item?.[1];
        }
        return { [item?.[0]]: item[1] };
      })
      ?.reduce((accumulator2, current2) => {
        const totalSomeArray =
          current2?.some_array?.reduce(
            (accumulator3, current3) => accumulator3 + current3,
            0,
          ) ?? -1;
        return {
          ...accumulator2,
          ...current2,
          ...(totalSomeArray >= 0
            ? { some_total: totalSomeArray, some_array: undefined }
            : {}),
        };
      }, {});
    return [...accumulator, newCurrent];
  }, []);
}

export const Issues = () => {
  const [text] = useState(JSON.stringify(mutateArray(arr), null, 2));
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
    >
      <View style={styles.container}>
        <Header />
        <Text style={{ color: colors.white }}>{text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.calculatorBg,
  },
});
