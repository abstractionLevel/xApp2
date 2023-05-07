const url = "http://192.168.1.5:8080";
const apiUser = "/api/users";
const auth = "/public/api/auth";

const Url = {
    fetchUser: url + apiUser,
    saveUser: url + apiUser,
    login: url + auth + "/authenticate",
    register: url + auth + "/register",
}
export default Url; 