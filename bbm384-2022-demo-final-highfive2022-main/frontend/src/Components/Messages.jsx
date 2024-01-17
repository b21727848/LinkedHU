import axios from "axios";
import { useEffect, useState } from "react";

// Styles
import {
    MessagesWrapper,
    MessagesHeader,
    MessagesNew,
    MessagesHeading,
    MessagesContainer,
    MessageWrapper,
    MessagePP,
    MessageContent,
    MessageFrom,
    MessageRecent,
    MessageDate,
} from "../Style/scMessages";

import {
    ChatWrapper,
    ChatHeader,
    ChatMain,
    ChatBottom,
    ChatMessage,
    SingleMessage,
} from "../Style/scChat";
import { MiddleHeading, Divider, Paragraph, Input } from "../Style/scInput";
import { BackBtn } from "../Assets/Images";
import NotFoundPP from "../Assets/pp-not-found.svg";

import {
    NavbarSearch,
    NavbarSearchInput,
    Dropdown,
    DropdownItem,
} from "../Style/scNavbar";

import { SearchIcon } from "../Assets/Images";

// Images
import { NewMessageIcon, ChatEdit, ChatDelete } from "../Assets/Images";
import { convertTime, getProfilePic } from "../Helpers/helpers";

const UserDropdown = ({
    searchResult,
    setSearch,
    setSearchResult,
    setOther,
    setOpenChat,
}) => {
    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    return (
        searchResult &&
        searchResult.length > 0 && (
            <Dropdown
                style={{
                    zIndex: 1000,
                    maxHeight: "20rem",
                    top: "6rem",
                    left: "0",
                    width: "100%",
                    overflowY: "scroll",
                }}
                dropdownOpen={searchResult ? "true" : "false"}
            >
                {searchResult.map((user) => {
                    return (
                        <a
                            href=""
                            style={{ textDecoration: "none" }}
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenChat(true);
                                setOther(user);
                            }}
                        >
                            <DropdownItem
                                onClick={() => {
                                    setSearchResult(null);
                                    setSearch("");
                                }}
                                style={{ opacity: 1, padding: "1rem" }}
                            >
                                <img
                                    src={
                                        user.profilePic
                                            ? "data:image/png;base64," +
                                              user.profilePic
                                            : NotFoundPP
                                    }
                                    alt=""
                                    style={{
                                        opacity: 1,
                                        borderRadius: "1rem",
                                        marginRight: "1.25rem",
                                        width: "4rem",
                                        height: "4rem",
                                    }}
                                />
                                <span style={{ opacity: 0.5 }}>
                                    {user.name}
                                </span>
                            </DropdownItem>
                        </a>
                    );
                })}
            </Dropdown>
        )
    );
};

