import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Navbar from "../Components/Navbar";
import Messages from "../Components/Messages";

// Style
import { AppWrapper } from "../Style/scApp";
import {
    TopProfileWrapper,
    TopProfileContainer,
    TopProfileLeft,
    TopProfileName,
    TopProfileTag,
    TopProfileType,
    TopProfileCompany,
    ProfileDivider,
    ProfileWrapper,
    ProfileLeft,
    BioWrapper,
    BioHeading,
    BioText,
    RecentsWrapper,
    RecentsItem,
    DepartmentWrapper,
} from "../Style/scProfile";

import {
    InputGroup,
    Textarea,
    Button,
    InputTitle,
    EditButton,
    InputWrapper,
    LabelInput,
    Label,
    Input,
    UploadableWrapper,
    UploadableBackground,
} from "../Style/scInput";

// Images
import Bg from "../Assets/background.png";
import NotFoundPP from "../Assets/pp-not-found.svg";
import NotFoundCover from "../Assets/cover-not-found.svg";

import {
    RecentApplications,
    RecentPosts,
    EditIcon,
    HULogo,
} from "../Assets/Images";

import Popup from "../Components/Popup";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = ({ setUser, user, openPopup, setOpenPopup }) => {
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        setName(user?.name);
        setTitle(user?.title);
        setCompany(user?.company);
        setError(false);
    }, [user, openPopup]);

    const updateDetails = () => {
        if (!name || !title) {
            setError(true);
            return;
        }

        axios
            .put(
                "http://localhost:8080/api/v1/user/update/details",
                { name, title, company },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                setUser((user) => {
                    return {
                        ...user,
                        name,
                        title,
                        company,
                    };
                });
                setError(false);
                setOpenPopup(false);
            })
            .catch((err) => {
                setError(true);
            });
    };

    return (
        <InputWrapper>
            <InputTitle>Update Details 😎</InputTitle>
            <LabelInput>
                <Label>Name (*)</Label>
                <Input
                    error={error ? "true" : "false"}
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(false);
                    }}
                />
            </LabelInput>
            <LabelInput>
                <Label>Title (*)</Label>
                <Input
                    error={error ? "true" : "false"}
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError(false);
                    }}
                />
            </LabelInput>
            <LabelInput>
                <Label>Company</Label>
                <Input
                    error={error ? "true" : "false"}
                    type="text"
                    value={company}
                    onChange={(e) => {
                        setCompany(e.target.value);
                        setError(false);
                    }}
                />
            </LabelInput>
            <Button
                style={{ marginTop: 0 }}
                onClick={(e) => {
                    e.preventDefault();
                    updateDetails();
                }}
            >
                Update
            </Button>
        </InputWrapper>
    );
};

