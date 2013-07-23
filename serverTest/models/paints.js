var models;
(function (models) {
    (function (paints) {
        var evtPaintGetted = (function () {
            function evtPaintGetted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPaintGetted;
        })();
        paints.evtPaintGetted = evtPaintGetted;

        var evtPaintsGetted = (function () {
            function evtPaintsGetted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPaintsGetted;
        })();
        paints.evtPaintsGetted = evtPaintsGetted;

        var evtPaintNewed = (function () {
            function evtPaintNewed(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPaintNewed;
        })();
        paints.evtPaintNewed = evtPaintNewed;

        var evtPaintUpdated = (function () {
            function evtPaintUpdated(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPaintUpdated;
        })();
        paints.evtPaintUpdated = evtPaintUpdated;

        var evtPaintDeleted = (function () {
            function evtPaintDeleted(status, value, error) {
                this.status = status;
                this.value = value;
                this.error = error;
            }
            return evtPaintDeleted;
        })();
        paints.evtPaintDeleted = evtPaintDeleted;

        var Paints = (function () {
            function Paints() {
                this._root = "paints";
            }
            Paints.prototype.get = function (id) {
                gApp.site.request(rest.eRequestVerb.GET, this._root + "/" + id, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintGetted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Paints.prototype.getAll = function () {
                gApp.site.request(rest.eRequestVerb.GET, this._root, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - :" + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintsGetted(core.misc.enumEntityStatus.failed, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Paints.prototype.new = function (post) {
                var thatPost = post;
                var that = this;
                gApp.site.request(rest.eRequestVerb.POST, that._root, post, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintNewed(core.misc.enumEntityStatus.failed, post, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Paints.prototype.update = function (id, post) {
                var thatPost = post;
                var that = this;
                gApp.site.request(rest.eRequestVerb.PUT, this._root + "/" + id, post, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintUpdated(core.misc.enumEntityStatus.failed, post, new Error(sErr)));
                            }
                            break;
                    }
                });
            };

            Paints.prototype.delete = function (id) {
                gApp.site.request(rest.eRequestVerb.DELETE, this._root + "/" + id, null, function (result) {
                    switch (result.status()) {
                        case rest.enumRestStatus.failed:
                            gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.failed, null, result.error()));
                            break;
                        case rest.enumRestStatus.success:
                            core.Logger.log(JSON.stringify(result));
                            var serviceReturn = result.response();

                            if (serviceReturn.status === "success") {
                                gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.success, serviceReturn.value, null));
                            } else {
                                var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                                gApp.PubSub.publish(new evtPaintDeleted(core.misc.enumEntityStatus.success, null, new Error(sErr)));
                            }
                            break;
                    }
                });
            };
            return Paints;
        })();
        paints.Paints = Paints;

        var Paint = (function () {
            function Paint(id, name, year, description, picture) {
                this.id = id;
                this.name = name;
                this.year = year;
                this.description = description;
                this.picture = picture;
            }
            return Paint;
        })();
        paints.Paint = Paint;
    })(models.paints || (models.paints = {}));
    var paints = models.paints;
})(models || (models = {}));
//@ sourceMappingURL=paints.js.map
