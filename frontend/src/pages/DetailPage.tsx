import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../store';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import AnimalContent from '../components/AnimalContent';
import Head from "../components/Head";
import BackButton from '../components/BackButton';

const Image = styled.img`
    width: 20rem;
    height: 15rem;
`;

const Extlink = styled.a`
    text-decoration: underline;
    color: blue;
    font-size: 1rem;
`;

interface id {
    id?: string | undefined;
}

export default function DetailPage() {

    const { id }: id = useParams();
    const getAnimal = useStoreActions((actions) => actions.animal.getAnimal);
    const animal = useStoreState((state) => state.animal.animal);

    useEffect(() => {
        (async () => {
            await getAnimal(id);
            console.log('animal', animal)
        })();
    }, []);

    return (
        <div>
            <Navigation />
            <Head title={'Animals detail'} />
            <BackButton/>
            <AnimalContent>
                <h3>{animal?.name}</h3>
                <i>{animal?.latinname}</i>
                <p className={'proper-width'}>{animal?.description}</p>
                <Image src={animal?.images[0]?.urlName !== ''
                    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${animal?.images[0]?.urlName}`
                    : 'https://static.thenounproject.com/png/13643-200.png'} />
                <div className={'flex'} style={{ marginTop: '2rem', flexFlow: 'column wrap', display: 'flex', justifyContent: 'center' }}>
                    <div>Odkazy:</div>
                    {animal?.extlinks?.map((e, id) => {
                        const link = `${e.link.slice(0, 35)}...`;
                        return (
                            <div className={'page-break'} style={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem', marginTop: '0.5rem' }} key={id}>
                                <p>
                                    <Extlink href={e.link} target={'_blank'} style={{ width: '100%' }}>
                                        {link}
                                    </Extlink>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </AnimalContent>
            <Footer />
        </div>
    );
}
