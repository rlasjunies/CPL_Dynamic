/// <reference path="core_pubsub.ts" />
/// <reference path="Scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="core.ts" />
/// <reference path="core_restAPI.ts" />
/// <reference path="model/paints.ts" />

/* PICTURES */
class restPicturesTests {
    private _imageCreatedForTest: string;

    constructor( image: string ) {
        //super();
        this._imageCreatedForTest = image;
    }

    //$app - > get( '/pictures', 'getPictures' );
    test_getListOfPictures( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/php/" );
        site.request( rest.eRequestVerb.GET, "pictures", "", function ( result: rest.RestReturn) {
            switch ( result.status() ) {
                case rest.enumRestStatus.failed:
                    //Fail
                    cbFail( result.error(), "test_getListOfPictures" );
                    break;
                case rest.enumRestStatus.success:
                    //succeed?
                    
                    //check the returned value and collect the ID 
                    var restReturn = result.response();

                    if ( restReturn.status === "success" ) {
                        console.log( JSON.stringify( restReturn.value) );
                        cbSuccess( "test_getListOfPictures" );
                    } else {
                        var s: string = "status: Failed - " + ( <string>restReturn.error.message );
                        cbFail( Error(s) , "test_getListOfPictures" );
                    }
                    break;
            }
        } )
    }

    //$app - > delete ( '/pictures/:id', 'deletePicture' );
    test_deletePicture( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/php/" );
        site.request( rest.eRequestVerb.DELETE, "pictures/" + this._imageCreatedForTest, "", function ( result: rest.RestReturn ) {
            switch ( result.status() ) {
                case rest.enumRestStatus.failed:
                    //Fail
                    cbFail( result.error(), "test_deletePicture" );
                    break;
                case rest.enumRestStatus.success:
                    //succeed?
                    //check the returned value and collect the ID 
                    var restReturn = result.response();

                    if ( restReturn.status === "success" ) {
                        console.log( JSON.stringify( restReturn.value ) );
                        cbSuccess( "test_deletePicture" );
                    } else {
                        var s: string = "status: Failed - " + ( <string>restReturn.error.message );
                        cbFail( Error( s ), "test_deletePicture" );
                    }
                    break;
            }
        } )
    }

    //$app - > post( '/pictures', 'addPicture' );
    //test_postPicture( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
    // Not succeed
    //}
}


/*  PAINTS  */
class restPaintsTests{
    //private _paintIDCreated: string;
    private _paints: models.Paints;
    private _paint: models.Paint;

//constructor( url: string ) {
constructor(website: rest.RESTRequest){
     //   super();
    //this._paints = new models.Paints( new rest.RESTRequest( url ) );
        this._paints = new models.Paints( website );
     
    }

//$app - > get( '/paints/search/:query', 'findByName' );

    //$app - > delete ( '/paints/:id', 'deletePaint' );   

