import {createSelector} from 'reselect';
import {RootState} from '../store';

const authDataGenerator = (state: RootState) => state.authReducer;

export const CustomerInfoSelector = createSelector(
  [authDataGenerator],
  auth => {
    return {
      ...auth,
    };
  },
);
