import { useEffect, useState, Fragment, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../store';
import 'src/App.css';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { TextField, Button, Fab, Box } from '@mui/material';
import Footer from '../components/common/Footer';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Ajax from 'src/tools/Ajax';
import spinner from 'src/imagetools/loading.gif';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

interface Extlink {
    id: number;
    link: string;
}

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

const UpdateAnimalContent = styled.div`
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

function UpdatePage() {

    const { id }: id = useParams();
    const getAnimal = useStoreActions((actions) => actions.animal.getUpdateAnimal);
    const animal: any = useStoreState((state) => state.animal.animalUpdate);
    const error = useStoreState((actions) => actions.animal.error);

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const [extlinks, setExtlinks] = useState(['']);
    const [formValues, setFormValues] = useState<any>(null);
    const [formErrors, setFormErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingForm, setIsCheckingForm] = useState(false);

    const updateAnimal = useStoreActions((actions) => actions.animal.updateAnimal);

    const animalRef: any = useRef({});


    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name !== 'extlinks') {
            setFormValues({ ...formValues, [name]: value });
        }
        else {

            const data = { ...formValues };
            data.extlinks[index] = value;
            console.error('data', data, index);
            setFormValues({ ...data });
            console.log('data after setState', formValues, index);
            
        }
    };

    const checkForm = (e, formFieldName) => {
        e.preventDefault();
        setIsCheckingForm(true);
        const values = validate(formValues, formFieldName);
        setFormErrors({ ...values });
        setIsCheckingForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = validate(formValues, '');
        setFormErrors({ ...values });
        setSuccessMsg(null);
        setErrorMsg(null);

        try {
            await updateAnimal({ id: animal.id, data: formValues });
            setSuccessMsg('You successfully updated this animal!');
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            console.log('errorMessage', errorMessage);
            setErrorMsg(errorMessage);
        }

   

        setIsSubmitting(true);
    };

    const validate = (values, formFieldName) => {
        let errors: any = {};
        
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

        if (!isCheckingForm || formFieldName === 'name') {
            if (!values.name) {
                errors.name = "Required";
            }
        }

        if (!isCheckingForm || formFieldName === 'latinname') {
            if (!values.latinname) {
                errors.latinname = "Required";
            } 
        }

        if (!isCheckingForm || formFieldName === 'description') {
            if (!values.description) {
                errors.description = "Required";
            }
        }

        errors.extlinks = [];

        values.extlinks.forEach((item, index) => {
            if (!item) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors.extlinks[index] = "Required";
                }
            } else if (!isValidUrl(item)) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors.extlinks[index] = "Enter correct url";
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
            .required('Required'),
        extlinks: Yup.array().of(
            Yup
                .string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    'Enter correct url!'
                )
                .required('Required')
        )
        /*Yup
            .string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
             )
            .required('Required')*/
    });

    useEffect(() => {
        async function getData() {
            try {
                await getAnimal(id);
                console.log('id', id)
                console.log('animal', animal);

                const { data }: any = await Ajax.get(`animals/${id}`);
                const extlinks: string[] = data?.extlinks?.map(item => {
                    return item.link
                });

                let tempExtlinks: string[] = [];

                animal?.extlinks.map((item: string, index: number) => {
                    tempExtlinks.push(item);
                });


                data.extlinks = [...extlinks];
                console.log('data',data);
                setFormValues({...data});

                setExtlinks([...tempExtlinks]);
             
            }
            catch (e) {
                console.error(e);
            }

        }
        getData();
    }, []);




    function addNewExtlink() {
        let tempData:any = { ...formValues };
        tempData?.extlinks?.push('');
        setFormValues({ ...tempData });

        console.log('tempData', tempData);

        setExtlinks((previousState) => [...previousState, '']);
    }

    function removeExtlink(id) {
        let tempData: any | null = { ...formValues};
        const values = tempData?.extlinks?.filter((item, index) => {
            return id !== index;
        });
        console.log('values', values)
        tempData.extlinks = [...values  ];

        extlinks.filter((item, index) => {
            const idx = extlinks.indexOf(item);
            return id !== index;
        });
        setFormValues({ ...tempData });
        setExtlinks([...extlinks]);
        console.log('tempData', tempData)
  
    }

    const history = useHistory();

    return (
        <>
            <Head title={'Update Animal'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            {successMsg && <SuccessMessage message={successMsg} />}
            <Navigation />
            <BackButton />
            <HeadingCenter>
                <h2 className={'heading'}>Update Animal</h2>
            </HeadingCenter>
  
            {
                (formValues && Object.keys(formValues).length > 0)
                ?
                <form>
                    <UpdateAnimalContent>
                        <InputField
                            error={formErrors?.name ? true : false}
                            id="filled-error-helper-text"
                            label="Name"
                            helperText={formErrors?.name
                                ? formErrors.name
                                : null}
                            variant="filled"
                            onChange={(e) => handleChange(e, null)}
                            onBlur={(e) => checkForm(e, e.target.name)}
                            type="text"
                            name="name"
                            value={formValues?.name}
                        />

                        <InputField
                            error={formErrors.latinname ? true : false}
                            id="filled-error-helper-text"
                            label="Latin name"
                            value={formValues.latinname}
                            helperText={formErrors.latinname
                                ? formErrors.latinname
                                : null}
                            variant="filled"
                            onChange={(e) => handleChange(e, null)}
                            onBlur={(e) => checkForm(e, e.target.name)}
                            type="text"
                            name="latinname"
                        />

                        <InputField
                            id="filled-multiline-static"
                            label="Description"
                            multiline
                            rows={7}
                            error={ formErrors.description? true : false}
                            variant="filled"
                            value={formValues.description}
                            helperText={formErrors.description 
                                ? formErrors.description
                                : null}
                            onChange={(e) => handleChange(e, null)}
                            onBlur={(e) => checkForm(e, e.target.name)}
                            type="text"
                            name="description"
                        />

                        {formValues.extlinks.map((extlink, index) => {
                            console.log(extlink);

                            return (<ExtlinkWrapper key={index}>
                                <InputField
                                    error={formErrors.hasOwnProperty('extlinks') ? (formErrors?.extlinks[index] ? true : false) : false}
                                    id="filled-error-helper-text"
                                    label="External image url link"
                                    value={extlink}
                                    helperText={formErrors.hasOwnProperty('extlinks') ? (formErrors?.extlinks[index]
                                        ? formErrors?.extlinks[index]
                                        : null) : null}
                                    variant="filled"
                                    onChange={(e) => handleChange(e, index)}
                                    onBlur={(e) => checkForm(e, e.target.name)}
                                    type="text"
                                    name={`extlinks`}
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

                        <Button style={{ width: '17rem', marginTop: '2rem' }} variant="contained" color="inherit" onClick={(e) => {
                            console.log('onClick');
                            handleSubmit(e);
                            
                        }}>
                            Update Animal
                        </Button>

                    </UpdateAnimalContent>
                </form>
                    : <>
                        <div className={'grid-middle'}>
                            <img src={spinner} alt={'spinner'} />
                        </div>
                      </>}
            {

            }
            <Footer />
        </>
    );
}

export default UpdatePage;