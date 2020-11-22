import React from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import BarChart from "./BarChart";
import reducers from '../reducers'

const App: React.FC = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <BarChart></BarChart>
      </Provider>
  );
};

export default App
