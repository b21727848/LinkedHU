import styled from "styled-components";

export const InputWrapper = styled.div`
    padding: 5rem;
`;

export const LabelInput = styled.div`
    &:not(:last-child) {
        margin-bottom: 2rem;
    }
`;

export const InputGroup = styled.div`
    display: none;

    ${(props) =>
        props.editActive === "true" &&
        `
        display: block;
    `}
`;

export const InputTitle = styled.h1`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 3rem;
    color: ${(props) => props.theme.opBg};
`;

export const Textarea = styled.textarea`
    width: 100%;
    margin: 1rem 0;
    outline: none;
    border: none;
    background-color: ${(props) =>
        props.theme.name === "dark"
            ? props.theme.authBg
            : props.theme.authInput};
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
        props.differentColor === "true" &&
        `
        background-color: ${props.theme.componentBg};
    `};

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

export const Button = styled.button`
    display: inline-block;
    padding: 1.4rem 2.75rem;
    color: white;
    font-family: "Poppins", sans-serif;
    background-color: ${(props) => props.theme.blue};
    font-size: 1.4rem;
    border: none;
    outline: none;
    border-radius: 1rem;
    margin: 2rem 0 0;
    transition: transform 0.5s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const EditButton = styled.button`
    display: inline-block;
    color: ${(props) => props.theme.opBgFaded};
    font-family: "Poppins", sans-serif;
    background-color: transparent;
    font-size: 1.3rem;
    text-decoration: underline;
    border: none;
    outline: none;
    border-radius: 1rem;
    margin: 2rem 0 0;
    transition: color 0.5s ease;
    cursor: pointer;
    position: absolute;
    top: -9rem;
    right: 0;

    &:hover {
        color: ${(props) => props.theme.blue};
    }
`;

export const Input = styled.input`
    width: 100%;
    margin: 1.5rem 0 2rem;
    outline: none;
    border: none;
    background-color: ${(props) =>
        props.theme.name === "dark"
            ? props.theme.authBg
            : props.theme.authInput};
    padding: 2rem 3rem;
    width: 100%;
    border-radius: 1.5rem;
    font-size: 1.3rem;
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.authInputText};
    font-weight: 300;
    transition: all 0.5s ease;

    ${(props) =>
        props.differentColor === "true" &&
        `
        background-color: ${props.theme.componentBg};
    `};

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

export const Label = styled.h1`
    font-size: 1.3rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBgFaded};
    transition: all 0.5s ease;
`;

export const UploadableWrapper = styled.div`
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        & > div {
            opacity: 1;
        }
    }
`;

export const UploadableBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    overflow: hidden;

    input {
        width: 100%;
        height: 100%;
    }
`;

export const MiddleHeading = styled.h1`
    width: 100%;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    white-space: pre-wrap;
`;

export const Paragraph = styled.p`
    width: 100%;
    font-size: 1.3rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.5;
    white-space: pre-wrap;
`;

export const Divider = styled.hr`
    width: 100%;
    margin: 2rem 0;
    opacity: 0.075;
    border: 0.5px solid ${(props) => props.theme.opBg};
    transition: border-color 0.5s ease;
`;
