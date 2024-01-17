import styled from "styled-components";

export const TopProfileWrapper = styled.div`
    .user-bg {
        width: 100%;
        height: 40rem;

        & > div {
            height: 40rem;
        }
    }

    .user-pp {
        width: 15rem;
        height: 15rem;
        position: absolute;
        top: 31.5rem;
        left: 5%;
        border: 5px solid ${(props) => props.theme.bg};
        border-radius: 3.75rem;
        transition: border 0.5s ease;

        & > div {
            width: 100%;
            height: 100%;
            border-radius: 3.75rem;

            & > div {
                border-radius: 3.25rem;
                transform: translate(-50%, -51.5%) scale(0.98);
            }
        }

        img {
            object-fit: cover;
            border-radius: 3.25rem;
        }
    }
`;

export const TopProfileContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 9rem;
    padding: 0 1rem;
`;

export const TopProfileLeft = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const TopProfileName = styled.h1`
    font-size: 2rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const TopProfileTag = styled.h2`
    opacity: 0.5;
    font-size: 1.6rem;
    font-weight: 300;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const TopProfileType = styled.div`
    color: white;
    background-color: ${(props) => props.theme.blue};
    padding: 7.5px 2rem;
    font-size: 1.2rem;
    border-radius: 7.5px;
    margin-left: 2rem;
`;

export const TopProfileCompany = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;

    svg {
        margin-right: 1.5rem;
    }
`;

export const ProfileDivider = styled.hr`
    width: 90%;
    margin: 5rem auto;
    opacity: 0.075;
    border: 0.5px solid ${(props) => props.theme.opBg};
    transition: border-color 0.5s ease;
`;

export const ProfileWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5rem;
`;

export const ProfileLeft = styled.div`
    width: 100%;
`;

export const BioWrapper = styled.div`
    background-color: ${(props) => props.theme.componentBg};
    transition: background-color 0.5s ease;
    margin-bottom: 4rem;
    padding: 6rem 5rem;
    border-radius: 1.5rem;
    position: relative;

    svg {
        position: absolute;
        top: 2rem;
        right: 2rem;
    }
`;

export const BioHeading = styled.div`
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 2rem;
    transition: color 0.5s ease;
    color: ${(props) => props.theme.opBg};
`;

export const BioText = styled.div`
    font-size: 1.3rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.5;
    display: none;
    white-space: pre-wrap;

    ${(props) =>
        props.editActive === "true" &&
        `
        display: block;
    `}
`;

export const RecentsWrapper = styled.div`
    padding: 3rem 5rem;
    background-color: ${(props) => props.theme.componentBg};
    transition: background-color 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5rem;
`;

export const DepartmentWrapper = styled.div`
    margin-top: 4rem;
    padding: 2rem 5rem;
    background-color: ${(props) => props.theme.componentBg};
    transition: background-color 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5rem;

    span {
        font-weight: 300;
        margin-left: 1rem;
    }
`;

export const RecentsItem = styled.button`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: all 0.5s ease;
    width: 45%;
    outline: none;
    border: none;
    background: transparent;
    padding: 2rem;
    border-radius: 1.5rem;
    font-family: "Poppins", sans-serif;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.hover};
    }

    svg {
        margin-right: 2rem;
    }
`;
