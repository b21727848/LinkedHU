import styled from "styled-components";

export const MessagesWrapper = styled.div`
    background-color: ${(props) => props.theme.componentBg};
    border-radius: 2rem;
    max-height: 30rem;
    width: 100%;
    overflow-y: scroll;
    margin-top: -4rem;
    margin-bottom: 6rem;
    padding: 3rem;

    ${(props) =>
        props.openChat &&
        `
        display: none;
    `};
`;

export const ChatWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: ${(props) => props.theme.componentBg};
    box-shadow: -5px 5px 2rem rgba(0, 0, 0, 0.05);
    padding: 5rem 3rem;
    transform: translateX(100%);
    transition: all 0.5s ease;

    ${(props) =>
        props.openChat &&
        `
        transform: none;
    `};
`;

export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3rem;

    .chat-back-btn {
        top: 2rem;
        left: 3rem;
        position: absolute;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
            margin-right: 1rem;
            width: 5rem;
            height: 3.5rem;
        }
    }

    img {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
    }
`;

export const ChatMain = styled.div`
    height: 60vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
`;

export const ChatMessage = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 2rem;

    svg {
        transition: transform 0.5s ease;
        transform: scale(0);
        cursor: pointer;

        &:first-child {
            margin-bottom: 1rem;
        }
    }

    &:hover {
        svg {
            transform: scale(1);
        }
    }
`;

export const SingleMessage = styled.div`
    background-color: ${(props) => props.theme.bg};
    padding: 2rem;
    border-radius: 1.25rem;
    color: ${(props) => props.theme.opBg};
    font-weight: 300;
    font-size: 1.2rem;
    transition: all 0.5s ease;
    width: 85%;

    ${(props) =>
        props.my === "true" &&
        `
        transform: translateX(15%);
        color: white;
        background-color: ${props.theme.blue};
        `};

    &:not(:last-child) {
        margin-bottom: 2rem;
    }
`;

export const ChatBottom = styled.div`
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        right: 1.25rem;
        transform: translateY(-50%) rotateZ(180deg);
        width: 4rem;
        height: 3.5rem;

        #Rectangle_6394 {
            fill: #ff767c;
        }
    }
`;
