var models;
(function (models) {
    (function (pictures) {
        var evtPictureGetted = (function () {
            function evtPictureGetted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPictureGetted;
        })();
        pictures.evtPictureGetted = evtPictureGetted;

        var evtPicturesGetted = (function () {
            function evtPicturesGetted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPicturesGetted;
        })();
        pictures.evtPicturesGetted = evtPicturesGetted;

        var evtPictureDeleted = (function () {
            function evtPictureDeleted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPictureDeleted;
        })();
        pictures.evtPictureDeleted = evtPictureDeleted;

        var Pictures = (function () {
            function Pictures() {
                this._root = "pictures";
            }
            Pictures.prototype.get = function (id) {
                gApp.site.request(rest.eRequestVerb.GET, this._root + "/" + id, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new models.pictures.evtPictureGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new models.pictures.evtPictureGetted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new models.pictures.evtPicturesGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Pictures.prototype.getAll = function () {
                gApp.site.request(rest.eRequestVerb.GET, this._root, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPicturesGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new models.pictures.evtPicturesGetted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - :" + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPicturesGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Pictures.prototype.delete = function (id) {
                gApp.site.request(rest.eRequestVerb.DELETE, this._root + "/" + id, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            core.Logger.log(JSON.stringify(result));
                            var serviceReturn = result.response();
                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPictureDeleted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };
            return Pictures;
        })();
        pictures.Pictures = Pictures;

        var Picture = (function () {
            function Picture(id, name, description, picture) {
                this.id = id;
                this.name = name;
                this.description = description;
                this.picture = picture;
            }
            return Picture;
        })();
        pictures.Picture = Picture;
    })(models.pictures || (models.pictures = {}));
    var pictures = models.pictures;
})(models || (models = {}));
//@ sourceMappingURL=pictures.js.map
