/// <reference path="core_restAPI.ts" />
/// <reference path="core_pubsub.ts" />

var gApp: core.App;
var gSite: rest.RESTRequest;
module core{

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

}