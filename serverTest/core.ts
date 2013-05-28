/// <reference path="core_pubsub.ts" />
module core{

    //export function setApp( w: Window, debug?:bool = false ) {
    //    app = new App( window, debug );

    //    window.onerror = function ( msg: string, url: string, line: number ) {
    //        app().log( eLogSeverity.critical, new Error( msg ) );
    //        if ( app().debug() ) {
    //            return false; //do alert
    //        } else {
    //            return true; //do not alert end user!
    //        }
    //    }
    //}
    export enum enumEntityStatus { success, failed }
    export interface IEntities{
        id:string;
    }
    
    export enum eLogSeverity{ critical, warning, information }

    export class App {
        public PubSub: core.pubsub.PubSub;

        constructor() {
            this.PubSub = new core.pubsub.PubSub();
        }
    }
    
}