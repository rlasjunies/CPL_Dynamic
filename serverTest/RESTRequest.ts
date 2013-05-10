/// <reference path="core.ts" />
module rest {

    export enum enumRequestVerb { GET, POST, PUT, DELETE };
    export function enumRequestVerb_String( verb: enumRequestVerb ): string{
        var sVerb: string;
        if ( verb === enumRequestVerb.GET ) {
            sVerb = "GET";
        } else if ( verb === enumRequestVerb.POST ) {
            sVerb = "POST";
        } else if ( verb === enumRequestVerb.PUT ) {
            sVerb = "PUT";
        } else if ( verb == enumRequestVerb.DELETE ) {
            sVerb = "DELETE";
        }
        return sVerb;

    }
    export class RESTRequest {
        __url: string;

        request( verb: enumRequestVerb, additionalUrl: string, postData: any, callback: ( val: core.CallbackSignatureReturn ) => void ) {
            var xhr = new XMLHttpRequest();
                try {
                    xhr.open( enumRequestVerb_String( verb ), this.__url + additionalUrl, true );

                    xhr.onload = function (evt:Event) {
                        var xhrResponse = function () {
                            try {
                                return JSON.parse( xhr.responseText );
                            }catch (ex) {
                                return xhr.responseText;
                            }
                        };

                        callback( new core.CallbackSignatureReturn(
                            core.eCallbackSignatureStatus.ok,
                            xhrResponse()
                        ) );
                    };
                                        
                    xhr.onerror = function ( err : ErrorEvent) {
                        callback( new core.CallbackSignatureReturn(
                            core.eCallbackSignatureStatus.error,
                            "",
                            //new Error( 0, 'Woops, there was an error making the request.$1', [new core.ErrorParam( "$1", e )] )
                            new Error( err.message )
                        ) );
                    };

                    if ( postData ) {
                        if ( typeof ( postData ) === "string" ) {
                            xhr.send( JSON.stringify( postData ) );
                        } else {
                            xhr.send( postData );
                        }
                    } else {
                        xhr.send();
                    }
                } catch ( ex ) {
                    core.app().log( core.eLogSeverity.critical, ex );
                    throw ex;
                }
        }

        constructor( url ) {
            this.__url = url;
        }
    }

}
