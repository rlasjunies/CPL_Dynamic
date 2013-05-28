/// <reference path="../core_restAPI.ts" />
/// <reference path="../core_pubsub.ts" />
var models;
(function (models) {
    // PubSub Messages
    var evtPaintGetted = (function () {
        function evtPaintGetted(status, value, error) {
            this.status = status;
            this.value = value;
            this.error = error;
        }
        return evtPaintGetted;
    })();
    models.evtPaintGetted = evtPaintGetted;    
    var evtPaintsGetted = (function () {
        function evtPaintsGetted(status, value, error) {
            this.status = status;
            this.value = value;
            this.error = error;
        }
        return evtPaintsGetted;
    })();
    models.evtPaintsGetted = evtPaintsGetted;    
    var evtPaintNewed = (function () {
        function evtPaintNewed(status, value, error) {
            this.status = status;
            this.value = value;
            this.error = error;
        }
        return evtPaintNewed;
    })();
    models.evtPaintNewed = evtPaintNewed;    
    var evtPaintUpdated = (function () {
        function evtPaintUpdated(status, value, error) {
            this.status = status;
            this.value = value;
            this.error = error;
        }
        return evtPaintUpdated;
    })();
    models.evtPaintUpdated = evtPaintUpdated;    
    var evtPaintDeleted = (function () {
        function evtPaintDeleted(status, value, error) {
            this.status = status;
            this.value = value;
            this.error = error;
        }
        return evtPaintDeleted;
    })();
    models.evtPaintDeleted = evtPaintDeleted;    
    //Entities stream
    var Paints = (function () {
        function Paints(website) {
            this._root = "paints";
            this._site = website;
        }
        Paints.prototype.get = function (id) {
            this._site.request(rest.eRequestVerb.GET, this._root + "/" + id, null, function (result) {
                switch(result.status()) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish(new evtPaintGetted(core.enumEntityStatus.failed, null, result.error()));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                        if(serviceReturn.status === "success") {
                            app().PubSub.publish(new evtPaintGetted(core.enumEntityStatus.success, serviceReturn.value, null));
                        } else {
                            var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                            app().PubSub.publish(new evtPaintGetted(core.enumEntityStatus.success, null, new Error(sErr)));
                        }
                        break;
                }
            });
        };
        Paints.prototype.getAll = function () {
            this._site.request(rest.eRequestVerb.GET, this._root, null, function (result) {
                switch(result.status()) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish(new evtPaintsGetted(core.enumEntityStatus.failed, null, result.error()));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        var serviceReturn = result.response();
                        if(serviceReturn.status === "success") {
                            app().PubSub.publish(new evtPaintsGetted(core.enumEntityStatus.success, serviceReturn.value, null));
                        } else {
                            var sErr = "status: Failed - :" + (JSON.stringify(serviceReturn));
                            app().PubSub.publish(new evtPaintsGetted(core.enumEntityStatus.failed, null, new Error(sErr)));
                        }
                        break;
                }
            });
        };
        Paints.prototype.new = function (post) {
            var thatPost = post;
            var that = this;
            this._site.request(rest.eRequestVerb.POST, that._root, post, function (result) {
                switch(result.status()) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish(new evtPaintNewed(core.enumEntityStatus.failed, null, result.error()));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                        if(serviceReturn.status === "success") {
                            app().PubSub.publish(new evtPaintNewed(core.enumEntityStatus.success, serviceReturn.value, null));
                        } else {
                            var sErr = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                            app().PubSub.publish(new evtPaintNewed(core.enumEntityStatus.failed, post, new Error(sErr)));
                        }
                        break;
                }
            });
        };
        Paints.prototype.update = function (id, post) {
            var thatPost = post;
            var that = this;
            this._site.request(rest.eRequestVerb.PUT, this._root + "/" + id, post, function (result) {
                switch(result.status()) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish(new evtPaintUpdated(core.enumEntityStatus.failed, null, result.error()));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture )
                        if(serviceReturn.status === "success") {
                            app().PubSub.publish(new evtPaintUpdated(core.enumEntityStatus.success, serviceReturn.value, null));
                        } else {
                            var sErr = "Failed - name:" + thatPost.name + " ... page:" + that._root + (JSON.stringify(serviceReturn));
                            app().PubSub.publish(new evtPaintUpdated(core.enumEntityStatus.failed, post, new Error(sErr)));
                        }
                        break;
                }
            });
        };
        Paints.prototype.delete = function (id) {
            this._site.request(rest.eRequestVerb.DELETE, this._root + "/" + id, null, function (result) {
                switch(result.status()) {
                    case rest.enumRestStatus.failed:
                        app().PubSub.publish(new evtPaintDeleted(core.enumEntityStatus.failed, null, result.error()));
                        break;
                    case rest.enumRestStatus.success:
                        //succeed?
                        //check the returned value and collect the ID
                        console.log(JSON.stringify(result));
                        var serviceReturn = result.response();
                        //new Paint( serviceReturn.value.id, serviceReturn.value.name, serviceReturn.value.year, serviceReturn.value.description, serviceReturn.value.picture ),
                        if(serviceReturn.status === "success") {
                            app().PubSub.publish(new evtPaintDeleted(core.enumEntityStatus.success, serviceReturn.value, null));
                        } else {
                            var sErr = "status: Failed - id:" + id + " ..." + (JSON.stringify(serviceReturn));
                            app().PubSub.publish(new evtPaintDeleted(core.enumEntityStatus.success, null, new Error(sErr)));
                        }
                        break;
                }
            });
        };
        return Paints;
    })();
    models.Paints = Paints;    
    //entity data
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
    models.Paint = Paint;    
})(models || (models = {}));
//@ sourceMappingURL=paints.js.map
