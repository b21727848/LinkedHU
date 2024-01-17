// Styles
import {
    JobDetailsWrapper,
    JobDetailsHeader,
    JobDetailsName,
    JobDetailsDivider,
    JobDetailsHeading,
    JobDetailsInfo,
    JobDetailsInfoItem,
    JobDetailsAboutHeading,
    JobDetailsAbout,
    JobDetailsButton,
} from "../Style/scJobDetails";

// Images
import Map from "../Assets/map.png";
import { LocationIcon, TimeIcon, BriefcaseIcon } from "../Assets/Images";

export default function JobDetails({ selectedJob }) {
    return (
        <JobDetailsWrapper>
            {selectedJob && (
                <>
                    <JobDetailsHeader>
                        <img
                            src={selectedJob.logo}
                            alt=""
                            className="job-logo"
                        />
                        <JobDetailsName>{selectedJob.name}</JobDetailsName>
                    </JobDetailsHeader>
                    <JobDetailsDivider />
                    <JobDetailsHeading>{selectedJob.title}</JobDetailsHeading>
                    <JobDetailsInfo>
                        <JobDetailsInfoItem>
                            <LocationIcon /> {selectedJob.city}
                        </JobDetailsInfoItem>
                        <JobDetailsInfoItem>
                            <TimeIcon /> {selectedJob.place}
                        </JobDetailsInfoItem>
                        <JobDetailsInfoItem>
                            <BriefcaseIcon /> {selectedJob.type}
                        </JobDetailsInfoItem>
                    </JobDetailsInfo>
                    <img src={Map} alt="" className="map" />
                    <JobDetailsAboutHeading>About Us</JobDetailsAboutHeading>
                    <JobDetailsAbout>{selectedJob.content}</JobDetailsAbout>
                    <JobDetailsButton>Apply</JobDetailsButton>
                </>
            )}
        </JobDetailsWrapper>
    );
}
