import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Styles
import {
    NavbarWrapper,
    NavbarLeft,
    NavbarLogo,
    NavbarSearch,
    NavbarSearchInput,
    NavbarMenu,
    NavbarLink,
    NavbarProfile,
    Dropdown,
    DropdownItem,
} from "../Style/scNavbar";

import NotFoundPP from "../Assets/pp-not-found.svg";

// Images
import {
    Logo,
    SearchIcon,
    NotificationIcon,
    SettingsIcon,
    ProfileIcon,
    ThemeIcon,
    LogoutIcon,
} from "../Assets/Images";

import SlidingContent from "./SlidingContent";

const UserDropdown = ({ searchResult, setSearch, setSearchResult }) => {
    return (
        searchResult &&
        searchResult.length > 0 && (
            <Dropdown
                style={{
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
                        <Link
                            to={`/user/profile/${user.id}`}
                            style={{ textDecoration: "none" }}
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
                        </Link>
                    );
                })}
            </Dropdown>
        )
    );
};

const Search = () => {
    const [searchResult, setSearchResult] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search) {
            setSearchResult(null);
            return;
        }

        console.log(search);
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
                console.log(response.data.data.content);
                setSearchResult([...response.data.data.content]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [search]);

    return (
        <NavbarSearch>
            <SearchIcon />
            <NavbarSearchInput
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <UserDropdown
                setSearchResult={setSearchResult}
                setSearch={setSearch}
                searchResult={searchResult}
            />
        </NavbarSearch>
    );
};

export default function Navbar({ user, setUser, toggleTheme }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState(false);

    return (
        <NavbarWrapper>
            <SlidingContent open={settings} setOpen={setSettings} />
            <NavbarLeft>
                <NavbarLogo>
                    <Logo />
                    LinkedHU
                </NavbarLogo>
                <Search />
            </NavbarLeft>
            <NavbarMenu>
                <NavbarLink
                    to="/user/feed"
                    activeLink={
                        location.pathname === "/user/feed" ? "true" : "false"
                    }
                >
                    feed
                </NavbarLink>
                <NavbarLink
                    to="/user/jobs"
                    activeLink={
                        location.pathname === "/user/jobs" ? "true" : "false"
                    }
                >
                    jobs
                </NavbarLink>
                <NotificationIcon />
                <NavbarProfile onClick={() => setOpen((open) => !open)}>
                    <img
                        src={user?.profilePic}
                        alt=""
                        style={{ borderRadius: "1.25rem" }}
                    />
                    <Dropdown dropdownOpen={open ? "true" : "false"}>
                        <DropdownItem onClick={() => setSettings(true)}>
                            <SettingsIcon /> Settings
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => navigate("/user/profile/" + user.id)}
                        >
                            <ProfileIcon />
                            Profile
                        </DropdownItem>
                        <DropdownItem onClick={toggleTheme}>
                            <ThemeIcon />
                            Change Theme
                        </DropdownItem>
                        <DropdownItem
                            logout="true"
                            onClick={() => {
                                navigate("/");
                                setUser(null);
                                localStorage.removeItem("token");
                            }}
                        >
                            <LogoutIcon />
                            Logout
                        </DropdownItem>
                    </Dropdown>
                </NavbarProfile>
            </NavbarMenu>
        </NavbarWrapper>
    );
}
