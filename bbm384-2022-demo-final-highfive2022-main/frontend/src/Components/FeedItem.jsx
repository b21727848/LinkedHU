import axios from "axios";
import { useState, useEffect } from "react";

// Controller
import UserController from "../Api/controllers/User.controller";
import { API_KEY } from "../Helpers/map";

// Styles
import { MapContainer } from "../Style/scPostPopup";

import {
    FeedWrapper,
    FeedHeader,
    FeedFrom,
    FeedName,
    FeedTag,
    FeedDate,
    FeedContent,
    FeedLink,
    FeedText,
    FeedSocial,
    FeedSocialItem,
} from "../Style/scFeed";

import {
    ChatWrapper,
    ChatHeader,
    ChatMain,
    ChatBottom,
    ChatMessage,
    SingleMessage,
    MessagesWrapper,
} from "../Style/scChat";

import { MiddleHeading, Divider, Paragraph, Input } from "../Style/scInput";
import { NewMessageIcon, ChatEdit, ChatDelete } from "../Assets/Images";

import { JobDetailsInfoItem, JobDetailsInfo } from "../Style/scJobDetails";
import {
    LikeIconActive,
    LocationIcon,
    TimeIcon,
    VideoIcon,
} from "../Assets/Images";

// Images
import { LikeIcon, CommentIcon } from "../Assets/Images";
import { BackBtn } from "../Assets/Images";
import {
    convertTime,
    convertTimeDetailed,
    getProfilePic,
} from "../Helpers/helpers";

