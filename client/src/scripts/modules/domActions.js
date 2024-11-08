import $ from "jquery";

export const domActions = (() => {
  const body = $("body");

  const renderHeader = (user) => {
    const header = $("<header>", {
      class: "container d-flex justify-content-between align-items-center py-2",
      css: { backgroundColor: "#cecece" },
    });
    const titleText = $("<div>", {
      class: "text-danger fw-bolder p-2",
      text: "Palm Mind Task",
      css: { fontSize: "20px", cursor: "pointer" },
    }).on("click", () => {
      window.location.href = "/";
    });

    const loginButton = $("<button>", {
      class: "btn btn-secondary px-4 py-2 rounded shadow-sm",
      text: "Login",
      css: {
        fontSize: "18px",
        color: "#fff",
        backgroundColor: "#6c757d",
        border: "none",
        cursor: "pointer",
      },
    })
      .on("mouseenter", function () {
        $(this).css("backgroundColor", "#5a6268");
      })
      .on("mouseleave", function () {
        $(this).css("backgroundColor", "#6c757d");
      })
      .on("click", () => {
        console.log("login");
        window.location.href = "/login";
      });

    header.append(titleText);
    if (user) {
      let modelOpen = false;
      const modelContainer = $("<div>", {
        class: "p-2 border",
        css: {
          position: "absolute",
          top: "120%",
          right: "30%",
          backgroundColor: "#cecece",
          borderRadius: "12px",
        },
      });
      const logoutButton = $("<button>", {
        class: "btn btn-secondary px-4 py-2 rounded shadow-sm mb-2",
        text: "Logout",
        css: {
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#ff5500",
          border: "none",
          cursor: "pointer",
          width: "100%",
        },
      }).on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
      const myProfile = $("<div>", {
        class: "px-4 py-2 rounded shadow-sm",
        text: "Profile",
        css: {
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#111111",
          border: "none",
          cursor: "pointer",
          width: "100%",
        },
      }).on("click", () => {
        window.location.href = "/profile";
      });
      modelContainer.append(logoutButton, myProfile);
      const userIcon = $("<div>", {
        text: user.name.slice()[0],
        class: "d-flex justify-content-center align-items-center fw-bold",
        css: {
          background: "#444444",
          color: "white",
          width: "40px",
          height: "40px",
          borderRadius: "100%",
          cursor: "pointer",
          fontSize: "20px",
          position: "relative",
        },
      }).on("click", () => {
        modelOpen = !modelOpen;
        if (modelOpen) {
          userIcon.append(modelContainer);
        } else {
          modelContainer.detach();
        }
      });
      header.append(userIcon);
    } else {
      header.append(loginButton);
    }
    body.append(header);
  };

  const renderHomepage = () => {
    const home = $("<div>", {
      class:
        "container d-flex flex-column justify-content-center align-items-center",
      text: "Palm Mind Task",
      css: {
        height: "100vh",
        fontSize: "20px",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    });

    const signupBtn = $("<button>", {
      class: "btn btn-success px-4 py-2 rounded shadow-sm mt-2",
      text: "Register",
      css: {
        fontSize: "18px",
        color: "#fff",
        backgroundColor: "#28a745",
        border: "none",
        cursor: "pointer",
      },
    })
      .on("mouseenter", function () {
        $(this).css("backgroundColor", "#218838");
      })
      .on("mouseleave", function () {
        $(this).css("backgroundColor", "#28a745");
      })
      .on("click", function () {
        console.log("Sign Up button clicked");
        window.location.href = "/signup";
      });

    home.append(signupBtn);
    body.append(home);
  };

  return {
    renderHomepage,
    renderHeader,
  };
})();
