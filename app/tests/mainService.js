var reflect = require("reflect-metadata");
var component = require("../main/main.service");
var http = require("@angular/http");

describe("Main service suite", function() {
    var MainServiceInstance;

    beforeEach(function() {
        MainServiceInstance = new component.MainService(http);
    });

    it("Get/Set OpenBet methods", function() {
        expect(MainServiceInstance.getOpenBet()).toBe(true);
        MainServiceInstance.setOpenBet(false);
        expect(MainServiceInstance.getOpenBet()).toBe(false);
        MainServiceInstance.setOpenBet(true);
        expect(MainServiceInstance.getOpenBet()).toBe(true);
    });

    it("Get Players", function() {
        var playersArray = [{ name: "player1", id: 1 }];
        MainServiceInstance.players = [{ name: "player1", id: 1 }, { name: "player2", id: 2 }];
        let player2 = MainServiceInstance.getPlayer(playersArray);
        expect(player2.id).toBe(2);
    });

});