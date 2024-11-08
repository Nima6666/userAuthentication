import { domActions } from "./modules/domActions";
import { userDomActions } from "./modules/userDomActions";
import axios from "axios";

const location = window.location.pathname;

(async () => {
  const token = localStorage.getItem("token");
  let user;

  const getUserByToken = async () => {
    try {
      const response = await axios.get(
        `${userDomActions.server}/user/getUserByToken`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        user = response.data.user;
        console.log("loggedIn");
        return user;
      }
    } catch (error) {
      console.log("Token Expired", error);
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  if (token) {
    user = await getUserByToken();
  }

  if (user) {
    domActions.renderHeader(user);

    if (location == "/profile") {
      userDomActions.renderMyProfile(user);
    } else if (location == "/") {
      userDomActions.renderUsers(token);
    } else if (location == "/changepassword") {
      userDomActions.renderChangePasswordPage(token);
    } else {
      window.location.href = "/";
    }
  } else {
    domActions.renderHeader();

    if (location == "/") {
      domActions.renderHomepage();
    } else if (location === "/login") {
      userDomActions.renderLoginPage();
    } else if (location === "/signup") {
      userDomActions.renderSignupPage();
    } else {
      window.location.href = "/";
    }
  }
})();
