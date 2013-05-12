/// <reference path="../core_restAPI.ts" />
/// <reference path="../core_pubsub.ts" />

module models {

    // PubSub Messages
    export class evtPaintGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
        constructor( public status: core.enumEntityStatus, public value: Paint, public error:Error) { }
    }
    
    export class evtPaintsGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
        constructor( public status: core.enumEntityStatus, public value: Paints, public error: Error ) { }
    }

    export class evtPaintNewed implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
        constructor( public status: core.enumEntityStatus, public value: Paint, public error: Error ) { }
    }

    export class evtPaintUpdated implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
        constructor( public status: core.enumEntityStatus, public value: Paint, public error: Error ) { }
    }

    export class evtPaintDeleted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
        constructor( public status: core.enumEntityStatus, public value: string, public error: Error ) { }
    }
    
    //Entities stream
    export class Paints {
        private _url: string;
        private _site: rest.RESTRequest;
        private _root: string = "paints";

        constructor( website: rest.RESTRequest ) {
            this._site = website;
        }
        
        get ( id: string ) {
            this._site.request( rest.eRequestVerb.GET, this._root + "/" + id, null , function ( result: rest.RestReturn) {
                switch ( result.status() ) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish( new evtPaintGetted( core.enumEntityStatus.failed, null, result.error() ));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID 
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                        if ( serviceReturn.status === "success" ) {
                            app().PubSub.publish( new evtPaintGetted( core.enumEntityStatus.success,
                                                                      <Paint>serviceReturn.value,
                                                                      null )
                                                 );
                        } else {
                            var sErr: string = "status: Failed - id:" + id + " ..." + ( JSON.stringify( serviceReturn ) );
                            app().PubSub.publish( new evtPaintGetted( core.enumEntityStatus.success, null, new Error(sErr) ));
                        }
                        break;
                }
            } )
        }

        getAll() {
            this._site.request( rest.eRequestVerb.GET, this._root, null, function ( result: rest.RestReturn) {
                switch ( result.status() ) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish( new evtPaintsGetted( core.enumEntityStatus.failed, null, result.error() ) );
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID 
                        var serviceReturn = result.response();

                        if ( serviceReturn.status === "success" ) {
                            app().PubSub.publish( new evtPaintsGetted( core.enumEntityStatus.success,
                                                                      <Paints>serviceReturn.value,
                                                                      null )
                                                 );
                        } else {
                            var sErr: string = "status: Failed - :"+ ( JSON.stringify( serviceReturn ) );
                            app().PubSub.publish( new evtPaintsGetted( core.enumEntityStatus.failed, null, new Error( sErr ) ) );
                        }
                        break;
                }
            } )
        }

        new( post: Paint ) {
            var thatPost = post;
            var that = this;
            this._site.request( rest.eRequestVerb.POST, that._root, post, function ( result: rest.RestReturn) {
                switch ( result.status() ) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish( new evtPaintNewed( core.enumEntityStatus.failed, null, result.error() ) );
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID 
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                        if ( serviceReturn.status === "success" ) {
                            app().PubSub.publish( new evtPaintNewed( core.enumEntityStatus.success,
                                                                      <Paint>serviceReturn.value,
                                                                      null  ) );
                        } else {
                            var sErr: string = "Failed - name:" + thatPost.name + " ... page:" + that._root + ( JSON.stringify(serviceReturn) );
                            app().PubSub.publish( new evtPaintNewed( core.enumEntityStatus.failed, post, new Error( sErr ) ) );
                        }
                        break;
                }
            } )
        }

        update ( id:string, post: Paint ) {
            var thatPost = post;
            var that = this;
            this._site.request( rest.eRequestVerb.PUT, this._root + "/" + id, post, function ( result: rest.RestReturn ) {
                switch ( result.status() ) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish( new evtPaintUpdated( core.enumEntityStatus.failed, null, result.error() ) );
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID 
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                        if ( serviceReturn.status === "success" ) {
                            app().PubSub.publish( new evtPaintUpdated( core.enumEntityStatus.success,
                                                                      <Paint>serviceReturn.value,
                                                                      null ) );
                        } else {
                            var sErr: string = "Failed - name:" + thatPost.name + " ... page:" + that._root + ( JSON.stringify( serviceReturn ) );
                            app().PubSub.publish( new evtPaintUpdated( core.enumEntityStatus.failed, post, new Error( sErr ) ) );
                        }
                        break;
                }
            } )
        }

        delete ( id: string ) {
            this._site.request( rest.eRequestVerb.DELETE, this._root + "/" + id, null, function ( result: rest.RestReturn ) {
                switch ( result.status() ) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish( new evtPaintDeleted( core.enumEntityStatus.failed, null, result.error() ) );
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        console.log( JSON.stringify(result) );
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                        if ( serviceReturn.status === "success" ) {
                            app().PubSub.publish( new evtPaintDeleted( core.enumEntityStatus.success,
                                                                       serviceReturn.value,
                                                                      null )
                                                 );
                        } else {
                            var sErr: string = "status: Failed - id:" + id + " ..." + ( JSON.stringify( serviceReturn ) );
                            app().PubSub.publish( new evtPaintDeleted( core.enumEntityStatus.success, null, new Error( sErr ) ) );
                        }
                        break;
                }
            } )
        }
    }

    //entity data
    export class Paint implements core.IEntities{
        constructor( public id: string, public name: string, public year: string, public description: string, public picture: string ) {
        }
    }
}