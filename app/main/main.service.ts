import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Player } from "./player";
import dialogs = require("ui/dialogs");
import * as _ from "lodash";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { MainConfig } from "../config/main.config";

@Injectable()
export class MainService {

    private players: Array<Player>;
    private static _result$: BehaviorSubject<any> = new BehaviorSubject({});
    private static openBet: boolean = true;

    constructor(private http: Http) { }

    /**
     * Return a static BehaviourSubject as observable. This will be suscribed by players component and triggered from main component.
     * 
     * @return {BehaviorSubject}  
     */
    static get result() {
        return MainService._result$.asObservable();
    }

    /**
     * Return openBet property. Boolean to determine whether bets are accepted or not
     *  
     * @return {Boolean}  True when bets are accepted, False when not.
     */
    getOpenBet() {
        return MainService.openBet;
    }

    /**
     * Set openBet property value.
     * 
     * @param {Boolean} value  True when bets are accepted, False when not.  
     */
    setOpenBet(value: boolean): void {
        MainService.openBet = value;

    }

    /**
     * Call to backend to get array of players. Once data are retrieved, filter those which fppg is null. In case of error, ie: no internet connection, a pop up message is shown. 
     * @return {Promise}  
     */
    getPlayers(): Promise<any> {
        return new Promise((resolve) => {
            this.http.get(MainConfig.apiUrl).subscribe(
                (response: any) => {
                    if (typeof response._body !== "undefined" && typeof response._body.players !== "undefined" && response._body.players.length > 0) {
                        this.players = _.reject(response._body.players, { "fppg": null });
                        resolve();
                    }
                },

                error => {
                    dialogs.alert("Oppss! Something went wrong");
                }
            );
        });

    }

    /**
     * Return a player from array of players. 
     * 
     * @param {Array}   playersArray Array of exixting players, so this will return a different player of exixting on board. 
     * @return {Object}  An object with players properties. See Player class to see them
     */
    getPlayer(playersArray): Player {

        let player: Player;
        let playersArrayFiltered: Array<Player> = _.reject(this.players, function(player) {
            if (typeof _.find(playersArray, { "id": player.id, }) !== "undefined") {
                return true;
            }

        });
        player = playersArrayFiltered[Math.floor(Math.random() * playersArrayFiltered.length)];

        return player;
    }

    /**
     * Report changes to suscribed to result observable
     * 
     * @param {Object}    data A object with player properties  
     */
    reportResult(data): void {
        MainService._result$.next(data);
    }

    /**
     * Make a get call to url image to make sure it exist, needed since some players seems to don't get image at all.
     * 
     * @param {String}   urlImage URL with the image player 
     * @return {Promise}  Promise with the result of GET api call.
     */
    getImagePlayer(urlImage) {
        return this.http.get(urlImage);
    }
}
