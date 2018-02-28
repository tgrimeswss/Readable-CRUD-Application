import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

export const store = createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
