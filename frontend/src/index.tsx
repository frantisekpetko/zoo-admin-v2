import React from 'react';
import ReactDOM from 'react-dom';
import 'src/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.Fragment>
        <StoreProvider store={store}>
            <ToastContainer />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </StoreProvider>
    </React.Fragment>,
    document.getElementById('app')
);
