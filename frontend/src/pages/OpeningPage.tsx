import React, { useEffect, FC } from 'react';
import 'src/App.css';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';
import axios from 'axios';

const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

function OpeningPage() {
    useEffect(() => {
        async function getData() {
            console.log('start');
            const res = await axios.get('https://zoo-admin-v2.herokuapp.com/api/animals?search=a');
            console.log(res);
            console.log('end');
        }

        getData();
    });

    return (
        <Container>
            <Head title={'Zoo Admin'} />
            <Navigation />
            <>
                <Content>
                    <h2 className={'heading'}>Basic zoo admin app</h2>
                </Content>
            </>
            <Footer />
        </Container>
    );
}

export default OpeningPage;
