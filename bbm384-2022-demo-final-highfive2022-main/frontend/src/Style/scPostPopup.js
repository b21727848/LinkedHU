import styled from "styled-components";

export const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: ${(props) => props.theme.bg};
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.75s ease-in-out;
    will-change: transform;
    overflow-y: scroll;

    ${(props) =>
        props.isActive === "false" &&
        `
        transform: translateX(-100%);
    `};
`;

export const PopupContainer = styled.div`
    background-color: ${(props) => props.theme.bg};
    width: 60rem;
    padding: 4rem;
    border-radius: 1.5rem;
    position: relative;
`;

export const PopupHeading = styled.div`
    font-size: 2.4rem;
    font-weight: 500;
    color: ${(props) => props.theme.opBg};
    margin-bottom: 2rem;
`;

export const PopupClose = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
    transition: transform 0.5s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const PopupTextArea = styled.textarea`
    width: 100%;
    margin: 1rem 0;
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.componentBg};
    padding: 2rem 3rem;
    width: 100%;
    border-radius: 1.5rem;
    font-size: 1.3rem;
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.authInputText};
    font-weight: 300;
    transition: all 0.5s ease;
    resize: none;

    ${(props) =>
        props.error === "true" &&
        `
        border: 1px solid ${props.theme.orange};
    `}

    &::placeholder {
        color: #605b6e;
        opacity: 0.5;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
    }
`;

export const PopupInput = styled.input`
    width: 100%;
    margin: 1.5rem 0 2rem;
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.componentBg};
    padding: 2rem 3rem;
    width: 100%;
    border-radius: 1.5rem;
    font-size: 1.3rem;
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.authInputText};
    font-weight: 300;
    transition: all 0.5s ease;

    ${(props) =>
        props.error === "true" &&
        `
        border: 1px solid ${props.theme.orange};
    `}

    &::placeholder {
        color: #605b6e;
        opacity: 0.5;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
    }
`;

export const PopupButton = styled.button`
    padding: 1.25rem 3rem;
    text-decoration: none;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    border-radius: 0.75rem;
    background-color: ${(props) => props.theme.blue};
    display: inline-block;
    margin-top: 0.75rem;
    transition: all 0.5s ease;
    outline: none;
    border: none;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    margin-top: 2rem;

    ${(props) =>
        props.noColor === "true" &&
        `
        background-color: transparent;
        color: ${props.theme.opBg};

        &:hover {
            transform: none !important;
            color: ${props.theme.purple};
        }
    `};

    &:hover {
        transform: translateY(-5px);
    }
`;

export const MapContainer = styled.div`
    border-radius: 2rem;
    overflow: hidden;
    max-height: 30rem;
    margin-bottom: 2rem;

    iframe {
        width: 100%;
    }
`;
