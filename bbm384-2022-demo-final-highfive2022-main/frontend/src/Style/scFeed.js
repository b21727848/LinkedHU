import styled from "styled-components";

export const FeedsContent = styled.div`
    position: sticky;
    margin-top: 12.5rem;
    margin-bottom: 5rem;
    left: 39rem;
    border-radius: 1.5rem;
    width: 59.5rem;
    z-index: 0;
`;

export const FeedDivider = styled.hr`
    margin-bottom: 5rem;
    opacity: 0.075;
    border: 0.5px solid ${(props) => props.theme.opBg};
    transition: border-color 0.5s ease;
`;

export const FeedWrapper = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.componentBg};
    border-radius: 1.5rem;
    padding: 3.5rem;
    transition: background-color 0.5s ease;

    &:not(:last-child) {
        margin-bottom: 5rem;
    }
`;

export const FeedHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    img {
        width: 4.5rem;
        height: 4.5rem;
        object-fit: cover;
        margin-right: 1.75rem;
    }
`;

export const FeedFrom = styled.div``;

export const FeedName = styled.div`
    font-size: 1.5rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
`;

export const FeedTag = styled.p`
    font-size: 1.2rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.3;
`;

export const FeedDate = styled.p`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.3;
`;

export const FeedContent = styled.div`
    margin-top: 2rem;
    position: relative;
`;

export const FeedLink = styled.a`
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    text-decoration: none;
    color: ${(props) => props.theme.link};
    padding: 1.5rem 2.5rem 1.5rem 2.5rem;
    display: inline-block;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 2px;
        background-color: ${(props) => props.theme.link};
    }
`;

export const FeedText = styled.div`
    font-size: 1.2rem;
    line-height: 1.6;
    font-weight: 300;
    color: ${(props) => props.theme.opBg};
    transition: color 0.5s ease;
    opacity: 0.7;
    white-space: pre-line;
`;

export const FeedSocial = styled.div`
    position: relative;
    margin-top: 3rem;
    display: flex;
    align-items: center;
    padding: 3rem 0 0;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${(props) => props.theme.opBg};
        opacity: 0.1;
    }
`;

export const FeedSocialItem = styled.div`
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 400;
    color: ${(props) => props.theme.opBgFaded};
    transition: color 0.5s ease;

    &:not(:last-child) {
        margin-right: 3rem;
    }

    svg {
        opacity: 1;
        transform: translateY(2px);
        margin-right: 1rem;
    }
`;
