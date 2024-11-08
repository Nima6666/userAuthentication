import axios from "axios";
import $ from "jquery";

export const userDomActions = (() => {
  const body = $("body");

  const errorContainer = $("<p>", {
    class: "text-danger mt-2",
  });
  const successContainer = $("<p>", {
    class: "text-success mt-2",
  });

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

    dontHaveAccountContainer.append(dontHaveAccount);
    loginForm.append(
      formTitle,
      emailGroup,
      passwordGroup,
      dontHaveAccountContainer,
      submitButton,
      errorContainer,
      successContainer
    );
    loginContainer.append(loginForm);
    body.append(loginContainer);

    // login handler
    loginForm.on("submit", async function (event) {
      event.preventDefault(); // Prevent reload
      const email = emailInput.val();
      const password = passwordInput.val();

      try {
        errorContainer.text("");
        loginForm.css({
          opacity: 0.6,
          pointerEvents: "none",
        });
        submitButton.text("Loggin In...");
        const response = await axios.post(`${server}/user/`, {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.data.success) {
          console.log(response.data.message);
          localStorage.setItem("token", response.data.user.token);
          loginForm.css({
            opacity: 1,
          });
          submitButton.text("redirecting to dashboard");
          successContainer.text(response.data.message);
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          errorContainer.text(response.data.message);
          loginForm.css({
            opacity: 1,
            pointerEvents: "all",
          });
          submitButton.text("Login");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          errorContainer.text(error.response.data.message);
        } else {
          errorContainer.text(error.message);
        }
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
    alreadyHaveAccountContainer.append(alreadyHaveAccount);
    signupForm.append(
      formTitle,
      fullNameGroup,
      emailGroup,
      passwordGroup,
      confirmPasswordGroup,
      alreadyHaveAccountContainer,
      submitButton,
      errorContainer,
      successContainer
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
        errorContainer.text("");
        submitButton.text("Please Wait...");
        const response = await axios.post(`${server}/user/register`, {
          email: email,
          name: fullName,
          password: password,
        });
        console.log(response);
        if (response.data.success) {
          successContainer.text(response.data.message);
          signupForm.css({
            opacity: 1,
          });
          submitButton.text("Redirecting to login page");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          errorContainer.text(response.data.message);
          signupForm.css({
            opacity: 1,
            pointerEvents: "all",
          });
          submitButton.text("Sign Up");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          errorContainer.text(error.response.data.message);
        } else {
          errorContainer.text(error.message);
        }
        signupForm.css({
          opacity: 1,
          pointerEvents: "all",
        });
        submitButton.text("Sign Up");
      }
    });
  };

  const renderMyProfile = (user) => {
    const profileContainer = $("<div>", {
      class: "profile-container p-4 border rounded shadow-sm bg-white my-5",
      css: {
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "'Arial', sans-serif",
      },
    });

    const profileTitle = $("<h3>", {
      text: `${user.name}'s Profile`,
      class: "text-center text-primary mb-3",
    });
    const profileInfo = $("<div>", { class: "profile-info" });

    const userName = $("<div>", {
      class: "user-name mb-2",
      html: `<strong>Name:</strong> ${user.name}`,
    });

    const userEmail = $("<div>", {
      class: "user-email mb-2",
      html: `<strong>Email:</strong> ${user.email}`,
    });

    const changePasswordButton = $("<button>", {
      text: "Change Password",
      class: "btn btn-primary w-100 mt-3",
      css: {
        fontSize: "16px",
      },
    }).on("click", () => {
      window.location.href = "/changepassword";
    });
    const deleteMyAccountButton = $("<button>", {
      text: "Delete My Account",
      class: "btn btn-danger w-100 mt-3",
      css: {
        fontSize: "16px",
      },
    }).on("click", async () => {
      console.log(user);
      try {
        deleteMyAccountButton.text("deleting...");
        deleteMyAccountButton.prop("disabled", true);
        const response = await axios.delete(`${server}/user`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response);
        if (response.data.success) {
          deleteMyAccountButton.text("logging you out");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          errorContainer.text(response.data.message);
          deleteMyAccountButton.prop("disabled", false);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          errorContainer.text(error.response.data.message);
        } else {
          errorContainer.text(error.message);
        }
        deleteMyAccountButton.prop("disabled", false);
      }
    });
    profileInfo.append(userName, userEmail);
    profileContainer.append(
      profileTitle,
      profileInfo,
      changePasswordButton,
      deleteMyAccountButton,
      errorContainer
    );

    body.append(profileContainer);
  };

  const renderUsers = async (token) => {
    let users;
    const tableContainer = $("<div>", {
      class: "container",
    });
    tableContainer.html(`
      
    <h2 class="text-center my-4">Registered Users</h2>
    <table id="userTable" class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">User Information</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> <span id="modalUserName"></span></p>
            <p><strong>Email:</strong> <span id="modalUserEmail"></span></p>
          </div>
        </div>
      </div>
    </div>`);
    body.append(tableContainer);
    try {
      const response = await axios.get(`${server}/user/`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      if (response.data.success) {
        users = response.data.users;
        const tableBody = $("#userTable tbody");
        tableBody.empty();

        users.forEach((user) => {
          // Create a row for each user
          const row = $("<tr>");
          row.append($("<td>").text(user.name));
          row.append($("<td>").text(user.email));

          // Create a button to view details in a modal
          const viewButton = $("<button>", {
            class: "btn btn-primary btn-sm",
            text: "View Details",
            click: function () {
              // Fill modal with user details
              $("#modalUserName").text(user.name);
              $("#modalUserEmail").text(user.email);

              // Show the modal
              const modal = new bootstrap.Modal(
                document.getElementById("userModal")
              );
              modal.show();
            },
          });

          // Append the button to the action cell and add it to the row
          const actionCell = $("<td>").append(viewButton);
          row.append(actionCell);
          tableBody.append(row);
        });
      } else {
        errorContainer.text(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderChangePasswordPage = (token) => {
    const submitButton = $("<button>", {
      type: "submit",
      class: "btn btn-primary w-100 mt-3",
      text: "Change Password",
    });
    const form = $("<form>", {
      class: "p-4 border rounded shadow-sm bg-white my-5",
      css: { maxWidth: "400px", margin: "0 auto" },
      submit: async (e) => {
        e.preventDefault();
        const currentPassword = $("#currentPassword").val();
        const newPassword = $("#newPassword").val();
        const confirmPassword = $("#confirmPassword").val();

        if (newPassword !== confirmPassword) {
          return errorContainer.text("password doesnt match");
        }

        try {
          errorContainer.text("");

          form.css({
            opacity: 0.6,
            pointerEvents: "none",
          });
          submitButton.text("Please Wait...");
          const response = await axios.post(
            `${server}/user/resetPassword`,
            {
              currentPassword,
              newPassword,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(response);
          if (response.data.success) {
            console.log(response.data.message);
            form.css({
              opacity: 1,
            });
            submitButton.text("redirecting to homepage...");
            successContainer.text(response.data.message);
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } else {
            form.css({
              opacity: 1,
              pointerEvents: "all",
            });
            errorContainer.text(response.data.message);
            submitButton.text("Change Password");
          }
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data.message) {
            errorContainer.text(error.response.data.message);
          } else {
            errorContainer.text(error.message);
          }
          form.css({
            opacity: 1,
            pointerEvents: "all",
          });
          submitButton.text("Change Password");
        }
      },
    });

    form.append(
      $("<h3>", { text: "Change Password", class: "mb-3 text-center" })
    );

    form.append(
      $("<div>", { class: "mb-3" }).append(
        $("<label>", {
          for: "currentPassword",
          class: "form-label",
          text: "Current Password",
        }),
        $("<input>", {
          type: "password",
          id: "currentPassword",
          class: "form-control",
          required: true,
        })
      )
    );

    form.append(
      $("<div>", { class: "mb-3" }).append(
        $("<label>", {
          for: "newPassword",
          class: "form-label",
          text: "New Password",
        }),
        $("<input>", {
          type: "password",
          id: "newPassword",
          class: "form-control",
          required: true,
        })
      )
    );

    form.append(
      $("<div>", { class: "mb-3" }).append(
        $("<label>", {
          for: "confirmPassword",
          class: "form-label",
          text: "Confirm New Password",
        }),
        $("<input>", {
          type: "password",
          id: "confirmPassword",
          class: "form-control",
          required: true,
        })
      )
    );

    form.append(submitButton, errorContainer, successContainer);

    body.append(form);
  };

  return {
    renderLoginPage,
    renderSignupPage,
    renderMyProfile,
    renderUsers,
    renderChangePasswordPage,
    server,
  };
})();
