import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Head from 'src/components/Head';
import Navigation from '../components/common/Navigation';
import Content from 'src/components/common/Content';
import Footer from 'src/components/common/Footer';
import BackButton from 'src/components/BackButton';
import Spinner from 'src/components/Spinner';
import UploadImage from 'src/components/UploadImage';
import ToastErrorMessage from 'src/components/ToastErrorMessage';
import { Heading } from 'src/components/Heading';
import { SubmitButton } from 'src/components/SubmitButton';
import { ExtlinkTextField } from 'src/components/ExtlinkInputField';
import { ExtlinkRemoveButton } from 'src/components/ExtlinkRemoveButton';

import { useStoreActions, useStoreState } from 'src/store';
import Ajax from 'src/tools/Ajax';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import { isValidUrl } from 'src/tools/utils';

interface AnimalDetailUpdate {
    data: {
        id: number;
        name?: string;
        latinname?: string;
        description?: string;
        extlinks: Extlink[] | string[];
        images: Image[];
        createdAt?: string;
        updatedAt?: string;
    };
}

interface Extlink {
    id: number | null;
    link: string;
}

interface Image {
    id?: number;
    urlName?: string;
}

const InputField = styled(TextField)`
    margin-bottom: 1rem !important;
    width: 17rem;
`;

const Image = styled.img`
    width: 20rem;
    height: 15rem;
`;

interface Id {
    id?: string | undefined;
}

const HeadingCenter = styled.div`
    text-align: center;
`;

