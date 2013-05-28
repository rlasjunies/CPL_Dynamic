var core;
(function (core) {
    (function (pubsub) {
        var Thread = (function () {
            function Thread() {
                this.callbacks = [];
            }
            return Thread;
        })();
        pubsub.Thread = Thread;        
        var CallBackSubscribbed = (function () {
            function CallBackSubscribbed(callback) {
                this.once = false;
                this.guid = core.misc.GUID_new();
                this.callback = callback;
            }
            return CallBackSubscribbed;
        })();
        pubsub.CallBackSubscribbed = CallBackSubscribbed;        
        var PubSubToken = (function () {
            function PubSubToken(thread, guid) {
                this.thread = thread;
                this.guid = guid;
            }
            return PubSubToken;
        })();
        pubsub.PubSubToken = PubSubToken;        
        var PubSub = (function () {
            function PubSub() {
                this._threads = [];
            }
            PubSub.prototype.subscribe = function (msg, callback) {
                var thread = core.misc.getObjectClass(msg);
                if(!this._threads[thread]) {
                    this._threads[thread] = new Thread();
                }
                var t = this._threads[thread];
                var cb = new CallBackSubscribbed(callback);
                t.callbacks.push(cb);
                return new PubSubToken(thread, cb.guid);
            };
            PubSub.prototype.subscribeOnce = function (msg, callback) {
                var token = this.subscribe(msg, callback);
                if(this._threads[token.thread]) {
                    var thread = this._threads[token.thread];
                    var len = thread.callbacks.length;
                    while(len--) {
                        if(thread.callbacks[len].guid === token.guid) {
                            thread.callbacks[len].once = true;
                        }
                    }
                }
            };
            PubSub.prototype.unsubscribe = function (token) {
                if(this._threads[token.thread]) {
                    var thread = this._threads[token.thread];
                    var len = thread.callbacks.length;
                    while(len--) {
                        if(thread.callbacks[len].guid === token.guid) {
                            thread.callbacks.splice(len, 1);
                        }
                    }
                }
            };
            PubSub.prototype.publish = function (msg) {
                var sThread = core.misc.getObjectClass(msg);
                if(this._threads[sThread]) {
                    var oThread = this._threads[sThread];
                    var len = oThread.callbacks.length;
                    while(len--) {
                        if(oThread.callbacks[len].args) {
                            oThread.callbacks[len].callback(msg, oThread.callbacks[len].args);
                        } else {
                            oThread.callbacks[len].callback(msg);
                        }
                        if(oThread.callbacks[len].once) {
                            console.log("PubSub.RemoveOnceMessages");
                            oThread.callbacks.splice(len, 1);
                        }
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
