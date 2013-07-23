/// <reference path="../core.ts" />
/// <reference path="paints.ts" />

module models {
    export module paints {
        export class PaintsTests {
            private _paints: models.paints.Paints;
            private _paint: models.paints.Paint;

            constructor() {
                //   super();
                //this._paints = new models.Paints( new rest.RESTRequest( url ) );
                //var app: core.App = new core.App(null, false);
                this._paints = new models.paints.Paints();
            }

            //$app - > get( '/paints/search/:query', 'findByName' );

            //$app - > delete ( '/paints/:id', 'deletePaint' );   

            //$app ->post( '/paints', 'addPaint' );
            test_postPaint(intestID: string) {

                //add a new test
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "New"));

                //Subscribe to evtPaintPosted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintNewed(null, null, null), function (evt: models.paints.evtPaintNewed, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed creating Painting: " + evt.error));
                    } else {
                        that._paint.id = evt.value.id;
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting created ID: " + evt.value.id));
                        ;
                    }
                });

                //Call the method to be tested
                this._paint = new models.paints.Paint("notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg");
                this._paints.new(this._paint);
            }

            //$app - > put( '/paints/:id', 'updatePaint' );
            test_UpdatePaint(intestID: string) {

                //add a new test
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Update"));

                //Subscribe to evtPaintPosted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintUpdated(null, null, null), function (evt: models.paints.evtPaintUpdated, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed updating Painting: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting updated: " + JSON.stringify(evt.value)));
                    }
                });

                //Call the method to be tested
                this._paint.name = "updated";
                this._paint.description = "updated";
                this._paint.year = "updated";
                this._paint.picture = "updated";
                this._paints.update(this._paint.id, this._paint);
            }

            test_DeletePaint(intestID: string) {

                //add a new test
                var testID = intestID;
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Delete"));

                //Subscribe to evtPaintPosted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintDeleted(null, null, null), function (evt: models.paints.evtPaintDeleted, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed deleting Painting: " + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting deleting ID: " + evt.value));
                        ;
                    }
                });

                //Call the method to be tested
                this._paints.delete(this._paint.id);
            }

            //$app - > get( '/paints/:id', 'getPaint' );
            test_getPaint(intestID: string) {

                //New test
                var testID = intestID;//core.misc.GUID_new();
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "Get"));


                //Subscribe to evtPaintGetted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintGetted(null, null, null), function (evt: models.paints.evtPaintGetted, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting Painting ID: " + that._paint.id + " ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved: " + JSON.stringify(evt.value)));
                    }
                });

                //call the method
                this._paints.get(this._paint.id);
            }

            //$app - > get( '/paints', 'getPaints' );
            //$app - > options( '/paints', 'getPaints' );
            test_getAll() {

                //New test
                var testID = core.misc.GUID_new();
                gApp.PubSub.publish(new cmdTestAdd(testID, "Paints", "GetAll"));


                //Subscribe to evtPaintsGetted
                var that = this;
                gApp.PubSub.subscribeOnce(new models.paints.evtPaintsGetted(null, null, null), function (evt: models.paints.evtPaintsGetted, args?: any[]) {
                    if (evt.error) {
                        gApp.PubSub.publish(new evtTestFinished(testID, false, "Failed getting all Painting ID: " + that._paint.id + " ..." + evt.error));
                    } else {
                        gApp.PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved all: " + JSON.stringify(evt.value)));
                    }
                });

                //call the method
                this._paints.getAll();
            }

        }
    }
}