const ExtlinkWrapper = styled.div`
    display: flex;
    direction: row;
    max-width: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

function UpdatePage() {
    const { id }: Id = useParams();
    const getAnimal = useStoreActions((actions) => actions.animal.getUpdateAnimal);
    const animal: any = useStoreState((state) => state.animal.animalUpdate);

    const [extlinks, setExtlinks] = useState<Extlink[]>([{ id: null, link: '' }]);
    const [formValues, setFormValues] = useState<any>(null);
    const [formErrors, setFormErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingForm, setIsCheckingForm] = useState(false);

    const [selectedFile, setSelectedFile] = useState<any>(null);

    const updateAnimal = useStoreActions((actions) => actions.animal.updateAnimal);

    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                await getAnimal(id);

                const { data }: AnimalDetailUpdate = await Ajax.get(`animals/${id}`);

                const tempExtlinks: Extlink[] = [];

                data.extlinks.forEach((item: Extlink) => {
                    //console.log({item})
                    tempExtlinks.push({ id: item.id, link: item.link });
                });

                data.extlinks = [...tempExtlinks];

                setFormValues({ ...data, image: data?.images[0]?.urlName });

                setExtlinks([...data.extlinks]);
            } catch (e) {}
        }
        getData();
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name !== 'extlinks') {
            setFormValues({ ...formValues, [name]: value });
        } else {
            const data = { ...formValues };
            data.extlinks[index] = {
                id: data.extlinks[index].id,
                link: value,
            };
            setFormValues({ ...data });
        }
    };

    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const listener = () => {
            return setWidth(window.innerWidth);
        };

        listener();

        window.addEventListener('resize', listener);

        return function cleanup() {
            window.removeEventListener('resize', listener);
        };
    }, []);

    const checkForm = (e, formFieldName) => {
        e.preventDefault();
        setIsCheckingForm(true);
        const values = validate(formValues, formFieldName);
        setFormErrors({ ...values });
        setIsCheckingForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const values = validate(formValues, '');
        setFormErrors({ ...values });

        if (!(values.length > 0)) {
            try {
                let data: any = '';

                if (selectedFile !== null && isFilePicked) {
                    const formData = new FormData();
                    formData.append('image', selectedFile);
                    formData.append('fileName', selectedFile.name);
                    data = await Ajax.post('animals/file', formData);
                }
                await updateAnimal({ id: animal.id, data: { ...formValues, image: data?.data?.image } });

                toast.success('You have successfully updated this animal!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    icon: false,
                    style: width < 480 ? { width: '97%' } : undefined,
                });
            } catch (error: any) {
                const message = error.response.data.message;

                toast.error(<ToastErrorMessage message={message} />, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    icon: false,
                    style: width < 480 ? { width: '97%' } : undefined,
                });
            }
        }
        setIsSubmitting(false);
    };

    const validate = (values, formFieldName) => {
        let errors: any = {};

        if (!isCheckingForm || formFieldName === 'name') {
            if (!values.name) {
                errors.name = 'Required';
            }
        }

        if (!isCheckingForm || formFieldName === 'latinname') {
            if (!values.latinname) {
                errors.latinname = 'Required';
            }
        }

        if (!isCheckingForm || formFieldName === 'description') {
            if (!values.description) {
                errors.description = 'Required';
            }
        }

        errors.extlinks = [];

        values.extlinks.forEach((item, index) => {
            if (!item.link) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors.extlinks[index] = 'Required';
                }
            } else if (!isValidUrl(item.link)) {
                if (!isCheckingForm || formFieldName === 'extlinks') {
                    errors.extlinks[index] = 'Enter correct url';
                }
            }
        });

        return errors;
    };

    function addNewExtlink() {
        let tempData: any = { ...formValues };
        tempData?.extlinks?.push({ id: null, link: '' });
        setFormValues({ ...tempData });
        setExtlinks((previousState) => [...previousState, { id: null, link: '' }]);
    }

    function removeExtlink(id) {
        let tempData: any | null = { ...formValues };
        const values = tempData?.extlinks?.filter((item, index) => {
            return id !== index;
        });

        tempData.extlinks = [...values];

        extlinks.filter((item, index) => {
            const idx = extlinks.indexOf(item);
            return id !== index;
        });
        setFormValues({ ...tempData });
        setExtlinks([...extlinks]);
    }

    return (
        <>
            <Head title={'Update Animal'} />
            <Navigation />

            {formValues && Object.keys(formValues).length > 0 ? (
                <>
                    <BackButton />
                    <form>
                        <Content>
                            <HeadingCenter>
                                <Heading>Update Animal</Heading>
                            </HeadingCenter>
                            <UploadImage
                                setSelectedFile={setSelectedFile}
                                image={formValues.image}
                                isFilePicked={isFilePicked}
                                setIsFilePicked={setIsFilePicked}
                            />
                            <InputField
                                error={formErrors?.name ? true : false}
                                id="name"
                                label="Name"
                                helperText={formErrors?.name ? formErrors.name : null}
                                variant="filled"
                                onChange={(e) => handleChange(e, null)}
                                onBlur={(e) => checkForm(e, e.target.name)}
                                type="text"
                                name="name"
                                value={formValues?.name}
                            />
                            <InputField
                                error={formErrors.latinname ? true : false}
                                id="latinname"
                                label="Latin name"
                                value={formValues.latinname}
                                helperText={formErrors.latinname ? formErrors.latinname : null}
                                variant="filled"
                                onChange={(e) => handleChange(e, null)}
                                onBlur={(e) => checkForm(e, e.target.name)}
                                type="text"
                                name="latinname"
                            />
                            <InputField
                                id="description"
                                label="Description"
                                multiline
                                rows={7}
                                error={formErrors.description ? true : false}
                                variant="filled"
                                value={formValues.description}
                                helperText={formErrors.description ? formErrors.description : null}
                                onChange={(e) => handleChange(e, null)}
                                onBlur={(e) => checkForm(e, e.target.name)}
                                type="text"
                                name="description"
                            />
                            {formValues.extlinks.map((extlink, index) => {
                                return (
                                    <ExtlinkWrapper key={index}>
                                        <ExtlinkTextField
                                            error={formErrors.hasOwnProperty('extlinks') ? (formErrors?.extlinks[index] ? true : false) : false}
                                            id="external-url-link"
                                            label="External url link"
                                            value={extlink.link}
                                            helperText={
                                                formErrors.hasOwnProperty('extlinks')
                                                    ? formErrors?.extlinks[index]
                                                        ? formErrors?.extlinks[index]
                                                        : null
                                                    : null
                                            }
                                            variant="filled"
                                            onChange={(e) => handleChange(e, index)}
                                            onBlur={(e) => checkForm(e, e.target.name)}
                                            type="text"
                                            name={`extlinks`}
                                        />

                                        <ExtlinkRemoveButton aria-label="add" onClick={() => removeExtlink(index)} color="secondary">
                                            <RemoveIcon />
                                        </ExtlinkRemoveButton>
                                    </ExtlinkWrapper>
                                );
                            })}

                            <Fab aria-label="remove" onClick={addNewExtlink} color="secondary">
                                <AddIcon />
                            </Fab>

                            <SubmitButton variant="contained" color="inherit" onClick={(e) => handleSubmit(e)} disabled={isSubmitting}>
                                Update Animal
                            </SubmitButton>
                        </Content>
                    </form>
                    <Footer />
                </>
            ) : (
                <Content>
                    <Spinner />
                </Content>
            )}
        </>
    );
}

export default UpdatePage;
