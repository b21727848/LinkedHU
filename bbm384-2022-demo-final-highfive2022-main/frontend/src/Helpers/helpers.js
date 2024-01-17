import NotFoundPP from "../Assets/pp-not-found.svg";

export const getProfilePic = (user) => {
    return user?.profilePic
        ? "data:image/png;base64," + user.profilePic
        : NotFoundPP;
};

export const convertTimeDetailed = (timestamp) => {
    const a = new Date(timestamp);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const year = a.getFullYear();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = date + " " + month + " " + year + " " + hour + ":" + min;
    return time;
};

export const convertTime = (timestamp) => {
    if (!timestamp) return "1 Jan 2022";

    const a = new Date(timestamp);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[a.getMonth()];
    const date = a.getDate();
    return date + " " + month;
};
