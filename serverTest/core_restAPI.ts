
//TODO compare with the usage of request.JSON (jQuery)
//new Request.JSON(
//{
//    url: '/list.json',
//    onSuccess: function ( json ) {
//        json.list.each( function ( key, val ) {
//            new Element( 'LI' )
//                .set( 'text', val )
//                .addEvent( 'click', function () {
//                    alert( 'item ' + key + ' pressed' );

//                    // alert('item '+val.id+' pressed');
//                    // considering val is an object instead of raw string, this way you must change set to something like this set('text', val.text)

//                } )
//                .inject( $( 'list' ) );
//            // any other thing you want add to your list item 
//        } );
//    }
//} ).get();

//<ul id = "list" > < / ul >

module rest {

    export enum enumRestStatus { success, failed };

    export class RestReturn {
        private _status: rest.enumRestStatus;
        private _response: string;
        private _error: Error;

        constructor(status: rest.enumRestStatus, response: string, error?: Error) {
            if (error == null) { error = null };
            this._status = status;
            this._response = response;
            this._error = error;
        }
        status(): rest.enumRestStatus {
            return this._status;
        }
        response(): any {
            return this._response;
        }
        error(): Error {
            return this._error;
        }

    }

    export class RESTRequest {
        _url: string;

        request( verb: rest.eRequestVerb, additionalUrl: string, postData: any, callback: ( val: rest.RestReturn ) => void ) {
            var xhr = new XMLHttpRequest();
                try {
                    xhr.open( rest.eRequestVerb_Str( verb ), this._url + additionalUrl, true );

                    xhr.onload = function (evt:Event) {
                        var xhrResponse = function () {
                            try {
                                return JSON.parse( xhr.responseText );
                            }catch (ex) {
                                return xhr.responseText;
                            }
                        };

                        callback( new rest.RestReturn(
                            rest.enumRestStatus.success,
                            xhrResponse()
                        ) );
                    };
                                        
                    xhr.onerror = function ( err : ErrorEvent) {
                        callback( new rest.RestReturn(
                            rest.enumRestStatus.failed,
                            "",
                            new Error( JSON.stringify(err) )
                        ) );
                    }; 

                    //xhr.setRequestHeader( "Access-Control-Allow-Origin", "*" );
                    //xhr.setRequestHeader( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
                    if ( postData ) {
                        //if ( typeof ( postData ) === "string" ) {
                            xhr.send( JSON.stringify( postData ) );
                        //} else {
                        //    xhr.send( postData );
                        //}
                    } else {
                        xhr.send();
                    }
                } catch ( ex ) {
                    //core.app.log( core.eLogSeverity.critical, ex );
                    throw ex;
                }
        }

        constructor( url:string ) {
            this._url = url;
        }
    }

    export enum eRequestVerb { GET, POST, PUT, DELETE };

    export function eRequestVerb_Str( verb: rest.eRequestVerb ): string {
        var sVerb: string;
        if ( verb === rest.eRequestVerb.GET ) {
            sVerb = "GET";
        } else if ( verb === rest.eRequestVerb.POST ) {
            sVerb = "POST";
        } else if ( verb === rest.eRequestVerb.PUT ) {
            sVerb = "PUT";
        } else if ( verb == rest.eRequestVerb.DELETE ) {
            sVerb = "DELETE";
        }
        return sVerb;

    }

}
