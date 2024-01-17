export const POSTS = [
    {
        id: 2,
        email: "john@hacettepe.edu.tr",
        content:
            "I will be giving weekly lectures about Machine Learning!\n You can join on Every Monday at 9PM.",
        link: "https://zoom.us",
        likes: 10,
        comments: 13,
        shares: 3,
    },
    {
        id: 1,
        email: "brad@hacettepe.edu.tr",
        content:
            "I will be starting to teach Web Development this summer, stay tuned!\n",
        likes: 5,
        comments: 17,
        shares: 1,
    },
    {
        id: 0,
        email: "emma@hacettepe.edu.tr",
        content: "I am announcing that I have got a job at LinkedHU!\n",
        likes: 123,
        comments: 175,
        shares: 56,
    },
];

export default class PostModel {
    constructor(id, email, content, link, likes, comments, shares) {
        this.id = id;
        this.email = email;
        this.content = content;
        this.link = link;
        this.likes = likes;
        this.comments = comments;
        this.shares = shares;
    }

    get() {
        return {
            id: this.id,
            email: this.email,
            content: this.content,
            link: this.link,
            likes: this.likes,
            comments: this.comments,
            shares: this.shares,
        };
    }
}
