import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 67.5%;
        font-family: 'Poppins', sans-serif;
    }

    body {
        width: 100%;
        min-height: 100vh;
        background-color: ${(props) => props.theme.bg};
        transition: background-color .5s ease;
    }
`;

export const AppWrapper = styled.div`
    width: calc(100% - 30rem);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
`;
