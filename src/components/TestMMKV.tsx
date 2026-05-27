import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RNFetchBlob from 'react-native-blob-util';
import {saveInfoToken} from '../../redux/slices/authSlice';
import {useAppDispatch} from '../../redux/hooks';

const TestMMKV = () => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(
          saveInfoToken({
            userName: 'Test User',
            idUser: '12345',
          }),
        );
      }}>
      <Text>Save User</Text>
    </TouchableOpacity>
  );
};

export default TestMMKV;

const styles = StyleSheet.create({});
