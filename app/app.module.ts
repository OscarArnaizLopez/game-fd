import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { PlayerComponent } from "./main/player/player.component";
import { MainService } from "./main/main.service";
import { MainComponent } from "./main/main.component";
import { NativeScriptHttpModule } from "nativescript-angular";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        PlayerComponent
    ],
    providers: [
        MainService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
