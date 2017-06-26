var reflect = require("reflect-metadata");
var component = require("../main/player/player.component");
var service = require("../main/main.service");
var http = require("@angular/http");


describe("Main service suite", function() {
    var PlayerInstance;
    var player1 = { id: 1, fppg: 1, images: { default: { url: "https://d17odppiik753x.cloudfront.net/playerimages/nba/20815.png" } } }; //Wrong image
    var player2 = { id: 2, fppg: 2, images: { default: { url: "https://d17odppiik753x.cloudfront.net/playerimages/nba/14503.png" } } }; //Good image

    beforeEach(function() {
        ServiceInstance = new service.MainService(http);
        PlayerInstance = new component.PlayerComponent(ServiceInstance);
    });

    it("On player tap", function() {
        PlayerInstance.player = player1;
        expect(PlayerInstance.onTapPlayer()).toBe(true);
        ServiceInstance.setOpenBet(false);
        expect(PlayerInstance.onTapPlayer()).toBe(false);
    });

});