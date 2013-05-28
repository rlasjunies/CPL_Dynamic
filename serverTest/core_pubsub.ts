/// <reference path="core_misc.ts" />

//TODO:
// 1) Create a method to trigger 1 callback when 1 one the message is arriving
//      the method could be called raced
//      usefull when there is a timeout expected. 1 message is related to a timeout
// 2) Create a method to trigger 1 callback when all the message expected have been arrived
//      this could be called meetingPoint
// 3) Record all the message in a buffer
//      this could be used to have a 'replay' function. We record all the messages arriving and then it's possible
//      to 'replay' them. It could be very usefull for testing purpose / load analysis
// 4) Compare message using diffObject
//      To replay we should plan to change few values (objects/msg properties) in the test scenario
//      The concept behind objectdiff could help supporting this use case
// 5) improve usability/readability
//      the current pub/sub is not very readable and (too?) verbose
//          app().PubSub.subscribe( new MsgTestStart(), function ( MsgTestStart ) {
//              paintsTests.test_postPaint();
//          } );
// 6) shoudl we create 2 message interfaces:
//      - 1 for command : an action triggered by an actor, the message should a "verb"
//      - and another one for events: an reaction following an actor command, the message should be an event
// 7) identicate if the message will be used only once. If yes, then it will automatically unsubscribe after use.
//      is it really usefull in really application (currently the remark is posted related to the test framework)
//
module core.pubsub {
    export interface IPubSubMsg {
    }
    export interface IPubSubEvt_FunctionReturn{
        status: core.enumEntityStatus;
        value: any;
        error: Error;
    }
    export class Thread {
        public callbacks: CallBackSubscribbed[] = [];
    }

    export class CallBackSubscribbed{
        public guid: string;
        //public callback: { ( msg: IPubSubMsg, args?: any[] ): void; };
        public callback: { ( msg: IPubSubMsg ): void; };
        //public args: any[];
        public once: bool = false;
        //constructor( callback: { ( msg: IPubSubMsg, args?: any[] ): void; }, args?: any[] ) {
        constructor( callback: { ( msg: IPubSubMsg): void; }) {
            this.guid = core.misc.GUID_new();
            this.callback = callback;
        //    if ( args ) { this.args = args; }
        }
    }

    export class PubSubToken {
        //constructor( public thread: string, public callback: ( msg: IPubSubMsg ) => void ) {}
        constructor(public thread: string, public guid:string){}
    }

    export class PubSub {
        private _threads: Thread[] = [];
//        subscribe( msg: IPubSubMsg, callback: ( msg: IPubSubMsg, args?: any[] ) => void , args?: any[]  ): PubSubToken {
            subscribe( msg: IPubSubMsg, callback: ( msg: IPubSubMsg) => void): PubSubToken {
            //is a new thread?
            var thread = core.misc.getObjectClass( msg );
            if ( !this._threads[thread] ) {
                this._threads[thread] = new Thread();
            }

            //Add the callback to the thread
            var t = this._threads[thread];
            //var cb = new CallBackSubscribbed( callback,args);
            var cb = new CallBackSubscribbed( callback);

            t.callbacks.push( cb );

            //this._threads[thread].subscribed.push( callback );
            return new PubSubToken( thread, cb.guid );
        }

        //subscribeOnce( msg: IPubSubMsg, callback: ( msg: IPubSubMsg, args?: any[] ) => void , args?: any[] ): void {
            subscribeOnce( msg: IPubSubMsg, callback: ( msg: IPubSubMsg) => void ): void {
            //var token = this.subscribe( msg, callback, args );
            var token = this.subscribe( msg, callback);

            //Change the behavior of the callback
            if ( this._threads[token.thread] ) {
                var thread = this._threads[token.thread];
                var len = thread.callbacks.length;

                while ( len-- ) {
                    if ( thread.callbacks[len].guid === token.guid ) {
                        thread.callbacks[len].once = true;
                    }
                }
            }
        }

        unsubscribe( token: PubSubToken ) {
            //does the thread exists?
            if ( this._threads[token.thread] ) {
                var thread = this._threads[token.thread];
                var len = thread.callbacks.length;

                while ( len-- ) {
                    if ( thread.callbacks[len].guid === token.guid ) {
                        thread.callbacks.splice( len, 1 );
                    }
                }
            }
        }

        publish( msg: IPubSubMsg ) {
            var sThread = core.misc.getObjectClass( msg );
            if ( this._threads[sThread] ) {
                var oThread = this._threads[sThread];
                var len = oThread.callbacks.length;

                while ( len-- ) {
                    //console.log( "PubSub.BeforeCall - " + JSON.stringify( oThread.callbacks[len].callback ) + "... args:" + JSON.stringify( oThread.callbacks[len].args ));
                    if ( oThread.callbacks[len].args ){
                        oThread.callbacks[len].callback( msg, oThread.callbacks[len].args );
                    } else {
                        oThread.callbacks[len].callback( msg);
                    }
                    if ( oThread.callbacks[len].once ) {
                        console.log( "PubSub.RemoveOnceMessages" );
                        oThread.callbacks.splice( len, 1 );
                    }
                }
            }
        }
    }

}