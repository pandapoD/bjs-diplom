"use strict"

const logOutBtn = new LogoutButton();
logOutBtn.action = data => ApiConnector.logout(logoutFunc);
function logoutFunc(response) {
	if (response.success) {
		location.reload();
	}
}

ApiConnector.current(getCurrentUser);
function getCurrentUser(response) {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
}

const tableRatesBoard = new RatesBoard();
tableRatesBoard.getCourses = () => {
	ApiConnector.getStocks(gettableRatesBoard)
}
function gettableRatesBoard(response) {
	if (response.success) {
		tableRatesBoard.clearTable();
		tableRatesBoard.fillTable(response.data);
	}
}
tableRatesBoard.getCourses();
setInterval(tableRatesBoard.getCourses, 60000);


const newMoneyManager = new MoneyManager();
newMoneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, addBalance);
function addBalance(response) {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		newMoneyManager.setMessage(response.data, response.error);
	}
}

newMoneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, convesionMoney);
function convesionMoney(response) {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		newMoneyManager.setMessage(response.data, response.error);
	}
}

newMoneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, sendMoney);
function sendMoney(response) {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		newMoneyManager.setMessage(response.data, response.error);
	}
}

const newFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(getListFavorites);
function getListFavorites (response) {
	if (response.success) {
		newFavoritesWidget.clearTable();
		newFavoritesWidget.fillTable(response.data);
		newMoneyManager.updateUsersList(response.data);
	}
}

newFavoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, requestAddUserToFavorites);
function requestAddUserToFavorites (response) {
	if (response.success) {
		newFavoritesWidget.clearTable();
		newFavoritesWidget.fillTable(response.data);
		newMoneyManager.updateUsersList(response.data);
	} else {
		newFavoritesWidget.setMessage(response.data, response.error);
	}
}

newFavoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, requestremoveUserFromFavorites);
function requestremoveUserFromFavorites (response) {
	if (response.success) {
		newFavoritesWidget.clearTable();
		newFavoritesWidget.fillTable(response.data);
		newMoneyManager.updateUsersList(response.data);
	} else {
		newFavoritesWidget.setMessage(response.data, response.error);
	}
}