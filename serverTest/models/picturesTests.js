var models;
(function (models) {
    (function (pictures) {
        var PicturesTests = (function () {
            function PicturesTests(image) {
                this._pictures = new models.pictures.Pictures();
                this._imageCreatedForTest = image;
            }
            PicturesTests.prototype.test_getListOfPictures = function () {
                var testID = core.misc.GUID_new();
                gApp.PubSub.publish(new cmdTestAdd(testID, "Pictures", "GetAll"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.pictures.evtPicturesGetted(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting all Pictures ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Pictures retrieved all: " + JSON.stringify(evt.value)));
                    }
                });

                this._pictures.getAll();
            };

            PicturesTests.prototype.test_deletePicture = function (intestID) {
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Pictures", "Delete"));

                var that = this;
                gApp.PubSub.subscribeOnce(new models.pictures.evtPictureDeleted(null, null, null), function (evt, args) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed deleting Picture: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Picture deleting ID: " + evt.value));
                        ;
                    }
                });

                this._pictures.delete(this._imageCreatedForTest);
            };
            return PicturesTests;
        })();
        pictures.PicturesTests = PicturesTests;
    })(models.pictures || (models.pictures = {}));
    var pictures = models.pictures;
})(models || (models = {}));
//@ sourceMappingURL=picturesTests.js.map
