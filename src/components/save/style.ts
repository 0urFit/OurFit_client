import styled from 'styled-components';

const SV = {
    Box: styled.div`
        position: relative;
        width: 100%;
        height: 100%;
    `,
    SelectWrapper: styled.div`
        width: fit-content;
        margin-left: auto;
    `,
    CardList: styled.div`
        margin-top: 1.25rem;
        width: inherit;
        height: calc(100% - 8.125rem);
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    `,
    ButtonWrapper: styled.div`
        position: absolute;
        bottom: 0;
        width: fit-content;
        height: fit-content;
    `,
};

export { SV };