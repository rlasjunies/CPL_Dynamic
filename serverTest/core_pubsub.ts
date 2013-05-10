/// <reference path="core_misc.ts" />
module core.pubsub {
    export interface IPubSubMsg {
    }
    export class PubSubMessage {
        public subscribed: { ( msg: IPubSubMsg ): void; }[] = [];
    }
    export class PubSubToken {
        constructor( public thread: string, public callback: ( msg: IPubSubMsg ) => void ) {
        }
    }

    export class PubSub {
        private _threads: PubSubMessage[] = [];
        subscribe( msg: IPubSubMsg, callback: ( msg: IPubSubMsg ) => void ): PubSubToken {
            //is a new thread?
            var thread = core.misc.getObjectClass( msg );
            if ( !this._threads[thread] ) {
                this._threads[thread] = new PubSubMessage();
            }

            //Add the callback to the thread
            this._threads[thread].subscribed.push( callback );

            return new PubSubToken( thread, callback );
        }

        unsubscribe( token: PubSubToken ) {
            //does the thread exists?
            if ( this._threads[token.thread] ) {
                var thread = this._threads[token.thread];
                var len = thread.subscribed.lenght;

                while ( len-- ) {
                    if ( thread.subscribed[len] === token.callback ) {
                        thread.subscribed.splice( len, 1 );
                    }
                }
            }
        }

        publish( msg: IPubSubMsg ) {
            var sThread = core.misc.getObjectClass( msg );
            if ( this._threads[sThread] ) {
                var oThread = this._threads[sThread];
                var len = oThread.subscribed.length;

                while ( len-- ) {
                    oThread.subscribed[len]( msg );
                }
            }
        }
    }

}