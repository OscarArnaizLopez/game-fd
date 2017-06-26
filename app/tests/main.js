var reflect = require("reflect-metadata");
var component = require("../main/main.component");
var service = require("../main/main.service");
var http = require("@angular/http");


describe("Main service suite", function() {
    var MainInstance;
    var player1 = { id: 1, fppg: 1, images: { default: { url: "https://d17odppiik753x.cloudfront.net/playerimages/nba/20815.png" } } }; //Wrong image
    var player2 = { id: 2, fppg: 2, images: { default: { url: "https://d17odppiik753x.cloudfront.net/playerimages/nba/14503.png" } } }; //Good image
    var player3 = { id: 3, fppg: 3, images: { default: { url: "https://d17odppiik753x.cloudfront.net/playerimages/nba/14503.png" } } }; //Good image

    beforeEach(function() {
        ServiceInstance = new service.MainService(http);
        MainInstance = new component.MainComponent(ServiceInstance);
    });

    it("Create default players", function() {
        MainInstance.createPlayers();
        expect(MainInstance.players.length).toBe(2);
    });

    it("Create 4 players", function() {
        MainInstance.numberOfPlayer = 4;
        MainInstance.createPlayers();
        expect(MainInstance.players.length).toBe(4);
    });

    it("CheckResult: expect to lose bet", function() {
        MainInstance.players = [player1, player2, player3];
        MainInstance.checkResult(player2);
        expect(MainInstance.wonBet).toBe(false);
    });

    it("CheckResult: expect to win bet", function() {
        MainInstance.players = [player1, player2, player3];
        MainInstance.checkResult(player3);
        expect(MainInstance.wonBet).toBe(true);
    });



});