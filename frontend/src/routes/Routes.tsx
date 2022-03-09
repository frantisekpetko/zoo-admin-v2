import { Redirect, Route, Switch } from 'react-router-dom';
import OpeningPage from 'src/pages/OpeningPage';
import LoginPage from 'src/pages/LoginPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import DetailPage from '../pages/DetailPage';
import AnimalPage from '../pages/AnimalPage';
import NotFound404 from '../pages/NotFound404';
import DataUploadPage from '../pages/DataUploadPage';
import UpdatePage from '../pages/UpdatePage';
import CreatePage from '../pages/CreatePage';

const Routes = () => {
    const isAuth = sessionStorage.getItem('accessToken');

    return (
        <Switch>
            <Route exact path="/" render={(props) => (isAuth !== null ? <HomePage /> : <OpeningPage />)} />

            <Route
                exact
                path="/login"
                render={(props) =>
                    isAuth !== null ? (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    ) : (
                        <LoginPage />
                    )
                }
            />

            <Route
                exact
                path="/upload"
                render={(props) =>
                    isAuth !== null ? (
                        <DataUploadPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/animals"
                render={(props) =>
                    isAuth !== null ? (
                        <AnimalPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/register"
                render={(props) =>
                    isAuth === null ? (
                        <RegisterPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/create'}
                render={() =>
                    isAuth !== null ? 
                        <CreatePage />
                     : (
                        <Redirect
                            to={{
                                pathname: '/login',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/update/:id'}
                render={() =>
                    isAuth !== null ? 
                        <UpdatePage />
                    : (
                        <Redirect
                            to={{
                                pathname: '/login',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/detail/:id'}
                render={() =>
                    isAuth !== null ? (
                        <DetailPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                            }}
                        />
                    )
                }
            />

            <Route component={NotFound404} />
        </Switch>
    );
};

export default Routes;
