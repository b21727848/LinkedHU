import styled from "styled-components";

export const JobDetailsWrapper = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.componentBg};
    width: 60rem;
    position: fixed;
    height: 61rem;
    border-radius: 1.5rem;
    top: 12.5rem;
    right: 35rem;
    padding: 4rem;
    transition: background-color 0.5s ease;
    overflow-y: scroll;

    .job-logo {
        width: 4.5rem;
        height: 4.5rem;
    }

    .map {
        width: 100%;
    }
`;

export const JobDetailsHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const JobDetailsName = styled.h1`
    font-size: 1.8rem;
    font-weight: 400;
    margin-left: 1.5rem;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const JobDetailsDivider = styled.div`
    margin: 3rem 0;
    opacity: 0.075;
    border: 0.5px solid ${(props) => props.theme.opBg};
`;

export const JobDetailsHeading = styled.h1`
    font-size: 1.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const JobDetailsInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 2.5rem 0;
`;

export const JobDetailsInfoItem = styled.div`
    font-size: 1.3rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBgFaded};
    transition: color 0.5s ease;
    display: flex;
    align-items: center;

    svg {
        margin-right: 1rem;
    }

    &:not(:last-child) {
        margin-right: 3rem;
    }
`;

export const JobDetailsAboutHeading = styled.h2`
    margin: 2rem 0;
    font-size: 1.5rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const JobDetailsAbout = styled.p`
    margin: 2rem 0;
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 1.6;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.5;
`;
export const JobDetailsButton = styled.button`
    padding: 1.5rem 3rem;
    text-decoration: none;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    border-radius: 0.75rem;
    background-color: ${(props) => props.theme.blue};
    display: inline-block;
    margin-top: 0.75rem;
    transition: transform 0.5s ease;
    border: none;
    outline: none;
    cursor: pointer;
    transform: translateX(22.5rem);
    margin-top: 1.5rem;

    &:hover {
        transform: translate(22.5rem, -5px);
    }

    svg {
        margin-left: 7.5px;
        transform: translate(22.5rem, 2px);
    }
`;
