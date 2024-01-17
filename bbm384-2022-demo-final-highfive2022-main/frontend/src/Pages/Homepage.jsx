// Styles
import {
    HomepageWrapper,
    NavbarContainer,
    NavbarLogo,
    NavbarLink,
    MainWrapper,
    BigHeading,
    BigButton,
    ThemeSetter,
} from "../Style/scHomepage";

// Images
import {
    Logo,
    HomepageBottomDecoration,
    HomepageStarBackground,
    HomepageTopDecoration,
    HomepageScrollDown,
} from "../Assets/Images";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setOpenAuth }) => {
    return (
        <NavbarContainer>
            <NavbarLogo>
                <Logo />
                LinkedHU
            </NavbarLogo>
            <NavbarLink
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setOpenAuth(true);
                }}
            >
                sign in
            </NavbarLink>
        </NavbarContainer>
    );
};

const Main = ({ setOpenAuth }) => {
    return (
        <MainWrapper>
            <BigHeading>
                <span>HU Let's</span>
                <br />
                Collaborate.
            </BigHeading>
            <BigButton
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setOpenAuth(true);
                }}
            >
                Start Now!
            </BigButton>
        </MainWrapper>
    );
};

export default function Homepage({ user, setOpenAuth, theme, toggleTheme }) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user);
        if (!user) return;

        const role = user.roles[0].name;
        navigate("/user/feed");
    }, [user]);

    return (
        <HomepageWrapper>
            <ThemeSetter
                activeItem={theme === "light" ? "true" : "false"}
                onClick={toggleTheme}
            ></ThemeSetter>
            <Navbar setOpenAuth={setOpenAuth} />
            <Main setOpenAuth={setOpenAuth} />
            <HomepageStarBackground />
            <HomepageTopDecoration />
            <HomepageBottomDecoration />
            <HomepageScrollDown />
        </HomepageWrapper>
    );
}
