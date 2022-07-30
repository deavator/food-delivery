const auth = () => {

// ============== VARIABLES =================================

const loginBtn = document.querySelector(".button-auth");
const logoutBtn = document.querySelector(".button-out");
const userLogin = document.querySelector(".user-name");
const cartBtn = document.getElementById("cart-button");
const logInForm = document.getElementById("logInForm");
const closeAuthModalBtn = document.querySelector(".close-auth");
const authModal = document.querySelector(".modal-auth");

// ============== FUNCTIONS =================================

const openModalDialog = () => {
  authModal.style.display = "flex";
  
};

const closeModalDialog = () => {
  authModal.style.display = "none";
};
const login = (user) => {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "flex";
  userLogin.style.display = "flex";
  userLogin.textContent = user.login;
  cartBtn.style.display = 'flex';
  closeModalDialog();
};
const logout = () => {
  loginBtn.style.display = "flex";
  logoutBtn.style.display = "none";
  cartBtn.style.display = "none";
  userLogin.style.display = "none";
  userLogin.textContent = "";
  cartBtn.style.display = 'none';
  localStorage.removeItem("user");
};

// ============== ON LOAD ==================================

if (localStorage.getItem("user")) {
  let user = JSON.parse(localStorage.getItem("user"));
  login(user);
}

// ============== LISTENERS =================================

loginBtn.addEventListener("click", openModalDialog);
logoutBtn.addEventListener("click", logout);

closeAuthModalBtn.addEventListener("click", closeModalDialog);

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputLogin = e.target.elements.login.value;
  const inputPassword = e.target.elements.password.value;

  if (inputPassword) {
    const user = {
      login: inputLogin,
      password: inputPassword,
    };

    localStorage.setItem("user", JSON.stringify(user));
    login(user);
  } else {
    alert("Необходимо ввести пароль!");
  }
});





};
auth();