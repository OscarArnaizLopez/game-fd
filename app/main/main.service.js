"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var dialogs = require("ui/dialogs");
var _ = require("lodash");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var main_config_1 = require("../config/main.config");
var MainService = MainService_1 = (function () {
    function MainService(http) {
        this.http = http;
    }
    Object.defineProperty(MainService, "result", {
        /**
         * Return a static BehaviourSubject as observable. This will be suscribed by players component and triggered from main component.
         *
         * @return {BehaviorSubject}
         */
        get: function () {
            return MainService_1._result$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return openBet property. Boolean to determine whether bets are accepted or not
     *
     * @return {Boolean}  True when bets are accepted, False when not.
     */
    MainService.prototype.getOpenBet = function () {
        return MainService_1.openBet;
    };
    /**
     * Set openBet property value.
     *
     * @param {Boolean} value  True when bets are accepted, False when not.
     */
    MainService.prototype.setOpenBet = function (value) {
        MainService_1.openBet = value;
    };
    /**
     * Call to backend to get array of players. Once data are retrieved, filter those which fppg is null. In case of error, ie: no internet connection, a pop up message is shown.
     * @return {Promise}
     */
    MainService.prototype.getPlayers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(main_config_1.MainConfig.apiUrl).subscribe(function (response) {
                if (typeof response._body !== "undefined" && typeof response._body.players !== "undefined" && response._body.players.length > 0) {
                    _this.players = _.reject(response._body.players, { 'fppg': null });
                    resolve();
                }
            }, function (error) {
                dialogs.alert("Oppss! Something went wrong");
            });
        });
    };
    /**
     * Return a player from array of players.
     *
     * @param {Array}   playersArray Array of exixting players, so this will return a different player of exixting on board.
     * @return {Object}  An object with players properties. See Player class to see them
     */
    MainService.prototype.getPlayer = function (playersArray) {
        var player;
        var playersArrayFiltered = _.reject(this.players, function (player) {
            if (typeof _.find(playersArray, { 'id': player.id, }) !== "undefined") {
                return true;
            }
        });
        player = playersArrayFiltered[Math.floor(Math.random() * playersArrayFiltered.length)];
        return player;
    };
    /**
     * Report changes to suscribed to result observable
     *
     * @param {Object}    data A object with player properties
     */
    MainService.prototype.reportResult = function (data) {
        MainService_1._result$.next(data);
    };
    /**
     * Make a get call to url image to make sure it exist, needed since some players seems to don't get image at all.
     *
     * @param {String}   urlImage URL with the image player
     * @return {Promise}  Promise with the result of GET api call.
     */
    MainService.prototype.getImagePlayer = function (urlImage) {
        return this.http.get(urlImage);
    };
    return MainService;
}());
MainService._result$ = new BehaviorSubject_1.BehaviorSubject({});
MainService.openBet = true;
MainService = MainService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MainService);
exports.MainService = MainService;
var MainService_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUE4QztBQUU5QyxvQ0FBdUM7QUFDdkMsMEJBQTRCO0FBQzVCLHdEQUF1RDtBQUV2RCxxREFBbUQ7QUFHbkQsSUFBYSxXQUFXO0lBTXBCLHFCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFPbkMsc0JBQVcscUJBQU07UUFMakI7Ozs7V0FJRzthQUNIO1lBQ0ksTUFBTSxDQUFDLGFBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFFRDs7OztPQUlHO0lBQ0gsZ0NBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyxhQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0NBQVUsR0FBVixVQUFXLEtBQWM7UUFDckIsYUFBVyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdDQUFVLEdBQVY7UUFBQSxpQkFnQkM7UUFmRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUN0QyxVQUFDLFFBQWE7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsS0FBSyxLQUFLLFdBQVcsSUFBSSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUgsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ2xFLE9BQU8sRUFBRSxDQUFBO2dCQUNiLENBQUM7WUFDTCxDQUFDLEVBRUQsVUFBQSxLQUFLO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsK0JBQVMsR0FBVCxVQUFVLFlBQVk7UUFFbEIsSUFBSSxNQUFjLENBQUM7UUFDbkIsSUFBSSxvQkFBb0IsR0FBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVMsTUFBTTtZQUM1RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFdkYsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsYUFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsb0NBQWMsR0FBZCxVQUFlLFFBQVE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFoR0QsSUFnR0M7QUE3RmtCLG9CQUFRLEdBQXlCLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN6RCxtQkFBTyxHQUFZLElBQUksQ0FBQztBQUo5QixXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBT2lCLFdBQUk7R0FOckIsV0FBVyxDQWdHdkI7QUFoR1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tIFwicnhqcy9CZWhhdmlvclN1YmplY3RcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBNYWluQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZy9tYWluLmNvbmZpZ1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFpblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwbGF5ZXJzOiBBcnJheTxQbGF5ZXI+O1xuICAgIHByaXZhdGUgc3RhdGljIF9yZXN1bHQkOiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHByaXZhdGUgc3RhdGljIG9wZW5CZXQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0YXRpYyBCZWhhdmlvdXJTdWJqZWN0IGFzIG9ic2VydmFibGUuIFRoaXMgd2lsbCBiZSBzdXNjcmliZWQgYnkgcGxheWVycyBjb21wb25lbnQgYW5kIHRyaWdnZXJlZCBmcm9tIG1haW4gY29tcG9uZW50LlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge0JlaGF2aW9yU3ViamVjdH0gIFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgcmVzdWx0KCkge1xuICAgICAgICByZXR1cm4gTWFpblNlcnZpY2UuX3Jlc3VsdCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIG9wZW5CZXQgcHJvcGVydHkuIEJvb2xlYW4gdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYmV0cyBhcmUgYWNjZXB0ZWQgb3Igbm90XG4gICAgICogIFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICBUcnVlIHdoZW4gYmV0cyBhcmUgYWNjZXB0ZWQsIEZhbHNlIHdoZW4gbm90LlxuICAgICAqL1xuICAgIGdldE9wZW5CZXQoKSB7XG4gICAgICAgIHJldHVybiBNYWluU2VydmljZS5vcGVuQmV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBvcGVuQmV0IHByb3BlcnR5IHZhbHVlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWUgIFRydWUgd2hlbiBiZXRzIGFyZSBhY2NlcHRlZCwgRmFsc2Ugd2hlbiBub3QuICBcbiAgICAgKi9cbiAgICBzZXRPcGVuQmV0KHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIE1haW5TZXJ2aWNlLm9wZW5CZXQgPSB2YWx1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdG8gYmFja2VuZCB0byBnZXQgYXJyYXkgb2YgcGxheWVycy4gT25jZSBkYXRhIGFyZSByZXRyaWV2ZWQsIGZpbHRlciB0aG9zZSB3aGljaCBmcHBnIGlzIG51bGwuIEluIGNhc2Ugb2YgZXJyb3IsIGllOiBubyBpbnRlcm5ldCBjb25uZWN0aW9uLCBhIHBvcCB1cCBtZXNzYWdlIGlzIHNob3duLiBcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgXG4gICAgICovXG4gICAgZ2V0UGxheWVycygpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5nZXQoTWFpbkNvbmZpZy5hcGlVcmwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLl9ib2R5ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByZXNwb25zZS5fYm9keS5wbGF5ZXJzICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3BvbnNlLl9ib2R5LnBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0gXy5yZWplY3QocmVzcG9uc2UuX2JvZHkucGxheWVycywgeyAnZnBwZyc6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJPcHBzcyEgU29tZXRoaW5nIHdlbnQgd3JvbmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHBsYXllciBmcm9tIGFycmF5IG9mIHBsYXllcnMuIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXl9ICAgcGxheWVyc0FycmF5IEFycmF5IG9mIGV4aXh0aW5nIHBsYXllcnMsIHNvIHRoaXMgd2lsbCByZXR1cm4gYSBkaWZmZXJlbnQgcGxheWVyIG9mIGV4aXh0aW5nIG9uIGJvYXJkLiBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICBBbiBvYmplY3Qgd2l0aCBwbGF5ZXJzIHByb3BlcnRpZXMuIFNlZSBQbGF5ZXIgY2xhc3MgdG8gc2VlIHRoZW1cbiAgICAgKi9cbiAgICBnZXRQbGF5ZXIocGxheWVyc0FycmF5KTogUGxheWVyIHtcblxuICAgICAgICBsZXQgcGxheWVyOiBQbGF5ZXI7XG4gICAgICAgIGxldCBwbGF5ZXJzQXJyYXlGaWx0ZXJlZDogQXJyYXk8UGxheWVyPiA9IF8ucmVqZWN0KHRoaXMucGxheWVycywgZnVuY3Rpb24ocGxheWVyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIF8uZmluZChwbGF5ZXJzQXJyYXksIHsgJ2lkJzogcGxheWVyLmlkLCB9KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICBwbGF5ZXIgPSBwbGF5ZXJzQXJyYXlGaWx0ZXJlZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXJzQXJyYXlGaWx0ZXJlZC5sZW5ndGgpXTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcG9ydCBjaGFuZ2VzIHRvIHN1c2NyaWJlZCB0byByZXN1bHQgb2JzZXJ2YWJsZVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICBkYXRhIEEgb2JqZWN0IHdpdGggcGxheWVyIHByb3BlcnRpZXMgIFxuICAgICAqL1xuICAgIHJlcG9ydFJlc3VsdChkYXRhKTogdm9pZCB7XG4gICAgICAgIE1haW5TZXJ2aWNlLl9yZXN1bHQkLm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIGdldCBjYWxsIHRvIHVybCBpbWFnZSB0byBtYWtlIHN1cmUgaXQgZXhpc3QsIG5lZWRlZCBzaW5jZSBzb21lIHBsYXllcnMgc2VlbXMgdG8gZG9uJ3QgZ2V0IGltYWdlIGF0IGFsbC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICB1cmxJbWFnZSBVUkwgd2l0aCB0aGUgaW1hZ2UgcGxheWVyIFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9ICBQcm9taXNlIHdpdGggdGhlIHJlc3VsdCBvZiBHRVQgYXBpIGNhbGwuXG4gICAgICovXG4gICAgZ2V0SW1hZ2VQbGF5ZXIodXJsSW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsSW1hZ2UpO1xuICAgIH1cbn1cbiJdfQ==