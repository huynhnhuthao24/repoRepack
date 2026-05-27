import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import authReducer from './slices/authSlice';
import {StorageAdapter} from './storageAdapter';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: StorageAdapter,
  whitelist: ['authReducer'],
};

const authPersistConfig = {
  key: 'authReducer',
  storage: StorageAdapter,
  version: 1,
};

const createEnhancers = (getDefaultEnhancers: any) => {
  return getDefaultEnhancers();
};
const reducers = combineReducers({
  authReducer: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
      immutableCheck: false,
    }).concat(),
  enhancers: createEnhancers,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