const Search = ({ user, openSearch, setOpenChat, setOther }) => {
    const [searchResult, setSearchResult] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search) {
            setSearchResult(null);
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .post(
                `http://localhost:8080/api/v1/user/search`,
                { name: search },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                const searchItems = [...response.data.data.content];
                const index = searchItems.findIndex((u) => user.id === u.id);
                if (index >= 0) searchItems.splice(index, 1);
                setSearchResult([...searchItems]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [search]);

    return (
        openSearch && (
            <NavbarSearch
                style={{
                    marginLeft: 0,
                    marginTop: "-1.5rem",
                    marginBottom: "3rem",
                }}
            >
                <SearchIcon />
                <NavbarSearchInput
                    style={{ width: "100%" }}
                    differentColor="true"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <UserDropdown
                    setOpenChat={setOpenChat}
                    setOther={setOther}
                    setSearchResult={setSearchResult}
                    setSearch={setSearch}
                    searchResult={searchResult}
                />
            </NavbarSearch>
        )
    );
};

const Message = ({
    profilePic,
    from,
    recent,
    date,
    other,
    setOther,
    setOpenChat,
}) => {
    return (
        <MessageWrapper
            onClick={() => {
                setOther(other);
                setOpenChat(true);
            }}
        >
            <MessagePP>
                <img
                    style={{ borderRadius: "1rem" }}
                    src={profilePic}
                    alt={from}
                />
            </MessagePP>
            <MessageContent>
                <MessageFrom>{from}</MessageFrom>
                <MessageRecent>{recent}</MessageRecent>
                <MessageDate>{date}</MessageDate>
            </MessageContent>
        </MessageWrapper>
    );
};

const Chat = ({ user, other, openChat, setOpenChat }) => {
    const [sendMessage, setSendMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [updateMode, setUpdateMode] = useState(null);

    useEffect(() => {
        if (!openChat) setMessages([]);
        if (!user || !other) return;

        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/v1/chat/between/${other.id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const data = response.data.data;
                const normalizedMessages = [];

                data.forEach((messageObj) => {
                    const id = messageObj.id;
                    const message = messageObj.message;
                    const my = messageObj.sender.id === user.id;

                    normalizedMessages.push({
                        id,
                        message,
                        my,
                    });
                });

                setMessages([...normalizedMessages]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [openChat]);

    const deleteMessage = (id) => {
        const token = localStorage.getItem("token");

        axios
            .delete(`http://localhost:8080/api/v1/message/delete/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const index = messages.findIndex(
                    (message) => message.id === id
                );

                if (index >= 0) {
                    const messagesCopy = [...messages];
                    messagesCopy.splice(index, 1);
                    setMessages([...messagesCopy]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateMessage = (id) => {
        if (!sendMessage || !updateMode) return;

        const token = localStorage.getItem("token");

        axios
            .put(
                `http://localhost:8080/api/v1/message/update/${id}`,
                {
                    message: sendMessage,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                const index = messages.findIndex(
                    (message) => message.id === id
                );

                if (index >= 0) {
                    const messagesCopy = [...messages];
                    messagesCopy[index].message = sendMessage;
                    setMessages([...messagesCopy]);
                }

                setSendMessage("");
                setUpdateMode(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const postSendMessage = () => {
        if (!sendMessage) return;

        const token = localStorage.getItem("token");

        axios
            .post(
                `http://localhost:8080/api/v1/message/create`,
                {
                    receiver: other.username,
                    message: sendMessage,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                const messageObj = response.data.data;
                const id = messageObj.id;
                const message = messageObj.message;
                const my = messageObj.sender.id === user.id;

                const finalObj = {
                    id,
                    message,
                    my,
                };

                const finalMessages = [...messages];
                finalMessages.unshift(finalObj);
                setMessages([...finalMessages]);
                setSendMessage("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ChatWrapper openChat={openChat && "true"}>
            <ChatHeader>
                <div
                    className="chat-back-btn"
                    onClick={() => setOpenChat(false)}
                >
                    <BackBtn />
                    <Paragraph>Back</Paragraph>
                </div>
                <img
                    style={{
                        "border-radius": "1rem",
                    }}
                    src={getProfilePic(other)}
                    alt=""
                />
                <MiddleHeading
                    style={{
                        fontSize: "1.4rem",
                    }}
                >
                    {other?.name}
                </MiddleHeading>
            </ChatHeader>
            <Divider />
            <ChatMain>
                {messages.map((m) => {
                    return (
                        <ChatMessage key={m.id}>
                            {m.my && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "absolute",
                                        top: "50%",
                                        left: 0,
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <div
                                        onClick={() => {
                                            setUpdateMode(m.id);
                                            setSendMessage(m.message);
                                        }}
                                    >
                                        <ChatEdit />
                                    </div>
                                    <div onClick={() => deleteMessage(m.id)}>
                                        <ChatDelete />
                                    </div>
                                </div>
                            )}
                            <SingleMessage my={m.my && "true"}>
                                {m.message}
                            </SingleMessage>
                        </ChatMessage>
                    );
                })}
            </ChatMain>
            <Divider />
            <ChatBottom>
                <Input
                    style={{
                        paddingLeft: "2rem",
                        paddingRight: "5.5rem",
                        fontSize: "1.2rem",
                    }}
                    type="text"
                    placeholder="Enter new message"
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                />
                <div
                    style={{ cursor: "pointer", zIndex: 100 }}
                    onClick={(e) => {
                        if (!updateMode) {
                            postSendMessage();
                            return;
                        }

                        updateMessage(updateMode);
                    }}
                >
                    <BackBtn />
                </div>
            </ChatBottom>
        </ChatWrapper>
    );
};

export default function Messages({ user, setUser }) {
    const [openChat, setOpenChat] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [messages, setMessages] = useState([]);
    const [other, setOther] = useState(null);

    useEffect(() => {
        if (!user) return;
        if (openChat === true) return;
        setMessages([]);
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/v1/chat/latest`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const data = response.data.data;

                for (let i = 0; i < data.length; i++) {
                    const messageObj = data[i];
                    const other =
                        messageObj.sender.id === user.id
                            ? messageObj.receiver
                            : messageObj.sender;
                    const id = messageObj.id;
                    const profilePic = getProfilePic(other);
                    const from = other.name;
                    const recent = messageObj.message;
                    const date = convertTime(messageObj.timestamp);

                    setMessages((messages) => {
                        const found = messages.find(
                            (message) => message.id === id
                        );
                        if (found) return messages;

                        return [
                            ...messages,
                            {
                                id,
                                profilePic,
                                from,
                                recent,
                                date,
                                other,
                            },
                        ];
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user, openChat]);

    return (
        <MessagesWrapper>
            <Chat
                user={user}
                other={other}
                setOpenChat={setOpenChat}
                openChat={openChat}
            />
            <MessagesHeader>
                <MessagesHeading>Messages</MessagesHeading>
                <MessagesNew
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenSearch((openSearch) => !openSearch);
                    }}
                >
                    <NewMessageIcon />
                </MessagesNew>
            </MessagesHeader>
            <Search
                user={user}
                openSearch={openSearch}
                setOther={setOther}
                setOpenChat={setOpenChat}
            />
            <MessagesContainer>
                {messages.map((message) => (
                    <Message
                        profilePic={message.profilePic}
                        from={message.from}
                        recent={message.recent}
                        date={message.date}
                        key={message.id}
                        other={message.other}
                        setOther={setOther}
                        setOpenChat={setOpenChat}
                    />
                ))}
            </MessagesContainer>
        </MessagesWrapper>
    );
}
