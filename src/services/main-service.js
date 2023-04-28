"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainService = void 0;
var card_repository_1 = require("../repository/card/card-repository");
var user_repository_1 = require("../repository/user/user-repository");
var MainService = /** @class */ (function () {
    function MainService() {
        this.cardRepository = new card_repository_1.CardRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    MainService.prototype.register = function () {
        var _a;
        var users = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            users[_i] = arguments[_i];
        }
        (_a = this.userRepository).create.apply(_a, users);
    };
    MainService.prototype.registerCard = function () {
        var _a;
        var cards = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cards[_i] = arguments[_i];
        }
        (_a = this.cardRepository).create.apply(_a, cards);
    };
    MainService.prototype.getUserList = function () {
        return this.userRepository.getList();
    };
    MainService.prototype.getCardList = function () {
        return this.cardRepository.getList();
    };
    MainService.prototype.getCardByUserId = function (userId) {
        var userCards = [];
        for (var _i = 0, _a = this.cardRepository.getList(); _i < _a.length; _i++) {
            var card = _a[_i];
            var ownerId = card.getOwnerId();
            if (ownerId === userId) {
                userCards.push(card);
            }
        }
        return userCards;
    };
    MainService.prototype.transaction = function (fromCard, toCard, money) {
        var fromCardExists = false;
        var toCardExists = false;
        var fromCardIndex = -1;
        var toCardIndex = -1;
        for (var i = 0; i < this.cardRepository.getList().length; i++) {
            var card = this.cardRepository.getList()[i];
            // if(!card.getBlock()){
            if (card.getNumber() === fromCard) {
                fromCardExists = true;
                fromCardIndex = i;
            }
            if (card.getNumber() === toCard) {
                toCardExists = true;
                toCardIndex = i;
            }
            if (fromCardExists && toCardExists)
                break;
            // }
            // else throw new Error("Your card is blocked");
        }
        if (!fromCardExists || !toCardExists) {
            throw new Error('One or both cards do not exist');
        }
        var fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();
        if (fromCardBalance < money) {
            throw new Error("You have not enough money");
        }
        this.cardRepository.getList()[fromCardIndex].updatedBalance(-money);
        this.cardRepository.getList()[toCardIndex].updatedBalance(money);
        if (this.cardRepository.getList()[fromCardIndex].getBalance() === 0) {
            this.cardRepository.getList()[fromCardIndex].setBlock(true);
        }
        else
            this.cardRepository.getList()[fromCardIndex].setBlock(false);
    };
    MainService.prototype.isCardNumber = function (cardNumber) {
        for (var _i = 0, _a = this.cardRepository.getList(); _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getNumber() === cardNumber)
                return true;
        }
        return false;
    };
    MainService.prototype.getUserId = function (userId) {
        return this.cardRepository.getByID(1);
    };
    return MainService;
}());
exports.MainService = MainService;
