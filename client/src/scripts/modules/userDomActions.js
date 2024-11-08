import axios from "axios";
import $ from "jquery";

export const userDomActions = (() => {
  const body = $("body");
  const server = "http://localhost:3000";

  const renderLoginPage = () => {
    const loginContainer = $("<div>", {
      class: "container d-flex justify-content-center align-items-center",
      css: {
        height: "100vh",
        backgroundColor: "#f8f9fa",
      },
    });
    const loginForm = $("<form>", {
      class: "p-4 border rounded shadow-sm bg-white",
      css: {
        width: "100%",
        maxWidth: "400px",
      },
    });
    const formTitle = $("<h2>", {
      text: "Login",
      class: "text-center mb-4",
    });
    const emailGroup = $("<div>", { class: "mb-3" });
    const emailLabel = $("<label>", {
      for: "email",
      text: "Email",
      class: "form-label",
    });
    const emailInput = $("<input>", {
      type: "email",
      id: "email",
      autocomplete: "on",
      class: "form-control",
      placeholder: "Enter your email",
      required: true,
    });

    emailGroup.append(emailLabel, emailInput);
    const passwordGroup = $("<div>", { class: "mb-3" });
    const passwordLabel = $("<label>", {
      for: "password",
      text: "Password",
      class: "form-label",
    });
    const passwordInput = $("<input>", {
      type: "password",
      id: "password",
      class: "form-control",
      placeholder: "Enter your password",
      required: true,
    });

    passwordGroup.append(passwordLabel, passwordInput);

    const submitButton = $("<button>", {
      type: "submit",
      text: "Login",
      class: "btn btn-primary w-100 mt-3",
      css: {
        fontSize: "16px",
      },
    });
    const dontHaveAccountContainer = $("<div>", {
      text: "Don't have an account? ",
      css: {
        fontSize: "16px",
      },
    });
    const dontHaveAccount = $("<a>", {
      href: "/signup",
      text: "Signup",
      class: "mt-3",
      css: {
        fontSize: "16px",
      },
    });
    const errorContainer = $("<p>", {
      class: "text-danger mt-2",
    });
    dontHaveAccountContainer.append(dontHaveAccount);
    loginForm.append(
      formTitle,
      emailGroup,
      passwordGroup,
      dontHaveAccountContainer,
      submitButton,
      errorContainer
    );
    loginContainer.append(loginForm);
    body.append(loginContainer);

    // login handler
    loginForm.on("submit", async function (event) {
      event.preventDefault(); // Prevent reload
      const email = emailInput.val();
      const password = passwordInput.val();

      try {
        loginForm.css({
          opacity: 0.6,
          pointerEvents: "none",
        });
        submitButton.text("Please Wait...");
        const response = await axios.post(`${server}/user/`, {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.data.success) {
          console.log(response.data.message);
          localStorage.setItem("token", response.data.user.token);
          window.location.href = "/";
        } else {
          errorContainer.text(response.data.message);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          errorContainer.text(error.response.data.message);
        } else {
          errorContainer.text(error.message);
        }
      } finally {
        loginForm.css({
          opacity: 1,
          pointerEvents: "all",
        });
        submitButton.text("Login");
      }
    });
  };

  const renderSignupPage = () => {
    const signupContainer = $("<div>", {
      class: "container d-flex justify-content-center align-items-center",
      css: {
        height: "100vh",
        backgroundColor: "#f8f9fa",
      },
    });
    const signupForm = $("<form>", {
      class: "p-4 border rounded shadow-sm bg-white",
      css: {
        width: "100%",
        maxWidth: "400px",
      },
    });
    const formTitle = $("<h2>", {
      text: "Sign Up",
      class: "text-center mb-4",
    });
    const fullNameGroup = $("<div>", { class: "mb-3" });
    const fullNameLabel = $("<label>", {
      for: "fullName",
      text: "Full Name",
      class: "form-label",
    });
    const fullNameInput = $("<input>", {
      type: "text",
      id: "fullName",
      class: "form-control",
      placeholder: "Enter your full name",
      required: true,
    });

    fullNameGroup.append(fullNameLabel, fullNameInput);
    const emailGroup = $("<div>", { class: "mb-3" });
    const emailLabel = $("<label>", {
      for: "email",
      text: "Email",
      class: "form-label",
    });
    const emailInput = $("<input>", {
      type: "email",
      id: "email",
      autocomplete: "on",
      class: "form-control",
      placeholder: "Enter your email",
      required: true,
    });

    emailGroup.append(emailLabel, emailInput);
    const passwordGroup = $("<div>", { class: "mb-3" });
    const passwordLabel = $("<label>", {
      for: "password",
      text: "Password",
      class: "form-label",
    });
    const passwordInput = $("<input>", {
      type: "password",
      id: "password",
      class: "form-control",
      placeholder: "Enter your password",
      required: true,
    });

    passwordGroup.append(passwordLabel, passwordInput);
    const confirmPasswordGroup = $("<div>", { class: "mb-3" });
    const confirmPasswordLabel = $("<label>", {
      for: "confirmPassword",
      text: "Confirm Password",
      class: "form-label",
    });
    const confirmPasswordInput = $("<input>", {
      type: "password",
      id: "confirmPassword",
      class: "form-control",
      placeholder: "Confirm your password",
      required: true,
    });

    confirmPasswordGroup.append(confirmPasswordLabel, confirmPasswordInput);
    const submitButton = $("<button>", {
      type: "submit",
      text: "Sign Up",
      class: "btn btn-primary w-100 mt-3",
      css: {
        fontSize: "16px",
      },
    });
    const alreadyHaveAccountContainer = $("<div>", {
      text: "Already have account? ",
      css: {
        fontSize: "16px",
      },
    });
    const alreadyHaveAccount = $("<a>", {
      href: "/login",
      text: "Login",
      class: "mt-3",
      css: {
        fontSize: "16px",
      },
    });
    const errorContainer = $("<p>", {
      class: "text-danger mt-2",
    });
    alreadyHaveAccountContainer.append(alreadyHaveAccount);
    signupForm.append(
      formTitle,
      fullNameGroup,
      emailGroup,
      passwordGroup,
      confirmPasswordGroup,
      alreadyHaveAccountContainer,
      submitButton,
      errorContainer
    );
    signupContainer.append(signupForm);
    body.append(signupContainer);

    // register
    signupForm.on("submit", async function (event) {
      event.preventDefault(); // Prevent browser reload

      const fullName = fullNameInput.val();
      const email = emailInput.val();
      const password = passwordInput.val();
      const confirmPassword = confirmPasswordInput.val();
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      try {
        signupForm.css({
          opacity: 0.6,
          pointerEvents: "none",
        });
        submitButton.text("Please Wait...");
        const response = await axios.post(`${server}/user/register`, {
          email: email,
          name: fullName,
          password: password,
        });
        console.log(response);
        if (response.data.success) {
          console.log(response.data.message);
        } else {
          errorContainer.text(response.data.message);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          errorContainer.text(error.response.data.message);
        } else {
          errorContainer.text(error.message);
        }
      } finally {
        signupForm.css({
          opacity: 1,
          pointerEvents: "all",
        });
        submitButton.text("Sign Up");
      }
    });
  };

  const renderMyProfile = (user) => {
    // Create a container to hold the profile data
    const profileContainer = $("<div>", {
      class: "profile-container p-4 border rounded shadow-sm bg-white",
      css: {
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "'Arial', sans-serif",
      },
    });

    // Title
    const profileTitle = $("<h3>", {
      text: `${user.name}'s Profile`,
      class: "text-center text-primary mb-3",
    });

    // Profile Information
    const profileInfo = $("<div>", { class: "profile-info" });

    // Name
    const userName = $("<div>", {
      class: "user-name mb-2",
      html: `<strong>Name:</strong> ${user.name}`,
    });

    // Email
    const userEmail = $("<div>", {
      class: "user-email mb-2",
      html: `<strong>Email:</strong> ${user.email}`,
    });

    // Append the profile data to the profileContainer
    profileInfo.append(userName, userEmail);
    profileContainer.append(profileTitle, profileInfo);

    // Append the profile container to the body or a specific element
    body.append(profileContainer);
  };

  return {
    renderLoginPage,
    renderSignupPage,
    renderMyProfile,
    server,
  };
})();
