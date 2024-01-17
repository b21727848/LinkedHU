import { useState, useEffect } from "react";

// Controller
import UserController from "../Api/controllers/User.controller";

// Posts
import { POSTS } from "../Api/models/Post.model";

// Components
import Messages from "../Components/Messages";
import Navbar from "../Components/Navbar";
import JobsFinder from "../Components/JobFinder";
import FeedItem from "../Components/FeedItem";
import PostItem from "../Components/PostItem";
import PostPopup from "../Components/PostPopup";

// Style
import { AppWrapper } from "../Style/scApp";
import { FeedsContent, FeedDivider } from "../Style/scFeed";
import axios from "axios";

// Categories

export default function Feed({ user, setUser, toggleTheme }) {
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState(0);
    const [popupActive, setPopupActive] = useState(false);
    const [updateObj, setUpdateObj] = useState({});
    const [categories, setCategories] = useState([
        "meeting",
        "announcement",
        "event",
        "video",
    ]);

    useEffect(() => {
        console.log(posts);
    }, posts);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/v1/post/latest/0`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const data = response.data.data;
                const normalizedPosts = [...data];

                normalizedPosts.forEach((post) => {
                    if (post.likes.find((like) => like.owner.id === user.id))
                        post.likedByMe = true;
                    else post.likedByMe = false;

                    post.likeCount = post.likes.length;
                    post.commentCount = post.comments.length;
                });

                setPosts([...normalizedPosts]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    return (
        <>
            <PostPopup
                user={user}
                setUser={setUser}
                category={categories[active]}
                popupActive={popupActive}
                setPopupActive={setPopupActive}
                setPosts={setPosts}
                posts={posts}
                updateObj={updateObj}
                setCategory={setActive}
                setUpdateObj={setUpdateObj}
            />
            <Messages user={user} setUser={setUser} />
            <AppWrapper>
                <Navbar
                    user={user}
                    setUser={setUser}
                    toggleTheme={toggleTheme}
                />
                <JobsFinder />
                <FeedsContent>
                    <PostItem
                        user={user}
                        setUser={setUser}
                        categories={categories}
                        setActive={setActive}
                        active={active}
                        setPopupActive={setPopupActive}
                    />
                    <FeedDivider />
                    {posts.map((post) => (
                        <FeedItem
                            setUpdateObj={setUpdateObj}
                            setPopupActive={setPopupActive}
                            key={post.id}
                            post={post}
                            user={user}
                            setPosts={setPosts}
                            posts={posts}
                        />
                    ))}
                </FeedsContent>
            </AppWrapper>
        </>
    );
}
