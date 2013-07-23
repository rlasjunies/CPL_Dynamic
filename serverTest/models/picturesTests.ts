/// <reference path="../core.ts" />
/// <reference path="pictures.ts" />

module models {
    export module pictures {
        export class PicturesTests {
            private _imageCreatedForTest: string;
            private _pictures: models.pictures.Pictures;

            constructor(image: string) {
                //   super();
                this._pictures = new models.pictures.Pictures();
                this._imageCreatedForTest = image;
            }
            //$app - > get( '/pictures', 'getPictures' );
            test_getListOfPictures() {
                //New test
                var testID = core.misc.GUID_new();
                gApp.PubSub.publish(new cmdTestAdd(testID, "Pictures", "GetAll"));


                //Subscribe to evtPaintsGetted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.pictures.evtPicturesGetted(null, null, null), function (evt: models.pictures.evtPicturesGetted, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting all Pictures ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Pictures retrieved all: " + JSON.stringify(evt.value)));
                    }
                });

                //call the method
                this._pictures.getAll();
            }

            //$app - > delete ( '/pictures/:id', 'deletePicture' );
            test_deletePicture(intestID: string) {
                //add a new test
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Pictures", "Delete"));

                //Subscribe to evtPicturesPosted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.pictures.evtPictureDeleted(null, null, null), function (evt: models.pictures.evtPictureDeleted, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed deleting Picture: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Picture deleting ID: " + evt.value));
                        ;
                    }
                });

                //Call the method to be tested
                this._pictures.delete(this._imageCreatedForTest);
            }
        }
    }
}