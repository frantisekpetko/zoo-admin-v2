import React, { FC } from 'react';

const AnimalContent: FC<{ children: React.ReactNode }> = (props) => {
    return <div className={'grid-middle limited-width'}>{props.children}</div>;
};

export default AnimalContent;
