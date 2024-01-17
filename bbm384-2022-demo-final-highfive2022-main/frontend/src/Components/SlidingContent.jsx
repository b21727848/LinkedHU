import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import {
    PopupWrapper,
    PopupContainer,
    PopupHeading,
    PopupClose,
    PopupTextArea,
    PopupInput,
    PopupButton,
} from "../Style/scPostPopup";

import {
    LabelInput,
    Label,
    Input,
    Paragraph,
    MiddleHeading,
} from "../Style/scInput";

import Popup from "./Popup";

// Images
import { AuthCloseIcon } from "../Assets/Images";

export default function SlidingContent({ user, setUser, open, setOpen }) {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!open) {
            setError(false);
            setStatus("");
            setPassword("");
            setPasswordAgain("");
            setOpenPopup(false);
        }
    }, [open]);

    const changePassword = () => {
        if (
            !password ||
            password.length < 6 ||
            !passwordAgain ||
            passwordAgain.length < 6 ||
            password !== passwordAgain
        ) {
            setStatus("Passwords are incorrect");
            setError(true);
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .put(
                `http://localhost:8080/api/v1/user/changepassword`,
                { password },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                setError(false);
                setStatus("Password changed successfully!");
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
                setStatus("Error while changing password!");
            });
    };

    const disableAccount = () => {
        const token = localStorage.getItem("token");

        axios
            .put(
                `http://localhost:8080/api/v1/user/disable`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                localStorage.removeItem("token");
                setOpenPopup(false);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setOpenPopup(false);
                setStatus("Could not disable account.");
            });
    };

    return (
        <PopupWrapper isActive={open ? "true" : "false"}>
            <PopupClose
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                }}
            >
                <AuthCloseIcon />
            </PopupClose>
            <PopupContainer>
                <PopupHeading
                    style={{ fontSize: "3rem", marginBottom: "3rem" }}
                >
                    Settings 🧐
                </PopupHeading>
                <MiddleHeading style={{ marginBottom: "2rem" }}>
                    Change Password
                </MiddleHeading>
                <LabelInput>
                    <Label>New Password Again (*)</Label>
                    <Input
                        error={error && "true"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        differentColor="true"
                    />
                </LabelInput>
                <LabelInput>
                    <Label>New Password Again (*)</Label>
                    <Input
                        error={error && "true"}
                        type="password"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        differentColor="true"
                    />
                </LabelInput>
                {status && (
                    <Paragraph
                        style={{
                            position: "absolute",
                            left: "25rem",
                            bottom: "5rem",
                        }}
                    >
                        {status}
                    </Paragraph>
                )}
                <PopupButton
                    onClick={(e) => {
                        e.preventDefault();
                        changePassword();
                    }}
                    style={{ marginTop: "0" }}
                >
                    Change Password
                </PopupButton>
                <PopupButton
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenPopup(true);
                    }}
                    noColor="true"
                    style={{
                        position: "absolute",
                        top: "2rem",
                        right: "0",
                    }}
                >
                    Disable Account
                </PopupButton>
            </PopupContainer>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            padding: "5rem 0",
                            width: "100%",
                        }}
                    >
                        <MiddleHeading style={{ textAlign: "center" }}>
                            Disabling account
                        </MiddleHeading>
                        <Paragraph
                            style={{
                                textAlign: "center",
                                width: "85%",
                                margin: "2rem auto 0",
                            }}
                        >
                            Are you sure that you want to disable your account?
                            Remember, you can email admin@hacettepe.edu.tr and
                            re-enable your account
                        </Paragraph>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <PopupButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    disableAccount();
                                }}
                            >
                                Yes
                            </PopupButton>
                            <PopupButton
                                noColor="true"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenPopup(false);
                                }}
                            >
                                No
                            </PopupButton>
                        </div>
                    </div>
                </div>
            </Popup>
        </PopupWrapper>
    );
}
