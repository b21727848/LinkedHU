// Images
import PP1 from "../../Assets/pp-0.png";
import PP2 from "../../Assets/pp-1.png";
import PP3 from "../../Assets/pp-2.png";
import PP4 from "../../Assets/pp-3.png";
import PP5 from "../../Assets/pp-4.png";

export const USERS = [
    {
        email: "canberk@hacettepe.edu.tr",
        password: "123456",
        name: "Canberk Aslan",
        tag: "Founder @LinkedHU",
        pp: PP1,
    },
    {
        email: "john@hacettepe.edu.tr",
        password: "123456",
        name: "John Doe",
        tag: "Professor @Computer Science",
        pp: PP2,
    },
    {
        email: "mary@hacettepe.edu.tr",
        password: "123456",
        name: "Mary Doe",
        tag: "Professor @Physics",
        pp: PP3,
    },
    {
        email: "brad@hacettepe.edu.tr",
        password: "123456",
        name: "Brad Doe",
        tag: "Works @LinkedHU | Math",
        pp: PP4,
    },
    {
        email: "emma@hacettepe.edu.tr",
        password: "123456",
        name: "Emma Doe",
        tag: "AI Specialist",
        pp: PP5,
    },
];

class UserModel {
    constructor(id, email, password, name, tag, pp) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tag = tag;
        this.pp = pp;
    }
}
