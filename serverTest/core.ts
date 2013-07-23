var gApp: core.App;
var gSite: rest.RESTRequest;
module core{

<<<<<<< HEAD
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
    
=======
    export class App{
        private _debug: Boolean;
        public PubSub: core.pubsub.PubSub;
        public site: rest.RESTRequest

        //constructor(w: Window, debug?: Boolean ) {
        constructor(site:rest.RESTRequest) {
            //if (debug == null) { debug = false };
            //this._debug = debug;
            this.PubSub = new core.pubsub.PubSub();
            this.site = site;
        } 
    }

    export class Logger {
        static log(message: string) {
            if (typeof window.console !== 'undefined') {
                window.console.log(message);
            }
        }
    }

>>>>>>> update of the we
}