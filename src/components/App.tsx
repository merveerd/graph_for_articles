import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import BarChart from './BarChart';
import reducers from '../reducers';
import Perf from 'react-addons-perf';
//Perf.start();
const App: React.FC = () => {
  const store = createStore(reducers, {});
  return (
    <Provider store={store}>
      <BarChart></BarChart>
    </Provider>
  );
};

export default App;