const Messages = ({ user, post, setPosts, openChat, setOpenChat }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [updateMode, setUpdateMode] = useState(null);

    useEffect(() => {
        setMessages([...post.comments]);
    }, [post]);

    const sendMessage = () => {
        if (!message) return;

        const token = localStorage.getItem("token");

        axios
            .post(
                `http://localhost:8080/api/v1/post/${post.id}/comment`,
                {
                    comment: message,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                setMessages([...messages, response.data.data]);
                setMessage("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateMessage = (id) => {
        if (!message || !updateMode) return;

        const token = localStorage.getItem("token");

        axios
            .put(
                `http://localhost:8080/api/v1/post/comment/${id}`,
                {
                    comment: message,
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
                    messagesCopy[index].comment = message;
                    setMessages([...messagesCopy]);
                }

                setMessage("");
                setUpdateMode(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteMessage = (id) => {
        console.log("here deleting...");
        const token = localStorage.getItem("token");

        axios
            .delete(`http://localhost:8080/api/v1/post/comment/${id}`, {
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

    return (
        <MessagesWrapper openChat={!openChat && "true"}>
            <ChatBottom
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img
                    style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "1rem",
                        marginRight: "2rem",
                    }}
                    src={user?.profilePic}
                    alt=""
                />
                <div>
                    <Input
                        style={{
                            paddingLeft: "2rem",
                            paddingRight: "5.5rem",
                            fontSize: "1.2rem",
                            width: "46.5rem",
                        }}
                        type="text"
                        placeholder="Enter new message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div
                        onClick={() => {
                            if (!updateMode) {
                                sendMessage();
                                return;
                            }

                            updateMessage(updateMode);
                        }}
                        style={{ cursor: "pointer", zIndex: 100 }}
                    >
                        <BackBtn />
                    </div>
                </div>
            </ChatBottom>
            <Divider />
            <ChatMain style={{ flexDirection: "column-reverse" }}>
                {messages.map((comment) => {
                    return (
                        <ChatMessage key={comment.id}>
                            {comment?.owner.id === user.id && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "absolute",
                                        top: "60%",
                                        right: 0,
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <div
                                        onClick={() => {
                                            setUpdateMode(comment.id);
                                            setMessage(comment.comment);
                                        }}
                                    >
                                        <ChatEdit />
                                    </div>
                                    <div
                                        onClick={() => {
                                            deleteMessage(comment.id);
                                        }}
                                    >
                                        <ChatDelete />
                                    </div>
                                </div>
                            )}
                            <div style={{ width: "100%" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "5rem",
                                            height: "5rem",
                                            borderRadius: "1rem",
                                            marginRight: "2rem",
                                            transform: "translateY(2rem)",
                                        }}
                                        src={getProfilePic(comment.owner)}
                                        alt=""
                                    />
                                    <div>
                                        <Paragraph
                                            style={{
                                                fontSize: "1.2rem",
                                                opacity: 1,
                                            }}
                                        >
                                            {comment?.owner.name}
                                        </Paragraph>
                                    </div>
                                </div>
                                <SingleMessage
                                    style={{
                                        width: "80%",
                                        transform: "translateX(6.5rem)",
                                        marginTop: "-4.5rem",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    {comment?.comment}
                                </SingleMessage>
                            </div>
                        </ChatMessage>
                    );
                })}
            </ChatMain>
        </MessagesWrapper>
    );
};

export default function FeedItem({
    post,
    user,
    setPosts,
    posts,
    setPopupActive,
    setUpdateObj,
}) {
    const [openChat, setOpenChat] = useState(false);

    const constructUpdateObj = () => {
        setUpdateObj({
            id: post.id,
            postType: post?.postType.toLowerCase(),
            message: post?.message,
            place: post?.place,
            time: post?.time,
            link: post?.link,
            file: null,
        });
    };

    const deletePost = (id) => {
        const token = localStorage.getItem("token");

        axios
            .delete(`http://localhost:8080/api/v1/post/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const index = posts.findIndex((post) => post.id === id);

                if (index >= 0) {
                    const postsCopy = [...posts];
                    postsCopy.splice(index, 1);
                    setPosts([...postsCopy]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLike = () => {
        if (!post) return;

        const token = localStorage.getItem("token");

        if (!post.likedByMe) {
            axios
                .post(
                    `http://localhost:8080/api/v1/post/${post?.id}/like`,
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    post.likedByMe = true;
                    post.likeCount++;
                    post.likes = [response.data.data, ...post.likes];
                    setPosts([...posts]);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const id = post?.likes.find((like) => like.owner.id === user.id).id;
            const index = post?.likes.findIndex(
                (like) => like.owner.id === user.id
            ).id;
            axios
                .delete(`http://localhost:8080/api/v1/post/like/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    console.log(response);
                    post.likedByMe = false;
                    post.likeCount--;
                    post.likes.splice(index, 1);
                    setPosts([...posts]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <FeedWrapper>
                <FeedHeader>
                    <img
                        style={{ borderRadius: "1.25rem" }}
                        src={getProfilePic(post?.owner)}
                        alt={post?.owner?.name}
                    />
                    <FeedFrom>
                        <FeedName>{post?.owner?.name}</FeedName>
                        <FeedTag>{post?.owner?.title}</FeedTag>
                        <FeedDate>{convertTime(post?.timestamp)}</FeedDate>
                    </FeedFrom>
                </FeedHeader>
                <FeedContent>
                    <FeedText>{post?.message}</FeedText>
                    {post?.postType === "EVENT" && (
                        <>
                            <JobDetailsInfo>
                                <JobDetailsInfoItem>
                                    <LocationIcon /> {post?.place}
                                </JobDetailsInfoItem>
                                <JobDetailsInfoItem>
                                    <TimeIcon />{" "}
                                    {convertTimeDetailed(post?.time)}
                                </JobDetailsInfoItem>
                            </JobDetailsInfo>
                            <MapContainer>
                                <iframe
                                    title="Location"
                                    width="600"
                                    height="250"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${post?.place}`}
                                ></iframe>
                            </MapContainer>
                        </>
                    )}
                    {post?.postType === "MEETING" && (
                        <>
                            <JobDetailsInfo style={{ marginBottom: 0 }}>
                                <JobDetailsInfoItem>
                                    <TimeIcon />{" "}
                                    {convertTimeDetailed(post?.time)}
                                </JobDetailsInfoItem>
                            </JobDetailsInfo>
                            <FeedLink
                                href={
                                    post?.link.startsWith("http")
                                        ? post?.link
                                        : "https://" + post?.link
                                }
                                target="blank"
                            >
                                Join the Meeting!
                            </FeedLink>
                        </>
                    )}
                    {post?.postType === "VIDEO" && (
                        <>
                            <JobDetailsInfo style={{ marginBottom: 0 }}>
                                <JobDetailsInfoItem>
                                    <VideoIcon /> {post?.videoName}
                                </JobDetailsInfoItem>
                            </JobDetailsInfo>
                            <video
                                className="post-video"
                                style={{
                                    width: "100%",
                                    display: "block",
                                    marginBottom: "4rem",
                                    marginTop: "3rem",
                                    borderRadius: "2rem",
                                }}
                                controls
                            >
                                <source
                                    src={"data:video/mp4;base64," + post?.video}
                                    type="video/mp4"
                                />
                            </video>
                        </>
                    )}
                </FeedContent>
                <FeedSocial>
                    <FeedSocialItem onClick={handleLike}>
                        {post?.likedByMe && <LikeIconActive />}
                        {!post?.likedByMe && <LikeIcon />}
                        {post?.likeCount}
                    </FeedSocialItem>
                    <FeedSocialItem
                        onClick={() => setOpenChat((openChat) => !openChat)}
                    >
                        <CommentIcon />
                        {post?.commentCount}
                    </FeedSocialItem>
                </FeedSocial>
                {user?.id === post?.owner.id && (
                    <div
                        style={{
                            display: "flex",
                            position: "absolute",
                            right: "3rem",
                            bottom: "3rem",
                        }}
                    >
                        <div
                            style={{ cursor: "pointer", marginRight: "1rem" }}
                            onClick={() => {
                                constructUpdateObj();
                                setPopupActive(true);
                            }}
                        >
                            <ChatEdit />
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                deletePost(post.id);
                            }}
                        >
                            <ChatDelete />
                        </div>
                    </div>
                )}
            </FeedWrapper>
            <Messages
                user={user}
                post={post}
                setPosts={setPosts}
                openChat={openChat}
                setOpenChat={setOpenChat}
            />
        </>
    );
}
