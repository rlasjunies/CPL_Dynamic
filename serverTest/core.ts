/// <reference path="core_pubsub.ts" />
module core{
    

    export function app(): App{
        return _app;
    }

    export function setApp( w: Window, debug?:bool = false ) {
        _app = new App( window, debug );

        window.onerror = function ( msg: string, url: string, line: number ) {
            core.app().log( eLogSeverity.critical, new Error( msg ) );
            if ( _app.debug() ) {
                return false; //do alert
            } else {
                return true; //do not alert end user!
            }
        }
    }
                                                                       
    export class App {
        private _err: mtgError;
        private _debug: bool;
        public PubSub: core.pubsub.PubSub;
        
        constructor( w: Window, debug?: bool = false ) {
            this._debug = debug;
            this.PubSub = new core.pubsub.PubSub();
        }


        log( sev: core.eLogSeverity, err: Error ) {
            //TODO log to the server

            //TODO est-ce qu'il faut prévoir une alerte pour visualiser les erreurs non trappées?
            if ( this._debug ) {
                throw err;
            }
            

        }
        debug(): bool{
            return this._debug;
        }
    }

    export enum eCallbackSignatureStatus { ok, error };
    export enum eLogSeverity{ critical, warning, information }

    export class CallbackSignatureReturn{
        private _status: eCallbackSignatureStatus;
        private _value: any;
        private _error: Error;

        constructor( status: eCallbackSignatureStatus, value: any, error?:Error = null) {
            this._status = status;
            this._value = value;
            this._error = error;
        }
        status(): core.eCallbackSignatureStatus{
            return this._status;
        }
        value(): any{
            return this._value;
        }
        error(): Error{
            return this._error;
        }

    }

    export class ErrorParam{
        private _key: string;
        private _value: string;
        constructor( key, value ) {
            this._key = key;
            this._value = value;
        }
        key(): string{
            return this._key;
        }
        value(): string{
            return this._value;
        }
    }

    
    //TODO gestion des erreur ne semble pas bonne il doit y avoir des errors dans => s'appuyer sur la gestion des erreurs js
    export class mtgError {
        private _errornum: number;
        private _errorCoreString: string;
        private _errorParamList: ErrorParam[];

        constructor( errorNum: number, errorCoreString: string, errorParam?: ErrorParam[] = []) {
            this._errornum = errorNum;
            this._errorCoreString = errorCoreString;
            this._errorParamList = errorParam; 
        }



        errorNum(): number{
            return this._errornum;
        }

        errorCoreString(): string {
            var tmp: string
            tmp = "";
            if ( this._errorCoreString !== undefined){
                tmp = this._errorCoreString;

                for ( var i = 0; i < this._errorParamList.length; i++ ) {                
                    tmp.replace( this._errorParamList[i].key(), this._errorParamList[i].value() )
                }
            }
            return tmp;
        }


    }

    var _app: core.App;
}