const Uploadable = ({ me, children, setUser, user, field, name }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        axios
            .put(
                `http://localhost:8080/api/v1/user/update/${field}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                const newUser = { ...user };
                newUser[name] =
                    "data:image/png;base64," + response.data.data[name];
                setUser((user) => {
                    return {
                        ...newUser,
                    };
                });
                setSelectedFile(null);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedFile]);

    return (
        <UploadableWrapper>
            {me && (
                <UploadableBackground>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ opacity: 0, cursor: "pointer" }}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </UploadableBackground>
            )}
            {children}
        </UploadableWrapper>
    );
};

const TopProfile = ({ me, setUser, user }) => {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <TopProfileWrapper>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <EditProfile
                    me={me}
                    setUser={setUser}
                    user={user}
                    setOpenPopup={setOpenPopup}
                    openPopup={openPopup}
                />
            </Popup>
            <div className="user-bg">
                <Uploadable
                    me={me}
                    setUser={setUser}
                    user={user}
                    field="coverpic"
                    name="coverPic"
                >
                    <img src={user?.coverPic} alt={user?.name} />
                </Uploadable>
            </div>
            <div className="user-pp">
                <Uploadable
                    me={me}
                    setUser={setUser}
                    user={user}
                    field="profilepic"
                    name="profilePic"
                >
                    <img src={user?.profilePic} alt={user?.name} />
                </Uploadable>
            </div>
            <TopProfileContainer>
                {me && (
                    <EditButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenPopup(true);
                        }}
                    >
                        edit
                    </EditButton>
                )}
                <TopProfileLeft>
                    <div>
                        <TopProfileName>{user?.name}</TopProfileName>
                        <TopProfileTag>{user?.title}</TopProfileTag>
                    </div>
                    <TopProfileType>
                        {user?.roles[0].name.split("_").join(" ").toLowerCase()}
                    </TopProfileType>
                </TopProfileLeft>
                {user?.company && (
                    <TopProfileCompany>
                        <RecentApplications /> {user?.company}
                    </TopProfileCompany>
                )}
            </TopProfileContainer>
        </TopProfileWrapper>
    );
};

const Bio = ({ me, setUser, user }) => {
    const [error, setError] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(user?.aboutMe);
    }, [user]);

    const updateDescription = () => {
        if (!description) {
            setError(true);
            return;
        }

        axios
            .put(
                "http://localhost:8080/api/v1/user/update/aboutme",
                { text: description },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                setUser((user) => {
                    return {
                        ...user,
                        aboutMe: description,
                    };
                });
                setEditActive(false);
                setError(false);
            })
            .catch((err) => {
                setError(true);
            });
    };

    return (
        <BioWrapper>
            {me && (
                <a
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        setEditActive((editActive) => !editActive);
                    }}
                >
                    <EditIcon />
                </a>
            )}
            <BioHeading>Hello 👋</BioHeading>
            <InputGroup editActive={editActive && "true"}>
                <Textarea
                    error={error ? "true" : "false"}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder={user?.aboutMe}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setError(false);
                    }}
                />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        updateDescription();
                    }}
                >
                    Save
                </Button>
            </InputGroup>
            <BioText editActive={!editActive && "true"}>
                {user?.aboutMe}
            </BioText>
        </BioWrapper>
    );
};

const Recents = () => {
    return (
        <RecentsWrapper>
            <RecentsItem>
                <RecentPosts />
                Recent Posts
            </RecentsItem>
            <RecentsItem>
                <RecentApplications />
                Recent Applications
            </RecentsItem>
        </RecentsWrapper>
    );
};

const Department = ({ user }) => {
    return (
        <DepartmentWrapper>
            <RecentsItem style={{ cursor: "default" }}>
                <HULogo />
                Department:
                <span>{user?.department}</span>
            </RecentsItem>
        </DepartmentWrapper>
    );
};

export default function Profile({ user, setUser, toggleTheme }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [me, setMe] = useState(false);
    const [newUser, setNewUser] = useState(null);

    useEffect(() => {
        if (!user) {
            setMe(false);
            return;
        }

        if (user.id == id) setMe(true);
        else setMe(false);
    }, [user, newUser, id]);

    useEffect(() => {
        console.log("id changed!");
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/v1/user/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const user = response.data.data;

                setNewUser(user);
                setNewUser({
                    ...user,
                    profilePic: user.profilePic
                        ? "data:image/png;base64," + user.profilePic
                        : NotFoundPP,
                    coverPic: user.coverPic
                        ? "data:image/png;base64," + user.coverPic
                        : NotFoundCover,
                });
            })
            .catch((err) => {
                console.log(err);
                setNewUser(null);
                navigate("/user/feed");
            });
    }, [navigate, id]);

    return (
        <>
            <AppWrapper>
                <Messages user={user} setUser={setUser} />
                <Navbar
                    user={user}
                    setUser={setUser}
                    toggleTheme={toggleTheme}
                    me={me}
                />
                <TopProfile
                    user={me ? user : newUser}
                    setUser={me ? setUser : setNewUser}
                    me={me}
                />
                <ProfileDivider />
                <ProfileWrapper>
                    <ProfileLeft>
                        <Bio
                            user={me ? user : newUser}
                            setUser={me ? setUser : setNewUser}
                            me={me}
                        />
                        <Recents />
                        <Department user={me ? user : newUser} me={me} />
                    </ProfileLeft>
                </ProfileWrapper>
            </AppWrapper>
        </>
    );
}
