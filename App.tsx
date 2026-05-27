/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {HotUpdater} from '@hot-updater/react-native';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import RNConfig from 'react-native-config';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import TestMMKV from './src/components/TestMMKV';
import ShowInfo from './src/components/ShowInfo';
import {StyleSheet} from 'react-native-unistyles';

const HOT_UPDATER_DEFAULT_BASE =
  'https://lbxoutnfhccsnbbjmbsc.supabase.co/functions/v1/update-server';

function App(): React.JSX.Element {
  const currentBundleId = HotUpdater.getBundleId();
  const appVersion = HotUpdater.getAppVersion();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <ScrollView>
            <View>
              <Header />
            </View>
            <ShowInfo />
            <TestMMKV />
            <Text style={{color: 'black'}}>{currentBundleId}</Text>
            <Text style={{color: 'black'}}>{appVersion}</Text>
          </ScrollView>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default HotUpdater.wrap({
  baseURL:
    (
      RNConfig as {HOT_UPDATER_UPDATE_SERVER_URL?: string}
    ).HOT_UPDATER_UPDATE_SERVER_URL?.trim() || HOT_UPDATER_DEFAULT_BASE,
  updateStrategy: 'appVersion',
  updateMode: 'auto',
  fallbackComponent: ({progress, status}) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        {status === 'UPDATING' ? 'Updating...' : 'Checking for update...'}
      </Text>
      {progress > 0 ? (
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null}
    </View>
  ),
})(App);
