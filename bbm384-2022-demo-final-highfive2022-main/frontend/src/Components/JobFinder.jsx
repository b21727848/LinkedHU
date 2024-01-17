import { useEffect } from "react";

// Styles
import {
    JobsWrapper,
    JobsHeading,
    JobWrapper,
    JobLogo,
    JobContent,
    JobName,
    JobTitle,
} from "../Style/scJobs";

// Images
import Company1 from "../Assets/company-0.png";
import Company2 from "../Assets/company-1.png";
import Company3 from "../Assets/company-2.png";
import Company4 from "../Assets/company-3.png";
import Company5 from "../Assets/company-4.png";
import Company6 from "../Assets/company-5.png";

const JOBS = [
    {
        logo: Company1,
        name: "LinkedHU",
        title: "Frontend Developer",
        city: "Ankara, TR",
        place: "Remote",
        type: "Full Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
        logo: Company2,
        name: "MyEma",
        title: "Frontend Developer",
        city: "İstanbul, TR",
        place: "Office",
        type: "Full Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
        logo: Company3,
        name: "Cb Comp",
        title: "Backend Developer",
        city: "İzmir, TR",
        place: "Remote",
        type: "Part Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
        logo: Company4,
        name: "Loui",
        title: "DevOps Engineer",
        city: "London, UK",
        place: "Remote",
        type: "Full Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
        logo: Company5,
        name: "Theia",
        title: "ML Specialist",
        city: "Berlin, DE",
        place: "Office",
        type: "Remote Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
        logo: Company6,
        name: "Fiona",
        title: "Software Engineer",
        city: "Ankara, TR",
        place: "Remote",
        type: "Full Time",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
];

const Job = ({ selectedJob, setSelectedJob, obj, logo, name, title }) => {
    return (
        <JobWrapper
            activeItem={selectedJob?.i === obj.i ? "true" : "false"}
            onClick={() => setSelectedJob({ ...obj })}
        >
            <JobLogo>
                <img src={logo} alt={name} />
            </JobLogo>
            <JobContent>
                <JobName>{name}</JobName>
                <JobTitle>{title}</JobTitle>
            </JobContent>
        </JobWrapper>
    );
};

export default function JobsFinder({ selectedJob, setSelectedJob }) {
    useEffect(() => {
        if (setSelectedJob) setSelectedJob({ ...JOBS[0], i: 0 });
    }, []);

    return (
        <JobsWrapper>
            <JobsHeading>Jobs 😎</JobsHeading>
            {JOBS.map((job, i) => (
                <Job
                    obj={{ ...job, i }}
                    logo={job.logo}
                    name={job.name}
                    title={job.title}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                />
            ))}
        </JobsWrapper>
    );
}
