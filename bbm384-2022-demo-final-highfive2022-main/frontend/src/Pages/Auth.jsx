import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Images
import NotFoundPP from "../Assets/pp-not-found.svg";
import NotFoundCover from "../Assets/cover-not-found.svg";

// Styles
import {
    AuthWrapper,
    AuthLeft,
    AuthRight,
    AuthRightContainer,
    AuthClose,
    AuthLink,
    AuthSecondaryHeading,
    AuthPrimaryHeading,
    AuthForm,
    AuthInputGroup,
    AuthInput,
    AuthForgotPw,
    AuthButton,
    AuthRoleSelector,
    AuthRole,
} from "../Style/scAuth";

// Images
import {
    AuthImgLight,
    AuthImgDark,
    AuthCloseIcon,
    EmailIcon,
    PasswordIcon,
    RightArrowIcon,
} from "../Assets/Images";

const AuthMain = ({
    secondaryHeading,
    primaryHeading,
    buttonText,
    forgotPw,
    color,
    queue,
    callbackFn,
    error,
    email,
    setEmail,
    password,
    setPassword,
    type,
    setName,
    setTitle,
    setDepartment,
    setRole,
    name,
    title,
    role,
    department,
}) => {
    return (
        <>
            <AuthRightContainer queue={queue}>
                <AuthSecondaryHeading>{secondaryHeading}</AuthSecondaryHeading>
                <AuthPrimaryHeading>{primaryHeading}</AuthPrimaryHeading>
                <AuthForm>
                    <AuthInputGroup smallGroup={type === "signup" && "true"}>
                        <AuthInput
                            smallInput={type === "signup" && "true"}
                            type="email"
                            placeholder="email"
                            error={error ? "true" : "false"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <EmailIcon />
                    </AuthInputGroup>
                    <AuthInputGroup smallGroup={type === "signup" && "true"}>
                        <AuthInput
                            smallInput={type === "signup" && "true"}
                            type="password"
                            placeholder="password"
                            error={error ? "true" : "false"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordIcon />
                    </AuthInputGroup>
                    {type === "signup" && (
                        <>
                            <AuthInputGroup smallGroup="true" halfGroup="true">
                                <AuthInput
                                    smallInput="true"
                                    noIcon="true"
                                    type="text"
                                    placeholder="name"
                                    error={error ? "true" : "false"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <AuthInput
                                    smallInput="true"
                                    noIcon="true"
                                    type="text"
                                    placeholder="known for"
                                    error={error ? "true" : "false"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </AuthInputGroup>
                            <AuthInputGroup smallGroup="true">
                                <AuthInput
                                    smallInput="true"
                                    noIcon="true"
                                    type="text"
                                    placeholder="department"
                                    error={error ? "true" : "false"}
                                    value={department}
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                />
                            </AuthInputGroup>
                            <AuthRoleSelector>
                                <AuthRole
                                    activeRole={role === "STUDENT" && "true"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setRole("STUDENT");
                                    }}
                                >
                                    Student
                                </AuthRole>
                                <AuthRole
                                    activeRole={
                                        role === "ACADEMICIAN" && "true"
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setRole("ACADEMICIAN");
                                    }}
                                >
                                    Academician
                                </AuthRole>
                                <AuthRole
                                    activeRole={role === "GRADUATE" && "true"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setRole("GRADUATE");
                                    }}
                                >
                                    Graduate
                                </AuthRole>
                            </AuthRoleSelector>
                        </>
                    )}
                    {type === "login" && forgotPw && (
                        <AuthForgotPw href="#">forgot password?</AuthForgotPw>
                    )}
                    <AuthButton
                        href="#"
                        color={color}
                        onClick={() =>
                            type === "login"
                                ? callbackFn(email, password)
                                : callbackFn(
                                      email,
                                      password,
                                      name,
                                      department,
                                      title,
                                      role
                                  )
                        }
                    >
                        {buttonText}
                        <RightArrowIcon />
                    </AuthButton>
                </AuthForm>
            </AuthRightContainer>
        </>
    );
};

export default function Auth({ user, setUser, theme, openAuth, setOpenAuth }) {
    const navigate = useNavigate();
    const [state, setState] = useState("login");
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("STUDENT");

    useEffect(() => {
        if (!openAuth) reset();
    }, [openAuth]);

    useEffect(() => {
        if (!email || !password) setError(false);
    }, [email, password]);

    const login = (email, password) => {
        if (!validateEmail(email) && !validatePassword(password)) {
            setError(true);
            return;
        }

        axios
            .post(
                "http://localhost:8080/api/v1/login",
                new URLSearchParams({
                    username: email, //gave the values directly for testing
                    password,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                localStorage.setItem(
                    "token",
                    `Bearer ${response.data.access_token}`
                );

                const token = localStorage.getItem("token");

                axios
                    .get("http://localhost:8080/api/v1/user", {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then((response) => {
                        const user = response.data.data;
                        const role = user.roles[0].name;

                        setUser(user);

                        setUser({
                            ...user,
                            profilePic: user.profilePic
                                ? "data:image/png;base64," + user.profilePic
                                : NotFoundPP,
                            coverPic: user.coverPic
                                ? "data:image/png;base64," + user.coverPic
                                : NotFoundCover,
                        });

                        setOpenAuth(false);
                        navigate("/user/feed");
                    })
                    .catch(() => {
                        setUser(null);
                        navigate("/");
                    });
            })
            .catch((error) => {
                setError(true);
            });
    };

    const signup = (email, password, name, department, title, role) => {
        if (
            !validateEmail(email) ||
            !validatePassword(password) ||
            !name ||
            !department ||
            !title ||
            !role
        ) {
            setError(true);
            return;
        }

        if (
            role !== "STUDENT" &&
            role !== "GRADUATE" &&
            role !== "ACADEMICIAN"
        ) {
            setError(true);
            return;
        }

        const userJSON = {
            username: email,
            password,
            name,
            department,
            title,
            role,
        };

        axios
            .post(
                "http://localhost:8080/api/v1/signup",
                JSON.stringify(userJSON),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                login(email, password);
                setError(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    };

    const validateEmail = (email) => {
        return (
            email &&
            String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        );
    };

    const validatePassword = (password) => {
        return password && password.length >= 6;
    };

    const reset = () => {
        setError(false);
        setEmail("");
        setPassword("");
        setTitle("");
        setName("");
        setDepartment("");
        setRole("STUDENT");
        setState("login");
    };

    return (
        <AuthWrapper open={openAuth ? "true" : "false"}>
            <AuthLeft>
                {theme === "light" && <AuthImgLight />}
                {theme === "dark" && <AuthImgDark />}
            </AuthLeft>
            <AuthRight>
                <AuthClose
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenAuth(false);
                    }}
                >
                    <AuthCloseIcon />
                </AuthClose>
                <AuthLink
                    href="#"
                    onClick={() => {
                        reset();
                        setState(state === "login" ? "sign up" : "login");
                    }}
                >
                    {state === "login" ? "sign up" : "login"}
                </AuthLink>
                <AuthMain
                    secondaryHeading="good to see you"
                    primaryHeading="Welcome 👋"
                    buttonText="Enter"
                    forgotPw={true}
                    color="blue"
                    queue={state === "login" ? 0 : -1}
                    callbackFn={login}
                    error={state === "login" && error}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    type="login"
                />
                <AuthMain
                    secondaryHeading=""
                    primaryHeading="Join Us 🥳"
                    buttonText="Signup"
                    color="purple"
                    queue={state === "sign up" ? 0 : 1}
                    error={state === "sign up" && error}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setName={setName}
                    setTitle={setTitle}
                    setRole={setRole}
                    setDepartment={setDepartment}
                    name={name}
                    title={title}
                    department={department}
                    role={role}
                    callbackFn={signup}
                    type="signup"
                />
            </AuthRight>
        </AuthWrapper>
    );
}
