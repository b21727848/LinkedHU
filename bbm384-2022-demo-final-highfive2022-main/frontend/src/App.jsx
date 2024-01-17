import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// Styles
import { GlobalStyles } from "./Style/scApp";
import { lightTheme, darkTheme } from "./Style/scThemes";

// Pages
import Auth from "./Pages/Auth";
import Jobs from "./Pages/Jobs";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Homepage from "./Pages/Homepage";

// Images
import NotFoundPP from "./Assets/pp-not-found.svg";
import NotFoundCover from "./Assets/cover-not-found.svg";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openAuth, setOpenAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log("here!");

        if (!token) {
            setUser(null);
            return;
        }

        axios
            .get("http://localhost:8080/api/v1/user", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const user = response.data.data;
                const role = user.roles[0].name;

                setUser({
                    ...user,
                    profilePic: user.profilePic
                        ? "data:image/png;base64," + user.profilePic
                        : NotFoundPP,
                    coverPic: user.coverPic
                        ? "data:image/png;base64," + user.coverPic
                        : NotFoundCover,
                });

                if (role !== "ADMIN" && location.pathname.startsWith("/admin"))
                    navigate("/user/feed");
            })
            .catch(() => {
                setUser(null);
                navigate("/");
            });
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Auth
                theme={theme}
                openAuth={openAuth}
                setOpenAuth={setOpenAuth}
                user={user}
                setUser={setUser}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Homepage
                            user={user}
                            setOpenAuth={setOpenAuth}
                            toggleTheme={toggleTheme}
                            theme={theme}
                        />
                    }
                />
                <Route
                    path="/user/feed"
                    element={
                        <Feed
                            user={user}
                            setUser={setUser}
                            toggleTheme={toggleTheme}
                        />
                    }
                />
                <Route
                    path="/user/jobs"
                    element={
                        <Jobs
                            user={user}
                            setUser={setUser}
                            toggleTheme={toggleTheme}
                        />
                    }
                />
                <Route
                    path="/user/profile/:id"
                    element={
                        <Profile
                            user={user}
                            setUser={setUser}
                            toggleTheme={toggleTheme}
                        />
                    }
                />
            </Routes>
        </ThemeProvider>
    );
}