    //$app ->post( '/paints', 'addPaint' );
    test_postPaint(intestID:string) {

        //add a new test
        var testID = intestID;
        app().PubSub.publish( new cmdTestAdd( testID, "Paints","New" ) );

        //Subscribe to evtPaintPosted
        var that = this;
        app().PubSub.subscribeOnce( new models.evtPaintNewed(null,null,null ), function ( evt: models.evtPaintNewed, args?: any[] ) {
            if ( evt.error ) {
                app().PubSub.publish( new evtTestFinished( testID, false, "Failed creating Painting: " + evt.error ) );
            } else {
                that._paint.id = evt.value.id;
                app().PubSub.publish( new evtTestFinished( testID, true, "Painting created ID: " + evt.value.id ) );
                ;
            }
        });
        
        //Call the method to be tested
        this._paint = new models.Paint( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        this._paints.new( this._paint);
    }

    //$app - > put( '/paints/:id', 'updatePaint' );
    test_UpdatePaint( intestID: string ) {

        //add a new test
        var testID = intestID;
        app().PubSub.publish( new cmdTestAdd( testID, "Paints", "Update" ) );

        //Subscribe to evtPaintPosted
        var that = this;
        app().PubSub.subscribeOnce( new models.evtPaintUpdated( null, null, null ), function ( evt: models.evtPaintUpdated, args?: any[] ) {
            if ( evt.error ) {
                app().PubSub.publish( new evtTestFinished( testID, false, "Failed updating Painting: " + evt.error ) );
            } else {
                app().PubSub.publish( new evtTestFinished( testID, true, "Painting updated: " + JSON.stringify( evt.value )) );
            }
        } );

        //Call the method to be tested
        this._paint.name = "updated";
        this._paint.description = "updated";
        this._paint.year = "updated";
        this._paint.picture = "updated";
        this._paints.update ( this._paint.id, this._paint );
    }

    test_DeletePaint( intestID: string ) {

        //add a new test
        var testID = intestID;
        app().PubSub.publish( new cmdTestAdd( testID, "Paints", "Delete" ) );

        //Subscribe to evtPaintPosted
        var that = this;
        app().PubSub.subscribeOnce( new models.evtPaintDeleted( null, null, null ), function ( evt: models.evtPaintDeleted, args?: any[] ) {
            if ( evt.error ) {
                app().PubSub.publish( new evtTestFinished( testID, false, "Failed deleting Painting: " + evt.error ) );
            } else {
                app().PubSub.publish( new evtTestFinished( testID, true, "Painting deleting ID: " + evt.value ) );
                ;
            }
        } );

        //Call the method to be tested
        this._paints.delete ( this._paint.id );
    }

    //$app - > get( '/paints/:id', 'getPaint' );
    test_getPaint(intestID:string) {

        //New test
        var testID = intestID;//core.misc.GUID_new();
        app().PubSub.publish( new cmdTestAdd( testID, "Paints","Get" ) );


        //Subscribe to evtPaintGetted
        var that = this;
        app().PubSub.subscribeOnce( new models.evtPaintGetted( null, null, null ), function ( evt: models.evtPaintGetted, args?: any[] ) {
            if ( evt.error ) {
                app().PubSub.publish( new evtTestFinished( testID, false, "Failed getting Painting ID: " + that._paint.id + " ..." + evt.error ) );
            } else {
                app().PubSub.publish( new evtTestFinished( testID, true, "Painting retrieved: " + JSON.stringify(evt.value) ) );
            }
        } );

        //call the method
        this._paints.get( this._paint.id );
    }

    //$app - > get( '/paints', 'getPaints' );
    //$app - > options( '/paints', 'getPaints' );
    test_getAll() {

        //New test
        var testID = core.misc.GUID_new();
        app().PubSub.publish( new cmdTestAdd( testID, "Paints", "GetAll" ) );


        //Subscribe to evtPaintsGetted
        var that = this;
        app().PubSub.subscribeOnce( new models.evtPaintsGetted( null, null, null ), function ( evt: models.evtPaintsGetted, args?: any[] ) {
            if ( evt.error ) {
                app().PubSub.publish( new evtTestFinished( testID, false, "Failed getting all Painting ID: " + that._paint.id + " ..." + evt.error ) );
            } else {
                app().PubSub.publish( new evtTestFinished( testID, true, "Painting retrieved all: " + JSON.stringify( evt.value ) ) );
            }
        } );

        //call the method
        this._paints.getAll();
    }

}

var globImageUploaded: string;
function uploadFile() {
    var fd = new FormData();
    fd.append( "fileToUpload", (<HTMLInputElement>document.getElementById( "fileToUpload" )).files[0] );
    fd.append( "submit", document.getElementById( "form1" ) );

    var site = new rest.RESTRequest( "http://cpairelasjunies.com/php/" );
    site.request( rest.eRequestVerb.POST, "pictures", fd, function ( result: rest.RestReturn) {
        switch ( result.status() ) {
            case rest.enumRestStatus.failed:
                //Fail
                document.getElementById( "fileUploadResult" ).innerHTML = "Upload failed>>" + result.error() + "<<<";
                break;
            case rest.enumRestStatus.success:
                //succeed?

                //check the returned value and collect the ID 
                var restReturn = result.response();
                document.getElementById( "fileUploadedID" ).innerHTML = restReturn.status;
                console.log( restReturn.value.id );

                //Prepare the test panel
                var testDivFileId = document.getElementById( "testDivFileId" );
                testDivFileId.innerHTML = restReturn.value.id;
                globImageUploaded = restReturn.value.id;

                var divToShow = document.getElementById( "testDivStart" );
                divToShow.style.display = "block";

                break;
        }
    } )
}

window.onload = () => {
    _app = new core.App(  );

    subscribe( new cmdStartTest(), function ( cmdStartTest ) {
        //Clean the result page before the tests
        $( "#testDivResultSucceed" ).html( "0" );
        $( "#testDivResultFailed" ).html( "0" );
        $( "#listResult" ).empty();
        $.mobile.changePage( "#pageTestResult" );

        //run the first tests
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );
        paintsTests = new restPaintsTests( site );

        paintsTests.test_postPaint( createPaintTestID );
        paintsTests.test_getAll();
    } );

