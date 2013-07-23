var models;
(function (models) {
    (function (paints) {
        var PaintsTests = (function () {
            function PaintsTests() {
                this._paints = new models.paints.Paints();
            }
            PaintsTests.prototype.test_postPaint = function (intestID) {
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "New"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintNewed(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed creating Painting: " + evt.error));
                    } else {
                        that._paint.id = evt.value.id;
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting created ID: " + evt.value.id));
                        ;
                    }
                });

                this._paint = new models.paints.Paint("notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg");
                this._paints.new(this._paint);
            };

            PaintsTests.prototype.test_UpdatePaint = function (intestID) {
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Update"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintUpdated(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed updating Painting: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting updated: " + JSON.stringify(evt.value)));
                    }
                });

                this._paint.name = "updated";
                this._paint.description = "updated";
                this._paint.year = "updated";
                this._paint.picture = "updated";
                this._paints.update(this._paint.id, this._paint);
            };

            PaintsTests.prototype.test_DeletePaint = function (intestID) {
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Delete"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintDeleted(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed deleting Painting: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting deleting ID: " + evt.value));
                        ;
                    }
                });

                this._paints.delete(this._paint.id);
            };

            PaintsTests.prototype.test_getPaint = function (intestID) {
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Get"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintGetted(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting Painting ID: " + that._paint.id + " ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved: " + JSON.stringify(evt.value)));
                    }
                });

                this._paints.get(this._paint.id);
            };

            PaintsTests.prototype.test_getAll = function () {
                var testID = core.misc.GUID_new();
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "GetAll"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintsGetted(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting all Painting ID: " + that._paint.id + " ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved all: " + JSON.stringify(evt.value)));
                    }
                });

                this._paints.getAll();
            };
            return PaintsTests;
        })();
        paints.PaintsTests = PaintsTests;
    })(models.paints || (models.paints = {}));
    var paints = models.paints;
})(models || (models = {}));
//@ sourceMappingURL=paintsTests.js.map
