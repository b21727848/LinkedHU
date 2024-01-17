import styled from "styled-components";

export const PopupWrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;

    ${(props) =>
        props.openPopup !== "true" &&
        `
        display: none;
    `};
`;

export const PopupBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.2;
`;

export const PopupContainer = styled.div`
    width: 45rem;
    max-height: 50rem;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.componentBg};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2rem;
    transition: all 0.5s ease;
`;

export const PopupClose = styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    transition: transform 0.5s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;
