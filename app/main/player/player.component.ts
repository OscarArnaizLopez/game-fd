import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
import { Player } from "../player";
import { MainService } from "../main.service";
import { Subscription } from "rxjs/Subscription";
import { Image } from "ui/image";

@Component({
    selector: "player",
    moduleId: module.id,
    templateUrl: "./player.component.html",
    styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {

    @Input() player: Player;
    @ViewChild("playerFrame") _playerFrame: ElementRef;
    @ViewChild("imagePlayer") _playerImage: ElementRef;
    @Output() checkResult = new EventEmitter<any>();
    private playerFrame: StackLayout;
    private playerImage: Image;
    private subscriptions: Subscription[] = [];

    constructor(private mainService: MainService) { }

    /**
     * Init method for component
     * @return {}  
     */
    ngOnInit(): void {
        this.playerFrame = this._playerFrame.nativeElement;
        this.playerImage = this._playerImage.nativeElement;
        this.getPlayerImage(this.player.images.default.url);

        this.mainService.setOpenBet(true);

        this.subscriptions.push(MainService.result.subscribe(
            (resultData) => {

                if (typeof resultData.id !== "undefined") {
                    if (resultData.result === true && this.player.id === resultData.id) {
                        this.playerFrame.borderColor = "#42f44b";

                    } else if (resultData.result === false && this.player.id === resultData.id) {
                        this.playerFrame.borderColor = "#f44147";
                    }
                }
            })
        );
        this.playerFrame.animate({
            opacity: 1,
            duration: 1000
        });
    }

    /**
     * Tap on player. If bets are accepted, check result is triggered.
     *   
     * @return {Boolean} For testing purpose  
     */
    onTapPlayer(): Boolean {

        if (this.getOpenToBet()) {
            this.checkResult.emit({ id: this.player.id, fppg: this.player.fppg });
            this.mainService.setOpenBet(false);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check whether bets are accepted
     *    
     * @return {Boolean}  True when bets are accepted, false when not.
     */
    getOpenToBet() {
        return this.mainService.getOpenBet();
    }

    /**
     * Test to check if image for player is available online. It seems that some players dont return an image from provided url.
     * 
     * @param {String}  urlImage URL for image player  
     */
    getPlayerImage(urlImage): void {

        this.subscriptions.push(this.mainService.getImagePlayer(urlImage).subscribe(
            (response) => {
                this.playerImage.src = this.player.images.default.url;

            },
            (error) => {
                this.playerImage.src = "res://profile-avatar";
            })
        );
    }

    /**
     * On destroy, unsuscribe of everything
     *  
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}