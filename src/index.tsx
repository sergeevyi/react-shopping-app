import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store';
import { Provider } from 'react-redux';

const client = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    {/* eslint-disable-next-line react/jsx-no-undef */}
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
