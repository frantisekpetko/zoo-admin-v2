import { useEffect, useState, Fragment, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../store';
import 'src/App.css';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { Grid, TextField, Button, Fab, Box } from '@mui/material';
import Footer from '../components/common/Footer';
import AnimalContent from '../components/AnimalContent';
import { useFormik, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

interface Extlink {
    id: number;
    link: string;
}

//    extlinks?: Array<String> | null;


interface AnimalDetailUpdate {
    name?: string;
    latinname?: string;
    description?: string;
    extlinks?: {
        id: number;
        link: string
    }[];
    images?: Image[];
    createdAt?: string;
    updatedAt?: string;
}

interface Image {
    id?: number;
    urlname?: string;
}




const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

const InputField = styled(TextField)`
    margin-bottom: 1rem !important;
    width: 17rem;
`;

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

const HeadingCenter = styled.div`
    text-align: center;
`;


const ExtlinkWrapper = styled.div`
    display: flex;
    direction: row;
    width: 150%;
    align-items: center;
    justify-content: center;
    height: 100%;


`;

const UpdateAnimalContent = styled.form`
  align-content: center;
  display: flex;
  justify-content: center;
  flex-direction:column;
  flex-flow: column;
  align-items: center;
  /*background-color: #F0FFF0;*/
  width: 100%;
  margin: 0 auto;
  background-color: white;
  text-align: center;
  padding-bottom: 5rem;

  margin-top: 2rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 5rem;
  padding-right: 5rem;
`;

function CreatePage() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const saveAnimal = useStoreActions((actions) => actions.animal.saveAnimal);

    const [extlinks, setExtlinks] = useState(['']);
    const [isCheckingForm, setIsCheckingForm] = useState(false);
    const [extlinksErrors, setExlinksErrors] = useState<string []>(['']);

    const animalRef: any = useRef({
        name: '',
        latinname: '',
        description: '',
    });

    const handleChange = (e, index) => {
        const { value } = e.target;

        const data = [ ...extlinks ];
        data[index] = value;
        console.error('data', data, index);
        setExtlinks([ ...data ]);
        console.log('data after setState', extlinks, index);
    };

    const checkForm = (e) => {
        e.preventDefault();
        setIsCheckingForm(true);
        const values = validate(e.target.name);
        setExlinksErrors([ ...values ]);
        setIsCheckingForm(false);
    };

    const validate = (formFieldName) => {
        let errors: string[] = [];

        const isValidUrl = (u) => {
            let elm;
            if (!elm) {
                elm = document.createElement('input');
                elm.setAttribute('type', 'url');
            }
            elm.value = u;
            console.error(u, elm.validity.valid);
            return elm.validity.valid;
        };


        extlinks.forEach((item, index) => {
            if (!item) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors[index] = "Required";
                }
            } else if (!isValidUrl(item)) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors[index] = "Enter correct url";
                }

            }
        });

        console.error('errors', errors);
        return errors;
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        latinname: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required')
    });

    function addNewExtlink() {
        const tempExtlinks = [...extlinks];
        tempExtlinks.push('');     
        setExtlinks([...tempExtlinks]);
    }

    function removeExtlink(id) {
        const filteredItems = extlinks.filter((item, index) => {
            const idx = extlinks.indexOf(item);
            return id !== index;
        })

        setExtlinks(filteredItems);
        animalRef.current.extlinks = [...filteredItems];
    }

    return (
        <>
            <Head title={'Create Animal'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            {successMsg && <SuccessMessage message={successMsg} />}
            <Navigation />
            <BackButton />
            <HeadingCenter>
                <h2 className={'heading'}>Create Animal</h2>
            {console.log('animalRef', animalRef.current)}
            </HeadingCenter>
            <Formik initialValues={animalRef.current}
                onSubmit={() => { }}
                validationSchema={validationSchema}
                >
                    {formik => (
                    <UpdateAnimalContent onSubmit={formik.handleSubmit}>
                            <InputField
                                error={formik.touched?.name && formik.errors?.name ? true : false}
                                id="filled-error-helper-text"
                                label="Name"
                                value={formik.values?.name}
                                helperText={formik.touched.name && formik.errors?.name
                                    ? formik.errors.name
                                    : null}
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="name"
                            />

                            <InputField
                                error={formik.touched.latinname && formik.errors.latinname ? true : false}
                                id="filled-error-helper-text"
                                label="Latin name"
                                value={formik.values.latinname}
                                helperText={formik.touched.latinname && formik.errors.latinname
                                    ? formik.errors.latinname
                                    : null}
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="latinname"
                            />

                            <InputField
                                id="filled-multiline-static"
                                label="Description"
                                multiline
                                rows={5}
                                error={formik.touched.description && formik.errors.description ? true : false}
                                variant="filled"
                                value={formik.values.description}
                                helperText={formik.touched.description && formik.errors.description
                                    ? formik.errors.description
                                    : null}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="description"
                            />
                            {console.log('extlinks', extlinks)}
                            {extlinks?.map((extlink, index) => {
                                return (<ExtlinkWrapper key={index}>
                                    <InputField
                                        error={true ? (extlinksErrors[index] ? true : false) : false}
                                        id="filled-error-helper-text"
                                        label="External image url link"
                                        value={extlink}
                                        helperText={true ? (extlinksErrors[index]
                                            ? extlinksErrors[index]
                                            : null) : null}
                                        variant="filled"
                                        onChange={(e) => handleChange(e, index)}
                                        onBlur={(e) => checkForm(e)}
                                        type="text"
                                        name={`extlinks[${index}]`}
                                        style={{ marginRight: '2rem', width: '20rem' }}
                                    />

                                    <Fab
                                        aria-label="add"
                                        onClick={() => removeExtlink(index)}
                                        style={{ marginBottom: '1rem', minWidth: '3rem' }}
                                        color="secondary"
                                    >
                                        <RemoveIcon />
                                    </Fab>
                                </ExtlinkWrapper>)
                            }
                            )}

                            <Fab aria-label="remove" onClick={addNewExtlink} color="secondary">
                                <AddIcon />
                            </Fab>

                        <Button style={{ width: '17rem', marginTop: '2rem' }} variant="contained" color="inherit" type="submit" onClick={async () => {
                            const values = validate('extlinks');
                            setExlinksErrors([...values]);
                            setSuccessMsg(null);
                            setErrorMsg(null);

                            try {
                                await saveAnimal({ ...formik.values, extlinks });
                                setSuccessMsg('You successfully created new animal!');
                            } catch (error: any) {
                                const errorMessage = error.response.data.message;
                                console.log('errorMessage', errorMessage);
                                setErrorMsg(errorMessage);
                            }
                        }}>
                                Create Animal
                            </Button>

                    </UpdateAnimalContent>
                    )}
                </Formik>
            <Footer />
        </>
    );
}

export default CreatePage;