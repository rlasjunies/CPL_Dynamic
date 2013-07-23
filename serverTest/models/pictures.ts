/// <reference path="../core.ts" />
/// <reference path="../core_restAPI.ts" />
/// <reference path="../core_pubsub.ts" />

module models {
    export module pictures {
        // PubSub Messages
        export class evtPictureGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: models.pictures.Picture, public error: Error) { }
        }

        export class evtPicturesGetted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: models.pictures.Picture[], public error: Error) {
            }
        }

        export class evtPictureDeleted implements core.pubsub.IPubSubMsg, core.pubsub.IPubSubEvt_FunctionReturn {
            constructor(public status: core.misc.enumEntityStatus, public value: string, public error: Error) { }
        }

        //Entities stream
        export class Pictures {
            private _root: string = "pictures";

            get(id: string) {
                gApp.site.request(rest.eRequestVerb.GET, this._root + "/" + id, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new models.pictures.evtPictureGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new models.pictures.evtPictureGetted(core.misc.enumEntityStatus.success,
                                    <models.pictures.Picture>serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new models.pictures.evtPicturesGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                })
        }

            getAll() {
                gApp.site.request(rest.eRequestVerb.GET, this._root, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPicturesGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            
                            //check the returned value and collect the ID 
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new models.pictures.evtPicturesGetted(core.misc.enumEntityStatus.success,
                                    <models.pictures.Picture[]>serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - :" + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPicturesGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                })
    }

            delete(id: string) {
                gApp.site.request(rest.eRequestVerb.DELETE, this._root + "/" + id, null, function (result: rest.RestReturn) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            //succeed?
                            //check the returned value and collect the ID
                            core.Logger.log(JSON.stringify(result));
                            var serviceReturn = result.response();
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.success,
                                    serviceReturn.value,
                                    null)
                                    );
                            } else {
                                var sErr: string = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                })
        }
        }

        //entity data
        export class Picture implements core.misc.IEntities {
            ///TODO mettre les bons champs de base
            constructor(public id: string, public name: string, public description: string, public picture: string) {
            }
        }
    }
}