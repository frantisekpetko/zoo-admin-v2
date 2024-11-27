import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DetailPage from '../pages/DetailPage';
import AnimalPage from '../pages/AnimalPage';
import NotFound404 from '../pages/NotFound404';
import DataUploadPage from '../pages/DataUploadPage';
import UpdatePage from '../pages/UpdatePage';
import CreatePage from '../pages/CreatePage';
import { useStoreState } from '../store';
import { Suspense, lazy } from 'react';

const Routes = () => {
    const OpeningPage = lazy(() => import('src/pages/OpeningPage'));

    const isAuth: string | null = sessionStorage.getItem('accessToken');

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => (
                    <Suspense fallback={null}>
                        <OpeningPage />
                    </Suspense>
                )}
            />

            <Route
                exact
                path="/login"
                render={() =>
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
                render={() =>
                    isAuth !== null ? (
                        <DataUploadPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/animals"
                render={() =>
                    isAuth !== null ? (
                        <AnimalPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/register"
                render={() =>
                    isAuth === null ? (
                        <RegisterPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/create'}
                render={() =>
                    isAuth !== null ? (
                        <CreatePage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/update/:id'}
                render={() =>
                    isAuth !== null ? (
                        <UpdatePage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
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
                                pathname: '/',
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
