import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Grid, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from 'src/components/common/Content';
import Footer from 'src/components/common/Footer';
import Navigation from 'src/components/common/Navigation';
import ErrorMessage from 'src/components/ToastErrorMessage';
import Head from 'src/components/Head';
import ToastErrorMessage from 'src/components/ToastErrorMessage';
import { useStoreActions, useStoreState } from 'src/store';
import styled from 'styled-components';
import Ajax from 'src/tools/Ajax';


const Heading = styled.h1`
    margin-top: 0;
    color: black;
    text-align: center;
`;

export const FormContainer = styled.div`
    max-width: 450px;
    padding: 1em;
    border-radius: 5px;

`;

const FormField = styled(TextField)`
    width: 100%;
`;


const ErrorList = styled.ul`

    padding-left: 0.5em;
    margin: 0.5em;
    
`;

type constraint = string[] | { response: { message: string } } | { response: { message: string[] } };

const renderMessageArray = (errors: any) => {
    console.log('errors', errors);
    let constraints: any = null;
    if (Array.isArray(errors)) {
        constraints = errors.map((constraint, idx) => <li key={idx}>{constraint}</li>);
        //commands.log('Array.isArray(errors)')
    }
    if (errors.hasOwnProperty('response') && errors.response.hasOwnProperty('message') && typeof errors.response.message == 'string') {
        constraints = <li>{errors.message}</li>;
        //commands.log('errors.hasOwnProperty(\'response\') && errors.response.hasOwnProperty(\'message\') && typeof errors.response.message == \'string\'')
    }

    if (errors.hasOwnProperty('response') && errors.response.hasOwnProperty('message') && Array.isArray(errors.response.message)) {
        constraints = errors.response.message.map((constraint: string, idx: number) => <li key={idx}>{constraint}</li>);
        //commands.log('errors.hasOwnProperty(\'response\') && errors.response.hasOwnProperty(\'message\') && Array.isArray(errors.response.message)')
    }

    return constraints;
};

const LoginPage: FC = (props: any) => {
    const signIn = useStoreActions((actions) => actions.user.signIn);

    const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const save = useStoreActions((actions) => actions.user.saveTokenToStorage);
    const setUserUsername = useStoreActions((actions) => actions.user.setUsername);
    //const loading = useStoreState((state) => state.trait.loading);

    const token = useStoreState((state) => state.user.accessToken);

    let controller = useRef<AbortController | null>(null);

    const navigate = useHistory();

    useEffect(() => {
        //document.body.style.backgroundColor = '#b8860b';
        //document.body.style.backgroundColor = '#FAFAD2';
        //setLoading(true);

        return () => {
            document.body.style.backgroundColor = '';
            controller.current?.abort();
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');





    const submit = async () => {


        
        try {
            let data = await signIn({ username, password });

            save(data.data?.data?.accessToken);
            setUserUsername(data.data?.data?.username);
            load();

        }
        catch(error: any) {
                toast.dismiss();
                console.log('errorMessage', error);
                const message = error.response.data.message;
                toast.error((
                    <ToastErrorMessage message={message} />
                ), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    icon: false

                });
        }
        finally {
            if (sessionStorage.getItem('accessToken') !== null) {
                navigate.replace('/');
            }
        }
    };

    function goToRegister() {
        navigate.push('/register');
    }

    const ENTER_KEY = 13;


    const onEnterHandler = useCallback((event) => {
        const isEnterPressed = event.which === ENTER_KEY
            || event.keyCode === ENTER_KEY;

        if (isEnterPressed) {
            submit();
        }

    }, [submit]);

    return (
        <>
            <Head title={'Login Page'} />

            <Navigation />
            <Content>
                <FormContainer>
                    <Heading>User Login</Heading>
                    <FormField
                        label="Username"
                        margin="dense"
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                            'aria-label': 'theme'
                        }}
                        onKeyUp={onEnterHandler}
                    />
                    <FormField
                        label="Password"
                        margin="dense"
                        variant="filled"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                            'aria-label': 'theme'
                        }}
                        onKeyUp={onEnterHandler}
                    />
                    <Button color="inherit" fullWidth onClick={submit}>
                        Login in
                    </Button>

                    <Button color="primary" fullWidth onClick={goToRegister} sx={{ mt: 2 }}>
                        Don't have an account? Sign up now!
                    </Button>
                </FormContainer>
            </Content>
            <Footer />
        </>
    );
};

export default LoginPage;
