import React from 'react';
import styled from 'styled-components';

const ThreeDots = () => (
    <DotHolder>
        <Dot />
        <Dot />
        <Dot />
    </DotHolder>
);

export default ThreeDots;


const DotHolder = styled.div`
    width: 24px;
    display: flex;
    justify-content: space-between;
    margin: 0 8px;
`;

const Dot = styled.div`
    height: 4px;
    width: 4px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.secondary.blue};
`;
