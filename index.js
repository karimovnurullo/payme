"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./src/entities/card/card");
var user_1 = require("./src/entities/user/user");
// import { CardRepository } from "./src/repository/card/card-repository";
// import { UserRepository } from "./src/repository/user/user-repository";
var main_service_1 = require("./src/services/main-service");
var mainService = new main_service_1.MainService();
var user1 = new user_1.User("Nurullo", "Karimov", "+998905640618", "root123");
var user2 = new user_1.User("Amirxon", "Abralov", "+99890444222", "12221ss");
mainService.register(user1, user2);
var card1 = new card_1.Card("8600000100020003", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
var card2 = new card_1.Card("8600000100020004", "12/25", "HUMO", 20000, user2.getId(), "NBU Bank");
var card3 = new card_1.Card("8600000100020005", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
mainService.registerCard(card1, card2, card3);
// console.log(mainService.getCardByUserId(card2.getId()));
// console.log("Users", mainService.getUserList());
try {
    mainService.transaction("8600000100020003", "8600000100020005", 10000);
    mainService.transaction("8600000100020005", "8600000100020003", 100);
    console.log("Cards", mainService.getCardList());
}
catch (error) {
    console.error(error.message);
}
// console.log("Users", userRepository.getList());
