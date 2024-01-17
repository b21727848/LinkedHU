import styled from "styled-components";

export const PostWrapper = styled.div`
    background-color: ${(props) => props.theme.componentBg};
    border-radius: 1.5rem;
    padding: 3rem 3.5rem;
    transition: background-color 0.5s ease;

    &:not(:last-child) {
        margin-bottom: 5rem;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 4.5rem;
        height: 4.5rem;
        object-fit: cover;
        margin-right: 1.75rem;
    }
`;

export const PostInput = styled.button`
    background-color: ${(props) => props.theme.postBg};
    width: 12rem;
    padding: 1.5rem 3rem;
    color: ${(props) => props.theme.opBgFaded};
    border-radius: 7px;
    border: none;
    outline: none;
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif;
    transition: all 0.5s ease;
    cursor: pointer;
`;

export const PostOptions = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2rem;
`;

export const PostOption = styled.button`
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.postBg};
    width: 12rem;
    padding: 7.5px 0;
    text-align: center;
    color: ${(props) => props.theme.opBgFaded};
    font-size: 1.1rem;
    border-radius: 7px;
    transition: all 0.5s ease;
    font-family: "Poppins", sans-serif;
    cursor: pointer;

    ${(props) =>
        props.activeItem === "true" &&
        `
        background-color: ${props.theme.blue};
        color: white;
    `};

    &:not(:last-child) {
        margin-right: 1rem;
    }
`;
