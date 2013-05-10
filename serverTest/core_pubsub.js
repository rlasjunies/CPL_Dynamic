var core;
(function (core) {
    /// <reference path="core_misc.ts" />
    (function (pubsub) {
        var PubSubMessage = (function () {
            function PubSubMessage() {
                this.subscribed = [];
            }
            return PubSubMessage;
        })();
        pubsub.PubSubMessage = PubSubMessage;        
        var PubSubToken = (function () {
            function PubSubToken(thread, callback) {
                this.thread = thread;
                this.callback = callback;
            }
            return PubSubToken;
        })();
        pubsub.PubSubToken = PubSubToken;        
        var PubSub = (function () {
            function PubSub() {
                this._threads = [];
            }
            PubSub.prototype.subscribe = function (msg, callback) {
                //is a new thread?
                var thread = core.misc.getObjectClass(msg);
                if(!this._threads[thread]) {
                    this._threads[thread] = new PubSubMessage();
                }
                //Add the callback to the thread
                this._threads[thread].subscribed.push(callback);
                return new PubSubToken(thread, callback);
            };
            PubSub.prototype.unsubscribe = function (token) {
                //does the thread exists?
                if(this._threads[token.thread]) {
                    var thread = this._threads[token.thread];
                    var len = thread.subscribed.lenght;
                    while(len--) {
                        if(thread.subscribed[len] === token.callback) {
                            thread.subscribed.splice(len, 1);
                        }
                    }
                }
            };
            PubSub.prototype.publish = function (msg) {
                var sThread = core.misc.getObjectClass(msg);
                if(this._threads[sThread]) {
                    var oThread = this._threads[sThread];
                    var len = oThread.subscribed.length;
                    while(len--) {
                        oThread.subscribed[len](msg);
                    }
                }
            };
            return PubSub;
        })();
        pubsub.PubSub = PubSub;        
    })(core.pubsub || (core.pubsub = {}));
    var pubsub = core.pubsub;
})(core || (core = {}));
//@ sourceMappingURL=core_pubsub.js.map
