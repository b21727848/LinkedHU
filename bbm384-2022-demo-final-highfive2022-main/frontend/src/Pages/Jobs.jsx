import { useState, useEffect } from "react";

// Controller
import UserController from "../Api/controllers/User.controller";

// Components
import Navbar from "../Components/Navbar";
import Messages from "../Components/Messages";
import JobsFinder from "../Components/JobFinder";
import JobDetails from "../Components/JobDetails";

// Style
import { AppWrapper } from "../Style/scApp";

export default function Jobs({ user, setUser, toggleTheme }) {
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        if (!user.email)
            setUser(
                new UserController().getUserByEmail("canberk@hacettepe.edu.tr")
            );
    }, []);

    return (
        <>
            <AppWrapper>
                <Messages user={user} setUser={setUser} />
                <Navbar
                    user={user}
                    setUser={setUser}
                    toggleTheme={toggleTheme}
                />
                <JobsFinder
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                />
                <JobDetails selectedJob={selectedJob} />
            </AppWrapper>
        </>
    );
}
