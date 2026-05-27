import {StyleSheet} from 'react-native-unistyles';
import {Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import {CustomerInfoSelector} from '../../redux/selector/authSelector';

const ShowInfo = () => {
  const info = useAppSelector(CustomerInfoSelector);
  return (
    <View style={styles.container}>
      <Text>{info.userName}</Text>
      <Text>{info.idUser}</Text>
    </View>
  );
};

export default ShowInfo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
});
