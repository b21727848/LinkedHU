import UserController from "./User.controller";
import PostModel, { POSTS } from "../models/Post.model";

export default class PostController {
    constructor() {
        this.userController = new UserController();
    }

    getPosts() {
        return POSTS;
    }

    addPost(setPosts, posts, email, content, link, likes, comments, shares) {
        if (!email || !content) throw new Error("Bad request");

        const id = Math.random().toString(16).slice(2);
        const post = new PostModel(
            id,
            email,
            content,
            link,
            likes,
            comments,
            shares
        );

        setPosts((posts) => [post.get(), ...posts]);
    }

    removePost(id) {
        const postIndex = POSTS.findIndex((post) => post.id === id);
        if (postIndex === -1) throw new Error("Can't find the post");
        POSTS.splice(postIndex, 1);
    }

    updatePost(id, email, content, link, likes, comments, shares) {
        const postIndex = POSTS.findIndex((post) => post.id === id);
        if (postIndex === -1) throw new Error("Can't find the post");
        POSTS[postIndex] = {
            id,
            email,
            content,
            link,
            likes,
            comments,
            shares,
        };
    }
}
