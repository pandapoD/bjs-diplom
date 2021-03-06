"use strict"

const newUser = new UserForm();
newUser.loginFormCallback = data => ApiConnector.login(data, checkLogin);
function checkLogin(response) {
  if (response.success) {
    location.reload();
  } else {
    newUser.setLoginErrorMessage(response.error);
  }
}

newUser.registerFormCallback = data => ApiConnector.register(data, checkRegister);
function checkRegister (response) {
  if (response.success) {
    location.reload();
  } else {
    newUser.setRegisterErrorMessage(response.error);
  }
}