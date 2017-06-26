import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, QueryList } from "@angular/core";
import { Player } from "./player";
import { MainService } from "./main.service";
import { PlayerComponent } from "./player/player.component";
import { StackLayout } from "ui/layouts/stack-layout";
import { Button } from "ui/button";
import * as _ from "lodash";
import dialogs = require("ui/dialogs");
import { MainConfig } from "../config/main.config";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {

    players: Array<Player> = [];
    _player: PlayerComponent;
    playersFrame: StackLayout;
    resetBtnFrame: StackLayout;
    wonBet: boolean = false;
    numberOfPlayer: number = 2;
    roundsCounter: number = 1;
    winsCounter: number = 0;
    showResult: boolean = false;

    @ViewChild("playersFrame") _playersFrame: ElementRef;
    @ViewChild("resetBtn") _resetBtnFrame: ElementRef;

    constructor(private mainService: MainService) { }

    /**
     * Init the component. References to inputs are set. Call to API to get players
     * 
     */
    ngOnInit(): void {
        this.playersFrame = this._playersFrame.nativeElement;
        this.resetBtnFrame = this._resetBtnFrame.nativeElement;

        this.mainService.getPlayers().then(
            () => {
                this.createPlayers();
            }
        );
    }

    /**
     * Create players. Based on 2 players, but it might take any value at all.
     * 
     */
    createPlayers(): void {
        this.showResult = false;
        this.players = [];

        for (let i = 0; i < this.numberOfPlayer; i++) {
            this.players.push(this.mainService.getPlayer(this.players));
        }
    }

    /**
     * Check Result. Get player user chose as winner, compare fppg value with rest of players. Set component properties wontBet and showResult according result.
     * 
     * @param {Object} playerData Data for player tapped
     */
    checkResult(playerData: any): void {
        if (typeof _.find(this.players, function(player) { return player.fppg > playerData.fppg; }) === "undefined") {
            this.wonBet = true;
            this.showResult = true;
            this.winsCounter += 1;
            if (this.winsCounter === 10) {
                this.showDialog({ title: "Woo hoo!!", body: "Well done. You did it. \n You want to play again!" });
            }
        } else {
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
    }

    /**
     * Reste game. Counters to 0 and reset players
     *  
     */
    resetGame(): void {
        this.roundsCounter = 0;
        this.winsCounter = 0;
        this.resetPlayers();
    }

    /**
     * Reset players by fading out button, and create players after that. Reset counter.
     *  
     */
    resetPlayers(): void {
        this.resetBtnFrame.animate({
            opacity: 0,
            duration: 500
        }).then(
            () => {

                this.createPlayers();
                this.roundsCounter += 1;
            });
    }

    /**
     * Get a boolean value which allow tapping on players to set a bet
     *    
     * @return {Boolean}  True when bets are accepted, False when not
     */
    getOpenToBet(): Boolean {
        return this.mainService.getOpenBet();
    }

    /**
     * Show dialog to user. 
     * 
     * @param {Object} message Object with two properties "title" and "body". A dialog is presented on screen with them 
     * @return {}  
     */
    showDialog(message: any) {
        let that = this;
        let options = {
            title: message.title,
            message: message.body,
            okButtonText: "Yes",
            cancelButtonText: "No",
        };
        dialogs.confirm(options).then(function(result: boolean) {
            if (result) {
                that.resetGame();
            }
        });
    }
}
