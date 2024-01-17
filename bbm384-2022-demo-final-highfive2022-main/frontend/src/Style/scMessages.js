import styled from "styled-components";

export const MessagesWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 30rem;
    height: 100%;
    background-color: ${(props) => props.theme.messageBg};
    padding: 3rem 3.5rem;
    transition: background-color 0.5s ease;
`;

export const MessagesHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4rem;
`;

export const MessagesNew = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    transition: transform 0.5s ease;
    background-color: transparent;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const MessagesHeading = styled.h1`
    font-size: 1.7rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const MessagesContainer = styled.div``;

export const MessageWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 26rem;
        height: 7.5rem;
        border-radius: 1.5rem;
        background-color: ${(props) => props.theme.messageHover};
        z-index: -1;
        opacity: 0;
        transition: opacity 0.5s ease;
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

export const MessagePP = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 2rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const MessageContent = styled.div`
    width: 15rem;
    overflow: hidden;
`;

export const MessageFrom = styled.h2`
    font-size: 1.4rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 11rem;
    overflow: hidden;
    transition: color 0.5s ease;
`;

export const MessageRecent = styled.p`
    opacity: 0.3;
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const MessageDate = styled.p`
    position: absolute;
    top: 2px;
    right: 0;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    font-size: 1.1rem;
    opacity: 0.2;
`;
