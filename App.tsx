
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './store';
import CartScreen from './components/CartScreen';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <CartScreen />
      </PaperProvider>
    </ReduxProvider>
  );
}
