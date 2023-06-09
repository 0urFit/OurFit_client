import { useRouter } from 'next/router';
import { CB } from './style';
import { useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';

interface propsType {
    message: string;
    handleSubmit?: () => void;
}

const CreateButton = ({ message, handleSubmit }: propsType) => {
    const currentLocation = useRouter().asPath;
    const [width, setWidth] = useState<CSSProperties>({});

    useEffect(() => {
        if (currentLocation.includes('home')) {
            setWidth({ width: '19.25rem' });
        } else if (currentLocation.includes('save')) {
            setWidth({ width: '22.125rem' });
        }
    }, []);

    return (
        <CB.Button style={width} onClick={handleSubmit}>
            {message}
        </CB.Button>
    );
};

export default CreateButton;