    subscribe( new evtTestFinished( null, null, null ), function ( evt: evtTestFinished ) {
        //start the other tests only when we have the paintID created
        if ( ( evt.passed ) && ( evt.guid === createPaintTestID ) ) {
            paintsTests.test_getPaint( getPaintTestID );
        } else if ( ( evt.passed ) && ( evt.guid === getPaintTestID ) ) {
            paintsTests.test_UpdatePaint( updatePaintTestID );
        } else if ( ( evt.passed ) && ( evt.guid === updatePaintTestID ) ) {
            paintsTests.test_DeletePaint( deletePaintTestID );
        }
    } );

    subscribe( new cmdTestAdd( null, null, null ), function ( cmd: cmdTestAdd ) {
        $( "#listResult" ).append( "<li id='" + cmd.guid + "' group='" + cmd.group +"' ><h3>" + cmd.name + "</h3><p style='color:white' id='" + cmd.guid + "result'></p></li>" )
        $( "#listResult" ).listview( "refresh" );
    } );

    subscribe( new evtTestFinished( null, null, null ), function ( evt: evtTestFinished ) {
        var s: string = evt.message.substr( 0, 100 ) + (evt.message.length > 100 ? " ..." : "");
        if ( evt.passed ) {
            $( "#" + evt.guid + ">:first" ).addClass( "good" );
            $( "#" + evt.guid + ">:first" ).html( $( "#" + evt.guid + ">:first" ).html() + "... passed" );
            $( "#" + evt.guid + "result" ).html(s);
            $( "#" + evt.guid ).wrapInner( "<a href='/' style='text-decoration:none'>" );
            $( "#testDivResultSucceed" ).html( "" + ( parseInt( $( "#testDivResultSucceed" ).html() ) + 1 ) );
        } else {
            $( "#" + evt.guid + ">:first" ).addClass( "bad" );
            $( "#" + evt.guid + ">:first" ).html( $( "#" + evt.guid + ">:first" ).html() + "... failed" );
            $( "#" + evt.guid + "result" ).html( s );
            $( "#" + evt.guid ).wrapInner( "<a href='/index.php' style='text-decoration:none'>" );
            $( "#testDivResultFailed" ).html( "" + ( parseInt( $( "#testDivResultFailed" ).html() ) + 1 ) );
        }
        $( "#listResult" ).listview( "refresh" );
    } );

    $.mobile.listview.prototype.options.autodividersSelector = function ( elt ) {
      
        var text = $.trim( elt.attr("group") ) || null;
        if ( !text ) {
            return null;
        }
        return text;
    };
}

class cmdStartTest implements core.pubsub.IPubSubMsg{}
class cmdTestAdd implements core.pubsub.IPubSubMsg{
    constructor( public guid: string, public group:string, public name: string ) {}
}
class evtTestFinished implements core.pubsub.IPubSubMsg{
    constructor ( public guid:string, public passed:bool, public message: string){}
}

//Event registration
var createPaintTestID = core.misc.GUID_new();
var getPaintTestID = core.misc.GUID_new();
var updatePaintTestID = core.misc.GUID_new();
var deletePaintTestID = core.misc.GUID_new();

//function startTest() {
//    //testExecution.addTestClass( new restPicturesTests( globImageUploaded),"restPicturesTests" );
//    //testExecution.addTestClass( new restPaintsTests( ), "restPaintsTests" );
//    //testExecution.run( document.getElementById( 'testDivResult' ) );  

//    publish(new cmdStartTest());
//}


var paintsTests: restPaintsTests;
var _app: core.App;
function app(): core.App {
    return _app;
}

//function subscribe( msg: core.pubsub.IPubSubMsg, callback: ( msg: core.pubsub.IPubSubMsg, args?: any[] ) => void , args?: any[] ): core.pubsub.PubSubToken{
function subscribe( msg: core.pubsub.IPubSubMsg, callback: ( msg: core.pubsub.IPubSubMsg) => void ): core.pubsub.PubSubToken {
    //return app().PubSub.subscribe( msg, callback, args );
    return app().PubSub.subscribe( msg, callback);
}
function publish( msg: core.pubsub.IPubSubMsg ) {
    app().PubSub.publish( msg );
}
