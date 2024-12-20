import { FunctionComponent, useRef, useState, MutableRefObject, useEffect } from 'react';
import styled from 'styled-components';

const FileInput = styled.input`
    display: none;
`;

const ImageUploadContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-bottom: 2em;
`;

const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
    border: solid 1px black;
    vertical-align: middle;
    position: relative;
`;

const ImageUpload = styled.img`
    width: 100%;
    height: 100%;
`;

const Label = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 18px;
    width: 100%;
    font-weight: 800;
`;

interface Props {
    setSelectedFile: (image: File) => void;
    image?: string | undefined;
    isFilePicked: boolean;
    setIsFilePicked: (boolean) => void;
}

const UploadImage: FunctionComponent<Props> = (props) => {
    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }

    useEffect(() => {
        (async () => {
            console.log('useEffectFile');
            if (props.image !== '' && props.image !== undefined) {
                props.setSelectedFile(
                    await dataUrlToFile(
                        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${props.image}`,
                        props.image
                    )
                );
                props.setIsFilePicked(true);
                setBase64String(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${props.image}`);
            }
        })();
    }, []);

    const [base64String, setBase64String] = useState<string>('data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

    const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
    const changeHandler = (event) => {
        console.log('changeHandlerFile: ' + event.target.files[0]);
        setBase64String(URL.createObjectURL(event.target.files[0]));
        props.setSelectedFile(event.target.files[0]);
        props.setIsFilePicked(true);
    };

    return (
        <>
            <ImageUploadContainer>
                <ImageContainer
                    onClick={() => {
                        fileRef.current.click();
                    }}
                >
                    <ImageUpload src={base64String.toString()} />
                    <Label>{props.isFilePicked ? 'Reupload Image' : 'Upload Image'}</Label>
                    <FileInput ref={fileRef} type="file" name="file" onChange={changeHandler} accept="image/*" />
                </ImageContainer>
            </ImageUploadContainer>
        </>
    );
};

export default UploadImage;
