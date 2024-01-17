import { useEffect } from "react";
// Styles
import {
    PostWrapper,
    PostHeader,
    PostInput,
    PostOptions,
    PostOption,
} from "../Style/scPost";
export default function PostItem({
    categories,
    active,
    setActive,
    user,
    setUser,
    setPopupActive,
}) {
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <PostWrapper>
                <PostHeader>
                    <img
                        style={{ borderRadius: "1.25rem" }}
                        src={user?.profilePic}
                        alt={user?.name}
                    />
                    <PostInput onClick={() => setPopupActive(true)}>
                        {user?.name}, tell us more about your{" "}
                        {categories[active]}
                    </PostInput>
                </PostHeader>
                <PostOptions>
                    {(user?.roles[0]?.name === "ADMIN" ||
                        user?.roles[0]?.name === "ACADEMICIAN" ||
                        user?.roles[0]?.name === "GRADUATE" ||
                        user?.roles[0]?.name === "STUDENT_REP") && (
                        <PostOption
                            activeItem={active === 0 ? "true" : "false"}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(0);
                            }}
                        >
                            {categories[0]}
                        </PostOption>
                    )}
                    <PostOption
                        activeItem={active === 1 ? "true" : "false"}
                        onClick={(e) => {
                            e.preventDefault();
                            setActive(1);
                        }}
                    >
                        {categories[1]}
                    </PostOption>
                    {(user?.roles[0]?.name === "ADMIN" ||
                        user?.roles[0]?.name === "ACADEMICIAN" ||
                        user?.roles[0]?.name === "GRADUATE") && (
                        <PostOption
                            activeItem={active === 2 ? "true" : "false"}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(2);
                            }}
                        >
                            {categories[2]}
                        </PostOption>
                    )}
                    {(user?.roles[0]?.name === "ACADEMICIAN" ||
                        user?.roles[0]?.name === "ADMIN") && (
                        <PostOption
                            activeItem={active === 3 ? "true" : "false"}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(3);
                            }}
                        >
                            {categories[3]}
                        </PostOption>
                    )}
                </PostOptions>
            </PostWrapper>
        </>
    );
}
