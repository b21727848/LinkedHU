import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 30rem);
    margin: 0 auto;
    padding: 3rem 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    background-color: ${(props) => props.theme.bg};
    transition: background-color 0.5s ease;

    img {
        width: 4.5rem;
        height: 4.5rem;
        cursor: pointer;
    }
`;

export const NavbarLeft = styled.div`
    display: flex;
    align-items: center;
`;

export const NavbarLogo = styled.div`
    font-size: 1.7rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;

    svg {
        margin-right: 1.5rem;
    }
`;

export const NavbarSearch = styled.div`
    position: relative;
    margin-left: 2rem;

    svg {
        top: 50%;
        left: 2rem;
        transform: translateY(-50%);
        position: absolute;
        opacity: 0.75;
    }
`;

export const NavbarSearchInput = styled.input`
    outline: none;
    border: none;
    border-radius: 1rem;
    font-size: 1.2rem;
    font-weight: 300;
    width: 26rem;
    padding: 1.5rem 3rem 1.5rem 4.5rem;
    font-family: "Poppins", sans-serif;
    background-color: ${(props) => props.theme.inputFirst};
    color: ${(props) => props.theme.opBg};
    transition: background-color 0.5s ease;

    ${(props) =>
        props.differentColor === "true" &&
        `
        background-color: ${props.theme.bg};
    `};

    &::placeholder {
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        color: ${(props) => props.theme.opBg};
        opacity: 0.5;
        transition: color 0.5s ease;
    }
`;

export const NavbarMenu = styled.div`
    display: flex;
    align-items: center;

    svg {
        cursor: pointer;
        margin-right: 2.5rem;
    }
`;

export const NavbarLink = styled(Link)`
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 300;
    color: ${(props) => props.theme.opBg};
    opacity: 0.5;
    position: relative;
    transition: all 0.5s ease;
    ${(props) =>
        props.activeLink === "true" &&
        `
        opacity: 1;

        &:after {
            opacity: 1 !important;
        }
    `};

    &:after {
        content: "";
        position: absolute;
        bottom: -1rem;
        left: 50%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: ${(props) => props.theme.opBg};
        opacity: 0;
        transition: background-color 0.5s ease;
    }

    &:hover {
        opacity: 1;
    }

    &:not(:last-child) {
        margin-right: 2.5rem;
    }
`;

export const NavbarProfile = styled.div`
    position: relative;
`;

export const Dropdown = styled.div`
    position: absolute;
    bottom: -29rem;
    left: -7rem;
    width: 22rem;
    border-radius: 1.25rem;
    background-color: ${(props) => props.theme.componentBg};
    transition: all 0.3s ease;
    box-shadow: 5px 5px 2rem rgba(0, 0, 0, 0.05);
    padding: 1rem 0;

    ${(props) =>
        props.dropdownOpen === "false" &&
        `
        opacity: 0;
        transform: scale(0);
    `};
`;

export const DropdownItem = styled.button`
    width: 90%;
    margin: 0 auto;
    display: block;
    outline: none;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 1.3rem;
    font-weight: 300;
    padding: 2rem;
    opacity: 0.5;
    color: ${(props) => props.theme.opBg};
    transition: all 0.5s ease;
    border-radius: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    svg {
        margin-right: 1.7rem;

        path,
        circle {
            transition: stroke 0.5s ease;
        }

        ${(props) =>
            props.theme.name === "dark" &&
            props.logout !== "true" &&
            `
            path, circle {
                stroke: white;
            }
        `};
    }

    ${(props) =>
        props.logout === "true" &&
        `
        opacity: 1;
        color: #FF5D5D;
    `};

    &:hover {
        opacity: 1;
        background-color: ${(props) => props.theme.hover};
    }

    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;
