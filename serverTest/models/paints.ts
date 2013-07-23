/// <reference path="../core.ts" />
/// <reference path="../core_restAPI.ts" />
/// <reference path="../core_pubsub.ts" />

module models {
    export module paints {
        // PubSub Messages
        export class evtPaintGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: Paint, public error: Error) { }
        }
        
        export class evtPaintsGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: Paint[], public error: Error) { }
        }

        export class evtPaintNewed implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: Paint, public error: Error) { }
        }

        export class evtPaintUpdated implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: Paint, public error: Error) { }
        }

        export class evtPaintDeleted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: string, public error: Error) { }
        }
        
        //Entities stream
        export class Paints {
            private _root: string = "paints";
            
            get(id: string) {
                gApp.site.request(rest.eRequestVerb.GET, this._root + "/" + id, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();
                            //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.success,
                                    <Paint>serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                })
        }

            getAll() {
                gApp.site.request(rest.eRequestVerb.GET, this._root, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.success,
                                    <Paint[]>serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - :" + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.failed, null, new Error(sErr)));
                            }
                            break;
                    }
                })
        }

            new(post: Paint) {
                var thatPost = post;
                var that = this;
                gApp.site.request(rest.eRequestVerb.POST, that._root, post, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();
                            //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.success,
                                    <Paint>serviceReturn.value,
                                    null));
                            } else {
                                var sErr: string = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.failed, post, new Error(sErr)));
                            }
                            break;
                    }
                })
        }

            update(id: string, post: Paint) {
                var thatPost = post;
                var that = this;
                gApp.site.request(rest.eRequestVerb.PUT, this._root + "/" + id, post, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();
                            //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.success,
                                    <Paint>serviceReturn.value,
                                    null));
                            } else {
                                var sErr: string = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.failed, post, new Error(sErr)));
                            }
                            break;
                    }
                })
        }

            delete(id: string) {
                gApp.site.request(rest.eRequestVerb.DELETE, this._root + "/" + id, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID
                            core.Logger.log(JSON.stringify(result));
                            var serviceReturn = result.response();
                            //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.success,
                                    serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                })
        }
        }

        //entity data
        export class Paint implements core.misc.IEntities {
            constructor(public id: string, public name: string, public year: string, public description: string, public picture: string) {
            }
        }
    }
}