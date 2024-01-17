import styled from "styled-components";

export const AuthWrapper = styled.section`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.authBg};
    transition: background-color 0.5s ease, transform 0.75s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;

    ${(props) =>
        props.open === "false" &&
        `
        transform: translateY(100%);
    `};
`;

export const AuthLeft = styled.div`
    width: 50%;

    svg {
        height: 100%;
    }
`;

export const AuthRight = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export const AuthRightContainer = styled.div`
    width: 35rem;
    position: absolute;
    top: 50%;
    left: 47.5%;
    transform: translate(-50%, -50%);
    transition: transform 1s ease-in-out;

    ${(props) => {
        if (props.queue === -1) return `transform: translate(-250%, -50%)`;
        if (props.queue === 1) return `transform: translate(250%, -50%);`;
    }}
`;

export const AuthClose = styled.a`
    position: absolute;
    top: 3rem;
    right: 3rem;
    display: inline-block;
    transition: transform 0.5s ease;
    text-decoration: none;
    will-change: transform;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const AuthLink = styled.a`
    color: ${(props) => props.theme.opBg};
    font-size: 1.4rem;
    position: absolute;
    top: 3.5rem;
    right: 9rem;
    font-weight: 300;
    opacity: 0.4;
    transition: all 0.5s ease;
    text-decoration: none;

    &:after {
        content: "";
        position: absolute;
        bottom: -1rem;
        left: 0;
        width: 0;
        height: 1px;
        background-color: ${(props) => props.theme.pink};
        transition: width 0.5s ease;
    }

    &:hover {
        opacity: 1;
        color: ${(props) => props.theme.pink};

        &:after {
            width: 100%;
        }
    }
`;

export const AuthSecondaryHeading = styled.h2`
    font-size: 1.8rem;
    font-weight: 300;
    opacity: 0.3;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const AuthPrimaryHeading = styled.h1`
    font-size: 3.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.opBg};
    margin-bottom: 3rem;
    transition: color 0.5s ease;
`;

export const AuthForm = styled.form`
    position: relative;
    width: 100%;
`;

export const AuthInputGroup = styled.div`
    width: 100%;
    position: relative;

    &:not(:last-child) {
        margin-bottom: 4rem;
    }

    ${(props) =>
        props.smallGroup === "true" &&
        `
        &:not(:last-child) {
            margin-bottom: 2.5rem;
        }
    `}

    ${(props) =>
        props.halfGroup === "true" &&
        `
        display: flex;
        justify-content: space-between;

        input {
            width: 47.5%;
            padding-left: 2.5rem;
        }
    `}

    svg {
        position: absolute;
        top: 50%;
        left: 3rem;
        transform: translateY(-50%);

        path {
            transition: fill 0.5s ease;
        }
    }

    input:focus + svg {
        path {
            fill: ${(props) => props.theme.opBg};
        }
    }
`;

export const AuthInput = styled.input`
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.authInput};
    padding: 2.6rem 3rem 2.6rem 6.5rem;
    width: 100%;
    border-radius: 1.5rem;
    font-size: 1.4rem;
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.authInputText};
    font-weight: 300;
    transition: all 0.5s ease;
    position: relative;

    ${(props) =>
        props.noIcon === "true" &&
        `
        padding-left: 3rem;
    `}

    ${(props) =>
        props.smallInput === "true" &&
        `
        padding-top: 2rem;
        padding-bottom: 2rem;
    `}

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

export const AuthForgotPw = styled.a`
    position: absolute;
    right: 0;
    bottom: 6.5rem;
    color: ${(props) => props.theme.authForgotPw};
    font-size: 1.2rem;
    font-weight: 300;
    transition: color 0.5s ease;

    &:hover {
        color: ${(props) => props.theme.pink};
    }
`;

export const AuthButton = styled.a`
    padding: 1.5rem 3rem;
    text-decoration: none;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    border-radius: 0.75rem;
    background-color: ${(props) => props.theme[props.color]};
    display: inline-block;
    margin-top: 0.75rem;
    transition: transform 0.5s ease;

    &:hover {
        transform: translateY(-5px);
    }

    svg {
        margin-left: 7.5px;
        transform: translateY(2px);
    }
`;

export const AuthRoleSelector = styled.div`
    width: 100%;
    margin: 2rem 0 3rem;
`;

export const AuthRole = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    font-family: "Poppins", sans-serif;
    color: rgba(96, 91, 110, 0.5);
    background-color: ${(props) => props.theme.authInput};
    padding: 1.75rem 2rem;
    border-radius: 1.25rem;
    cursor: pointer;
    transition: all 0.5s ease;

    &:not(:last-child) {
        margin-right: 2rem;
    }

    ${(props) =>
        props.activeRole === "true" &&
        `
        color: white;
        background-color: ${props.theme.orange};
    `};
`;
