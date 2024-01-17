import { useState, useEffect } from "react";

// Styles
import {
    PopupWrapper,
    PopupContainer,
    PopupHeading,
    PopupClose,
    PopupTextArea,
    PopupInput,
    PopupButton,
    MapContainer,
} from "../Style/scPostPopup";

import { LabelInput, Input, Textarea, Label, Button } from "../Style/scInput";

import UploadVideoImg from "../Assets/upload-video.svg";

// Images
import { AuthCloseIcon } from "../Assets/Images";

import { API_KEY } from "../Helpers/map";
import axios from "axios";

export default function PostPopup({
    user,
    setUser,
    category,
    setCategory,
    popupActive,
    setPopupActive,
    setPosts,
    posts,
    updateObj,
    setUpdateObj,
}) {
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [postObj, setPostObj] = useState({
        postType: "",
        message: "",
        place: "Hacettepe Üniversitesi",
        time: "",
        link: "",
        file: null,
    });

    useEffect(() => {
        if (!updateObj || !updateObj.id) {
            setUpdate(false);
            return;
        }

        setPostObj({ postObj, ...updateObj });
        setUpdate(true);

        if (updateObj.postType === "meeting") setCategory(0);
        else if (updateObj.postType === "announcement") setCategory(1);
        else if (updateObj.postType === "event") setCategory(2);
        else if (updateObj.postType === "video") setCategory(3);
    }, [updateObj]);

    useEffect(() => {
        setPostObj((postObj) => {
            return {
                ...postObj,
                postType: category.toUpperCase(),
            };
        });
    }, [category]);

    useEffect(() => {
        console.log(popupActive);
        if (!popupActive) {
            closePopup();
        } else setIsActive(true);
    }, [popupActive]);

    const closePopup = () => {
        setUpdateObj({});
        setPopupActive(false);
        setIsActive(false);
        setError(false);
        setPostObj({
            postType: "",
            message: "",
            place: "Hacettepe Üniversitesi",
            time: "",
            link: "",
            file: null,
        });

        const video = document.querySelector(".video");
        const videoInput = document.querySelector(".video-input");

        if (video) video.src = "";
        if (videoInput) videoInput.src = "";
    };

    const updatePost = () => {
        if (
            !postObj.id ||
            !postObj.message ||
            (category === "meeting" && (!postObj.link || !postObj.time)) ||
            (category === "event" && (!postObj.time || !postObj.place)) ||
            (category === "video" && !postObj.file)
        ) {
            setError(true);
            return;
        }

        const finalObj = {
            ...postObj,
            time:
                category === "event" || category === "meeting"
                    ? new Date(postObj.time).getTime()
                    : "",
        };

        const token = localStorage.getItem("token");

        if (category !== "video")
            axios
                .put(
                    `http://localhost:8080/api/v1/post/${postObj.id}`,
                    { ...finalObj, postType: category.toUpperCase() },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {
                    closePopup();
                    const responsePost = response.data.data;
                    const index = posts.findIndex(
                        (post) => post.id === responsePost.id
                    );

                    if (responsePost.likes.find((like) => like.id === user.id))
                        responsePost.likedByMe = true;
                    else responsePost.likedByMe = false;

                    responsePost.likeCount = responsePost.likes.length;
                    responsePost.commentCount = responsePost.comments.length;

                    const postsCopy = [...posts];
                    postsCopy.splice(index, 1);
                    postsCopy.unshift(responsePost);
                    setPosts([...postsCopy]);
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        else {
            const formData = new FormData();
            formData.append("file", finalObj.file);
            formData.append("message", finalObj.message);

            axios
                .put(
                    `http://localhost:8080/api/v1/post/video/${postObj.id}`,
                    { ...finalObj, postType: category.toUpperCase() },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    closePopup();
                    const responsePost = response.data.data;
                    const index = posts.findIndex(
                        (post) => post.id === responsePost.id
                    );

                    if (responsePost.likes.find((like) => like.id === user.id))
                        responsePost.likedByMe = true;
                    else responsePost.likedByMe = false;

                    responsePost.likeCount = responsePost.likes.length;
                    responsePost.commentCount = responsePost.comments.length;

                    const postsCopy = [...posts];
                    postsCopy.splice(index, 1);
                    postsCopy.unshift(responsePost);
                    setPosts([...postsCopy]);
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        }
    };

    const createPost = () => {
        if (
            !postObj.message ||
            (category === "meeting" && (!postObj.link || !postObj.time)) ||
            (category === "event" && (!postObj.time || !postObj.place)) ||
            (category === "video" && !postObj.file)
        ) {
            setError(true);
            return;
        }

        const finalObj = {
            ...postObj,
            time:
                category === "event" || category === "meeting"
                    ? new Date(postObj.time).getTime()
                    : "",
        };

        const token = localStorage.getItem("token");

        if (category !== "video")
            axios
                .post(
                    `http://localhost:8080/api/v1/post/`,
                    { ...finalObj, postType: category.toUpperCase() },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {
                    closePopup();
                    const responsePost = response.data.data;
                    if (responsePost.likes.find((like) => like.id === user.id))
                        responsePost.likedByMe = true;
                    else responsePost.likedByMe = false;

                    responsePost.likeCount = responsePost.likes.length;
                    responsePost.commentCount = responsePost.comments.length;

                    setPosts((posts) => [responsePost, ...posts]);
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        else {
            const formData = new FormData();
            formData.append("file", finalObj.file);
            formData.append("message", finalObj.message);

            axios
                .post(
                    `http://localhost:8080/api/v1/post/video`,
                    { ...finalObj, postType: category.toUpperCase() },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {
                    const responsePost = response.data.data;
                    if (
                        responsePost.likes.find(
                            (like) => like.owner.id === user.id
                        )
                    )
                        responsePost.likedByMe = true;
                    else responsePost.likedByMe = false;

                    responsePost.likeCount = responsePost.likes.length;
                    responsePost.commentCount = responsePost.comments.length;

                    setPosts((posts) => [responsePost, ...posts]);
                    closePopup();
                    console.log(response);
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        }
    };

    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            document.querySelector(".video").src = reader.result;
        };
    };

    return (
        <PopupWrapper isActive={isActive ? "true" : "false"}>
            <PopupClose onClick={() => setPopupActive(false)}>
                <AuthCloseIcon />
            </PopupClose>
            <PopupContainer
                style={{
                    margin:
                        category === "event" || category === "video"
                            ? "40rem 0 5rem"
                            : 0,
                }}
            >
                <PopupHeading>
                    New {category[0].toUpperCase() + category.substring(1)} 🥳
                </PopupHeading>
                <LabelInput>
                    <Label>Enter Message</Label>
                    <Textarea
                        rows="8"
                        differentColor="true"
                        error={error && "true"}
                        value={postObj.message}
                        onChange={(e) =>
                            setPostObj((postObj) => {
                                return {
                                    ...postObj,
                                    message: e.target.value,
                                };
                            })
                        }
                    />
                </LabelInput>
                {(category === "event" || category === "meeting") && (
                    <LabelInput>
                        <Label>Enter Time</Label>
                        <Input
                            type="datetime-local"
                            error={error && "true"}
                            differentColor="true"
                            value={postObj.time}
                            onChange={(e) =>
                                setPostObj((postObj) => {
                                    return {
                                        ...postObj,
                                        time: e.target.value,
                                    };
                                })
                            }
                        />
                    </LabelInput>
                )}
                {category === "meeting" && (
                    <LabelInput>
                        <Label>Enter Link</Label>
                        <Input
                            type="text"
                            error={error && "true"}
                            differentColor="true"
                            value={postObj.link}
                            onChange={(e) =>
                                setPostObj((postObj) => {
                                    return {
                                        ...postObj,
                                        link: e.target.value,
                                    };
                                })
                            }
                        />
                    </LabelInput>
                )}
                {category === "event" && (
                    <>
                        <LabelInput>
                            <Label>Place</Label>
                            <Input
                                type="text"
                                error={error && "true"}
                                differentColor="true"
                                value={postObj.place}
                                onChange={(e) =>
                                    setPostObj((postObj) => {
                                        return {
                                            ...postObj,
                                            place: e.target.value,
                                        };
                                    })
                                }
                            />
                        </LabelInput>
                        <MapContainer>
                            <iframe
                                title="Location"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${postObj.place}`}
                            ></iframe>
                        </MapContainer>
                    </>
                )}
                {category === "video" && (
                    <>
                        <LabelInput
                            style={{
                                position: "relative",
                                marginBottom: "4rem",
                            }}
                        >
                            <Label>Upload Video</Label>
                            <img
                                src={UploadVideoImg}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "20rem",
                                    objectFit: "cover",
                                    borderRadius: "2rem",
                                    marginTop: "2rem",
                                }}
                            />
                            <Input
                                type="file"
                                accept="video/*"
                                className="video-input"
                                onChange={(e) =>
                                    setPostObj((postObj) => {
                                        if (!e.target.files) return;

                                        getBase64(e.target.files[0]);

                                        return {
                                            ...postObj,
                                            file: e.target.files[0],
                                        };
                                    })
                                }
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    top: 0,
                                    left: 0,
                                    opacity: 0,
                                }}
                            />
                        </LabelInput>
                        <video
                            className="video"
                            style={{
                                width: "100%",
                                display: "block",
                                marginBottom: "3rem",
                                borderRadius: "2rem",
                            }}
                            controls
                        >
                            <source src="" type="video/mp4" />
                        </video>
                    </>
                )}
                <PopupButton
                    style={{ marginTop: 0 }}
                    onClick={(e) => {
                        e.preventDefault();
                        update ? updatePost() : createPost();
                    }}
                >
                    {update ? "Update" : "Create"} {category}
                </PopupButton>
            </PopupContainer>
        </PopupWrapper>
    );
}
