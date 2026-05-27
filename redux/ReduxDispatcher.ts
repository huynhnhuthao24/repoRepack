import React from 'react';
import { AppDispatch } from './store';

export const dispatchRef: {
    current: any | null | undefined;
} = React.createRef<(action: Parameters<AppDispatch>[0]) => void>();

const ReduxDispatcher = (action: Parameters<AppDispatch>[0]) => {
    dispatchRef.current?.(action);
};

export default ReduxDispatcher;
