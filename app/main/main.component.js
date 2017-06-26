"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var main_service_1 = require("./main.service");
var _ = require("lodash");
var dialogs = require("ui/dialogs");
var MainComponent = (function () {
    function MainComponent(mainService) {
        this.mainService = mainService;
        this.players = [];
        this.wonBet = false;
        this.numberOfPlayer = 2;
        this.roundsCounter = 1;
        this.winsCounter = 0;
        this.showResult = false;
    }
    /**
     * Init the component. References to inputs are set. Call to API to get players
     *
     */
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playersFrame = this._playersFrame.nativeElement;
        this.resetBtnFrame = this._resetBtnFrame.nativeElement;
        this.mainService.getPlayers().then(function () {
            _this.createPlayers();
        });
    };
    /**
     * Create players. Based on 2 players, but it might take any value at all.
     *
     */
    MainComponent.prototype.createPlayers = function () {
        this.showResult = false;
        this.players = [];
        for (var i = 0; i < this.numberOfPlayer; i++) {
            this.players.push(this.mainService.getPlayer(this.players));
        }
    };
    /**
     * Check Result. Get player user chose as winner, compare fppg value with rest of players. Set component properties wontBet and showResult according result.
     *
     * @param {Object} playerData Data for player tapped
     */
    MainComponent.prototype.checkResult = function (playerData) {
        if (typeof _.find(this.players, function (player) { return player.fppg > playerData.fppg; }) === "undefined") {
            this.wonBet = true;
            this.showResult = true;
            this.winsCounter += 1;
            if (this.winsCounter === 10) {
                this.showDialog({ title: "Woo hoo!!", body: "Well done. You did it. \n You want to play again! " });
            }
        }
        else {
            this.wonBet = false;
            this.showResult = true;
        }
        this.mainService.reportResult({ id: playerData.id, result: this.wonBet });
        if (typeof this.resetBtnFrame !== "undefined") {
            this.resetBtnFrame.animate({
                opacity: 1,
                duration: 500
            });
        }
    };
    /**
     * Reste game. Counters to 0 and reset players
     *
     */
    MainComponent.prototype.resetGame = function () {
        this.roundsCounter = 0;
        this.winsCounter = 0;
        this.resetPlayers();
    };
    /**
     * Reset players by fading out button, and create players after that. Reset counter.
     *
     */
    MainComponent.prototype.resetPlayers = function () {
        var _this = this;
        this.resetBtnFrame.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            _this.createPlayers();
            _this.roundsCounter += 1;
        });
    };
    /**
     * Get a boolean value which allow tapping on players to set a bet
     *
     * @return {Boolean}  True when bets are accepted, False when not
     */
    MainComponent.prototype.getOpenToBet = function () {
        return this.mainService.getOpenBet();
    };
    /**
     * Show dialog to user.
     *
     * @param {Object} message Object with two properties "title" and "body". A dialog is presented on screen with them
     * @return {}
     */
    MainComponent.prototype.showDialog = function (message) {
        var that = this;
        var options = {
            title: message.title,
            message: message.body,
            okButtonText: "Yes",
            cancelButtonText: "No",
        };
        dialogs.confirm(options).then(function (result) {
            if (result) {
                that.resetGame();
            }
        });
    };
    return MainComponent;
}());
__decorate([
    core_1.ViewChild("playersFrame"),
    __metadata("design:type", core_1.ElementRef)
], MainComponent.prototype, "_playersFrame", void 0);
__decorate([
    core_1.ViewChild("resetBtn"),
    __metadata("design:type", core_1.ElementRef)
], MainComponent.prototype, "_resetBtnFrame", void 0);
MainComponent = __decorate([
    core_1.Component({
        selector: "ns-items",
        moduleId: module.id,
        templateUrl: "./main.component.html",
        styleUrls: ["./main.component.css"]
    }),
    __metadata("design:paramtypes", [main_service_1.MainService])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUVuRywrQ0FBNkM7QUFJN0MsMEJBQTRCO0FBQzVCLG9DQUF1QztBQVV2QyxJQUFhLGFBQWE7SUFldEIsdUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBYjVDLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBSTVCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0Isa0JBQWEsR0FBVyxDQUFDLENBQUE7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsZUFBVSxHQUFZLEtBQUssQ0FBQztJQUtvQixDQUFDO0lBRWpEOzs7T0FHRztJQUNILGdDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUV2RCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FDOUI7WUFDSSxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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SUFDTCxvQkFBQztBQUFELENBQUMsQUE5SEQsSUE4SEM7QUFsSDhCO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzhCQUFnQixpQkFBVTtvREFBQztBQUM5QjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBaUIsaUJBQVU7cURBQUM7QUFiekMsYUFBYTtJQU56QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx1QkFBdUI7UUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDdEMsQ0FBQztxQ0FnQm1DLDBCQUFXO0dBZm5DLGFBQWEsQ0E4SHpCO0FBOUhZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgUXVlcnlMaXN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgTWFpblNlcnZpY2UgfSBmcm9tIFwiLi9tYWluLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBsYXllckNvbXBvbmVudCB9IGZyb20gXCIuL3BsYXllci9wbGF5ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuaW1wb3J0IHsgTWFpbkNvbmZpZyB9IGZyb20gXCIuLi9jb25maWcvbWFpbi5jb25maWdcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYWluLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL21haW4uY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNYWluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHBsYXllcnM6IEFycmF5PFBsYXllcj4gPSBbXTtcbiAgICBfcGxheWVyOiBQbGF5ZXJDb21wb25lbnQ7XG4gICAgcGxheWVyc0ZyYW1lOiBTdGFja0xheW91dDtcbiAgICByZXNldEJ0bkZyYW1lOiBTdGFja0xheW91dDtcbiAgICB3b25CZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBudW1iZXJPZlBsYXllcjogbnVtYmVyID0gMjtcbiAgICByb3VuZHNDb3VudGVyOiBudW1iZXIgPSAxXG4gICAgd2luc0NvdW50ZXI6IG51bWJlciA9IDA7XG4gICAgc2hvd1Jlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQFZpZXdDaGlsZChcInBsYXllcnNGcmFtZVwiKSBfcGxheWVyc0ZyYW1lOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJyZXNldEJ0blwiKSBfcmVzZXRCdG5GcmFtZTogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFpblNlcnZpY2U6IE1haW5TZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhlIGNvbXBvbmVudC4gUmVmZXJlbmNlcyB0byBpbnB1dHMgYXJlIHNldC4gQ2FsbCB0byBBUEkgdG8gZ2V0IHBsYXllcnNcbiAgICAgKiBcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzRnJhbWUgPSB0aGlzLl9wbGF5ZXJzRnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5yZXNldEJ0bkZyYW1lID0gdGhpcy5fcmVzZXRCdG5GcmFtZS5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMubWFpblNlcnZpY2UuZ2V0UGxheWVycygpLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgcGxheWVycy4gQmFzZWQgb24gMiBwbGF5ZXJzLCBidXQgaXQgbWlnaHQgdGFrZSBhbnkgdmFsdWUgYXQgYWxsLlxuICAgICAqIFxuICAgICAqL1xuICAgIGNyZWF0ZVBsYXllcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZQbGF5ZXI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnB1c2godGhpcy5tYWluU2VydmljZS5nZXRQbGF5ZXIodGhpcy5wbGF5ZXJzKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIFJlc3VsdC4gR2V0IHBsYXllciB1c2VyIGNob3NlIGFzIHdpbm5lciwgY29tcGFyZSBmcHBnIHZhbHVlIHdpdGggcmVzdCBvZiBwbGF5ZXJzLiBTZXQgY29tcG9uZW50IHByb3BlcnRpZXMgd29udEJldCBhbmQgc2hvd1Jlc3VsdCBhY2NvcmRpbmcgcmVzdWx0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwbGF5ZXJEYXRhIERhdGEgZm9yIHBsYXllciB0YXBwZWRcbiAgICAgKi9cbiAgICBjaGVja1Jlc3VsdChwbGF5ZXJEYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBfLmZpbmQodGhpcy5wbGF5ZXJzLCBmdW5jdGlvbihwbGF5ZXIpIHsgcmV0dXJuIHBsYXllci5mcHBnID4gcGxheWVyRGF0YS5mcHBnOyB9KSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy53b25CZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2luc0NvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLndpbnNDb3VudGVyID09PSAxMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RpYWxvZyh7IHRpdGxlOiBcIldvbyBob28hIVwiLCBib2R5OiBcIldlbGwgZG9uZS4gWW91IGRpZCBpdC4gXFxuIFlvdSB3YW50IHRvIHBsYXkgYWdhaW4hIFwiIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndvbkJldCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1haW5TZXJ2aWNlLnJlcG9ydFJlc3VsdCh7IGlkOiBwbGF5ZXJEYXRhLmlkLCByZXN1bHQ6IHRoaXMud29uQmV0IH0pXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNldEJ0bkZyYW1lICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0QnRuRnJhbWUuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzdGUgZ2FtZS4gQ291bnRlcnMgdG8gMCBhbmQgcmVzZXQgcGxheWVyc1xuICAgICAqICBcbiAgICAgKi9cbiAgICByZXNldEdhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm91bmRzQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMud2luc0NvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLnJlc2V0UGxheWVycygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgcGxheWVycyBieSBmYWRpbmcgb3V0IGJ1dHRvbiwgYW5kIGNyZWF0ZSBwbGF5ZXJzIGFmdGVyIHRoYXQuIFJlc2V0IGNvdW50ZXIuXG4gICAgICogIFxuICAgICAqL1xuICAgIHJlc2V0UGxheWVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNldEJ0bkZyYW1lLmFuaW1hdGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVycygpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91bmRzQ291bnRlciArPSAxO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBib29sZWFuIHZhbHVlIHdoaWNoIGFsbG93IHRhcHBpbmcgb24gcGxheWVycyB0byBzZXQgYSBiZXRcbiAgICAgKiAgICBcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgVHJ1ZSB3aGVuIGJldHMgYXJlIGFjY2VwdGVkLCBGYWxzZSB3aGVuIG5vdFxuICAgICAqL1xuICAgIGdldE9wZW5Ub0JldCgpOiBCb29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFpblNlcnZpY2UuZ2V0T3BlbkJldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgZGlhbG9nIHRvIHVzZXIuIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtZXNzYWdlIE9iamVjdCB3aXRoIHR3byBwcm9wZXJ0aWVzIFwidGl0bGVcIiBhbmQgXCJib2R5XCIuIEEgZGlhbG9nIGlzIHByZXNlbnRlZCBvbiBzY3JlZW4gd2l0aCB0aGVtIFxuICAgICAqIEByZXR1cm4ge30gIFxuICAgICAqL1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogYW55KSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogbWVzc2FnZS50aXRsZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UuYm9keSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcbiAgICAgICAgfTtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0OiBib29sZWFuKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhhdC5yZXNldEdhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19