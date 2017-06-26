"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var player_1 = require("../player");
var main_service_1 = require("../main.service");
var PlayerComponent = (function () {
    function PlayerComponent(mainService) {
        this.mainService = mainService;
        this.checkResult = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    /**
     * Init method for component
     * @return {}
     */
    PlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playerFrame = this._playerFrame.nativeElement;
        this.playerImage = this._playerImage.nativeElement;
        this.getPlayerImage(this.player.images.default.url);
        this.mainService.setOpenBet(true);
        this.subscriptions.push(main_service_1.MainService.result.subscribe(function (resultData) {
            if (typeof resultData.id !== "undefined") {
                if (resultData.result === true && _this.player.id === resultData.id) {
                    _this.playerFrame.borderColor = "#42f44b";
                }
                else if (resultData.result === false && _this.player.id === resultData.id) {
                    _this.playerFrame.borderColor = "#f44147";
                }
            }
        }));
        this.playerFrame.animate({
            opacity: 1,
            duration: 1000
        });
    };
    /**
     * Tap on player. If bets are accepted, check result is triggered.
     *
     * @return {Boolean} For testing purpose
     */
    PlayerComponent.prototype.onTapPlayer = function () {
        if (this.getOpenToBet()) {
            this.checkResult.emit({ id: this.player.id, fppg: this.player.fppg });
            this.mainService.setOpenBet(false);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Check whether bets are accepted
     *
     * @return {Boolean}  True when bets are accepted, false when not.
     */
    PlayerComponent.prototype.getOpenToBet = function () {
        return this.mainService.getOpenBet();
    };
    /**
     * Test to check if image for player is available online. It seems that some players dont return an image from provided url.
     *
     * @param {String}  urlImage URL for image player
     */
    PlayerComponent.prototype.getPlayerImage = function (urlImage) {
        var _this = this;
        this.subscriptions.push(this.mainService.getImagePlayer(urlImage).subscribe(function (response) {
            _this.playerImage.src = _this.player.images.default.url;
        }, function (error) {
            _this.playerImage.src = "res://profile-avatar";
        }));
    };
    /**
     * On destroy, unsuscribe of everything
     *
     */
    PlayerComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return PlayerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", player_1.Player)
], PlayerComponent.prototype, "player", void 0);
__decorate([
    core_1.ViewChild("playerFrame"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "_playerFrame", void 0);
__decorate([
    core_1.ViewChild("imagePlayer"),
    __metadata("design:type", core_1.ElementRef)
], PlayerComponent.prototype, "_playerImage", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PlayerComponent.prototype, "checkResult", void 0);
PlayerComponent = __decorate([
    core_1.Component({
        selector: "player",
        moduleId: module.id,
        templateUrl: "./player.component.html",
        styleUrls: ["./player.component.css"]
    }),
    __metadata("design:paramtypes", [main_service_1.MainService])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUg7QUFFakgsb0NBQW1DO0FBQ25DLGdEQUE4QztBQVU5QyxJQUFhLGVBQWU7SUFVeEIseUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGxDLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFHeEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBRUssQ0FBQztJQUVqRDs7O09BR0c7SUFDSCxrQ0FBUSxHQUFSO1FBQUEsaUJBd0JDO1FBdkJHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQywwQkFBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2hELFVBQUMsVUFBVTtZQUVQLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDakUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO2dCQUU3QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUE7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNWLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUNBQVcsR0FBWDtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0NBQVksR0FBWjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0NBQWMsR0FBZCxVQUFlLFFBQVE7UUFBdkIsaUJBV0M7UUFURyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQ3ZFLFVBQUMsUUFBUTtZQUNMLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFMUQsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLHNCQUFzQixDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUNMLENBQUE7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTVGRCxJQTRGQztBQTFGWTtJQUFSLFlBQUssRUFBRTs4QkFBUyxlQUFNOytDQUFDO0FBQ0U7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWUsaUJBQVU7cURBQUM7QUFDekI7SUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7OEJBQWUsaUJBQVU7cURBQUM7QUFDekM7SUFBVCxhQUFNLEVBQUU7O29EQUF1QztBQUx2QyxlQUFlO0lBTjNCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtRQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztLQUN4QyxDQUFDO3FDQVdtQywwQkFBVztHQVZuQyxlQUFlLENBNEYzQjtBQTVGWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi4vcGxheWVyXCI7XG5pbXBvcnQgeyBNYWluU2VydmljZSB9IGZyb20gXCIuLi9tYWluLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicGxheWVyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYXllci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9wbGF5ZXIuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBQbGF5ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcGxheWVyOiBQbGF5ZXI7XG4gICAgQFZpZXdDaGlsZChcInBsYXllckZyYW1lXCIpIF9wbGF5ZXJGcmFtZTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiaW1hZ2VQbGF5ZXJcIikgX3BsYXllckltYWdlOiBFbGVtZW50UmVmO1xuICAgIEBPdXRwdXQoKSBjaGVja1Jlc3VsdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHByaXZhdGUgcGxheWVyRnJhbWU6IFN0YWNrTGF5b3V0O1xuICAgIHByaXZhdGUgcGxheWVySW1hZ2U6IEltYWdlO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFpblNlcnZpY2U6IE1haW5TZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgbWV0aG9kIGZvciBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJuIHt9ICBcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJGcmFtZSA9IHRoaXMuX3BsYXllckZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMucGxheWVySW1hZ2UgPSB0aGlzLl9wbGF5ZXJJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmdldFBsYXllckltYWdlKHRoaXMucGxheWVyLmltYWdlcy5kZWZhdWx0LnVybCk7XG5cbiAgICAgICAgdGhpcy5tYWluU2VydmljZS5zZXRPcGVuQmV0KHRydWUpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKE1haW5TZXJ2aWNlLnJlc3VsdC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0RGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHREYXRhLmlkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHREYXRhLnJlc3VsdCA9PT0gdHJ1ZSAmJiB0aGlzLnBsYXllci5pZCA9PT0gcmVzdWx0RGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJGcmFtZS5ib3JkZXJDb2xvciA9IFwiIzQyZjQ0YlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RGF0YS5yZXN1bHQgPT09IGZhbHNlICYmIHRoaXMucGxheWVyLmlkID09PSByZXN1bHREYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllckZyYW1lLmJvcmRlckNvbG9yID0gXCIjZjQ0MTQ3XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIHRoaXMucGxheWVyRnJhbWUuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYXAgb24gcGxheWVyLiBJZiBiZXRzIGFyZSBhY2NlcHRlZCwgY2hlY2sgcmVzdWx0IGlzIHRyaWdnZXJlZC5cbiAgICAgKiAgIFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEZvciB0ZXN0aW5nIHB1cnBvc2UgIFxuICAgICAqL1xuICAgIG9uVGFwUGxheWVyKCk6IEJvb2xlYW4ge1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wZW5Ub0JldCgpKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrUmVzdWx0LmVtaXQoeyBpZDogdGhpcy5wbGF5ZXIuaWQsIGZwcGc6IHRoaXMucGxheWVyLmZwcGcgfSk7XG4gICAgICAgICAgICB0aGlzLm1haW5TZXJ2aWNlLnNldE9wZW5CZXQoZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIGJldHMgYXJlIGFjY2VwdGVkXG4gICAgICogICAgXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gIFRydWUgd2hlbiBiZXRzIGFyZSBhY2NlcHRlZCwgZmFsc2Ugd2hlbiBub3QuXG4gICAgICovXG4gICAgZ2V0T3BlblRvQmV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWluU2VydmljZS5nZXRPcGVuQmV0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCB0byBjaGVjayBpZiBpbWFnZSBmb3IgcGxheWVyIGlzIGF2YWlsYWJsZSBvbmxpbmUuIEl0IHNlZW1zIHRoYXQgc29tZSBwbGF5ZXJzIGRvbnQgcmV0dXJuIGFuIGltYWdlIGZyb20gcHJvdmlkZWQgdXJsLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgdXJsSW1hZ2UgVVJMIGZvciBpbWFnZSBwbGF5ZXIgIFxuICAgICAqL1xuICAgIGdldFBsYXllckltYWdlKHVybEltYWdlKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5tYWluU2VydmljZS5nZXRJbWFnZVBsYXllcih1cmxJbWFnZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJJbWFnZS5zcmMgPSB0aGlzLnBsYXllci5pbWFnZXMuZGVmYXVsdC51cmw7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckltYWdlLnNyYyA9IFwicmVzOi8vcHJvZmlsZS1hdmF0YXJcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95LCB1bnN1c2NyaWJlIG9mIGV2ZXJ5dGhpbmdcbiAgICAgKiAgXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufSJdfQ==