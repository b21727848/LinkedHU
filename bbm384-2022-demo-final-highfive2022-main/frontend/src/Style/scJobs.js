import styled from "styled-components";

export const JobsWrapper = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.componentBg};
    width: 29rem;
    position: fixed;
    height: 61rem;
    border-radius: 1.5rem;
    top: 12.5rem;
    left: 5rem;
    padding: 3rem;
    transition: background-color 0.5s ease;
`;

export const JobsHeading = styled.h1`
    color: ${(props) => props.theme.opBg};
    font-size: 2.3rem;
    font-weight: 500;
    margin-bottom: 3rem;
    transition: color 0.5s ease;
`;

export const JobWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    ${(props) =>
        props.activeItem === "true" &&
        `
        &:after {
            opacity: 1 !important;
        }
    `}

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 26rem;
        height: 7.5rem;
        border-radius: 1.5rem;
        background-color: ${(props) => props.theme.hover};
        z-index: -1;
        opacity: 0;
        transition: all 0.5s ease;
    }

    &:hover {
        &:after {
            opacity: 1;
        }
    }

    &:not(:last-child) {
        margin-bottom: 4rem;
    }
`;

export const JobLogo = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 2rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const JobContent = styled.div``;

export const JobName = styled.h2`
    font-size: 1.4rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 11rem;
    overflow: hidden;
    transition: color 0.5s ease;
`;

export const JobTitle = styled.p`
    opacity: 0.3;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;
