import styled from "styled-components";

export const HomepageWrapper = styled.section`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .star-bg,
    .top-decoration,
    .bottom-decoration {
        position: absolute;
        z-index: -1;
    }

    .star-bg {
        top: 50%;
        left: 50%;
        transform: ;
        transition: transform 0.5s ease;
        transform: translate(-50%, -50%)
            ${(props) =>
                props.theme.name === "light" ? "scale(0)" : "scale(1)"};
    }

    .top-decoration {
        top: -17.5rem;
        right: -12.5rem;
    }

    .bottom-decoration {
        bottom: -17.5rem;
        left: -12.5rem;
    }

    .scroll-down {
        position: absolute;
        bottom: 4rem;
        left: 50%;
        transform: translateX(-50%);

        g,
        path {
            transition: stroke 0.5s ease;
        }

        ${(props) =>
            props.theme.name === "dark" &&
            `
            opacity: .4;

            g, path {
                stroke: white;
            }
        `}
    }
`;

export const NavbarContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 4rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NavbarLogo = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 400;
    transition: color 0.5s ease;
    color: ${(props) => props.theme.opBg};

    svg {
        margin-right: 1.5rem;
    }
`;

export const NavbarLink = styled.a`
    font-size: 1.5rem;
    font-weight: 300;
    color: white;
    text-decoration: none;
`;

export const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const BigHeading = styled.h1`
    text-align: center;
    font-size: 8.5rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;

    span {
        background-image: ${(props) => props.theme.gradient};
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
    }
`;

export const BigButton = styled.a`
    display: inline-block;
    text-decoration: none;
    color: white;
    background: ${(props) => props.theme.pink};
    padding: 1.5rem 3rem;
    border-radius: 0.75rem;
    font-weight: 300;
    font-size: 1.4rem;
    margin-top: 1.8rem;
    position: relative;
    z-index: 0;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${(props) => props.theme.gradient};
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: -1;
        border-radius: 0.75rem;
    }

    &:hover {
        &:after {
            opacity: 1;
        }
    }
`;

export const ThemeSetter = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    width: 7rem;
    height: 3.5rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.lightBlue};
    transition: background-color 0.5s ease;
    cursor: pointer;

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 5px;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: ${(props) => props.theme.blue};
        transform: translateY(-50%);
        transition: transform 0.5s ease;
    }

    ${(props) =>
        props.activeItem === "false" &&
        `
        &:after {
            transform: translate(3.5rem, -50%);
        }
    `};
`;
