/// <reference path="model/paints.ts" />
/// <reference path="RESTRequest.ts" />
/// <reference path="tsUnit.ts" />



/* PICTURES */
class restPicturesTests extends tsUnit.TestClass {
    private _imageCreatedForTest: string;

    constructor( image: string ) {
        super();
        this._imageCreatedForTest = image;
    }

    //$app - > get( '/pictures', 'getPictures' );
    test_getListOfPictures( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );
        site.request( rest.enumRequestVerb.GET, "pictures", "", function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail( result.error(), "test_getListOfPictures" );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    
                    //check the returned value and collect the ID 
                    var restReturn = result.value();

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
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );
        site.request( rest.enumRequestVerb.DELETE, "pictures/" + this._imageCreatedForTest, "", function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail( result.error(), "test_deletePicture" );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID 
                    var restReturn = result.value();

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
class restPaintsTests extends tsUnit.TestClass{
    //private _paintIDCreated: string;
    private _paint: Paints;

//$app - > get( '/paints', 'getPaints' );
//$app - > options( '/paints', 'getPaints' );
//$app - > get( '/paints/search/:query', 'findByName' );
//$app - > put( '/paints/:id', 'updatePaint' );
    //$app - > delete ( '/paints/:id', 'deletePaint' );   

    //$app - > post( '/paints', 'addPaint' );
    test_postPaint2( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );

        this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        var that = this;
        site.request( rest.enumRequestVerb.POST, "paints", this._paint, function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail( result.error(), "test_postPaint" );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID 
                    var serviceReturn = result.value();

                    if ( serviceReturn.status === "success" ) {
                        console.log( "test_postPaint:" + JSON.stringify( serviceReturn.value ) );
                        that._paint.id = serviceReturn.value.id;
                        cbSuccess( "test_postPaint" );
                    } else {
                        var s: string = "status: Failed - " + ( <string>serviceReturn.error.message );
                        cbFail( Error( s ), "test_postPaint" );
                    }
                    break;
            }
        } )
    }

    test_postPaint( ) {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );

        this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        var that = this;
        site.request( rest.enumRequestVerb.POST, "paints", this._paint, function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    //cbFail( result.error(), "test_postPaint" );
                    core.app().PubSub.publish( new MsgPostPaintsTested() );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID 
                    var serviceReturn = result.value();

                    if ( serviceReturn.status === "success" ) {
                        console.log( "test_postPaint:" + JSON.stringify( serviceReturn.value ) );
                        that._paint.id = serviceReturn.value.id;
                        //cbSuccess( "test_postPaint" );
                        core.app().PubSub.publish(new MsgPostPaintsTested() );
                    } else {
                        var s: string = "status: Failed - " + ( <string>serviceReturn.error.message );
                        //cbFail( Error( s ), "test_postPaint" );
                        core.app().PubSub.publish( new MsgPostPaintsTested );
                    }
                    break;
            }
        } )
    }

    //$app - > get( '/paints/:id', 'getPaint' );
    test_getPaint2( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {



        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );

        //this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        site.request( rest.enumRequestVerb.POST, "paints", "" + this._paint.id, function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail( result.error(), "test_getPaint" );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID 
                    var serviceReturn = result.value();

                    if ( serviceReturn.status === "success" ) {
                        console.log( "test_getPaint:" + JSON.stringify( serviceReturn.value ) );
                        //this._paint.id = ( <Paints>serviceReturn.value ).id;
                        cbSuccess( "test_getPaint" );
                    } else {
                        var s: string = "status: Failed - " + ( <string>serviceReturn.error.message );
                        cbFail( Error( s ), "test_getPaint" );
                    }
                    break;
            }
        } )
    }

    test_getPaint() {
        var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );

        //this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        site.request( rest.enumRequestVerb.POST, "paints", "" + this._paint.id, function ( result: core.CallbackSignatureReturn ) {
            switch ( result.status() ) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    //cbFail( result.error(), "test_getPaint" );
                    core.app().PubSub.publish( new MsgGetPaintsTested );
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID 
                    var serviceReturn = result.value();

                    if ( serviceReturn.status === "success" ) {
                        console.log( "test_getPaint:" + JSON.stringify( serviceReturn.value ) );
                        //this._paint.id = ( <Paints>serviceReturn.value ).id;
                        //cbSuccess( "test_getPaint" );
                        core.app().PubSub.publish(new MsgGetPaintsTested() );
                    } else {
                        var s: string = "status: Failed - " + ( <string>serviceReturn.error.message );
                        //cbFail( Error( s ), "test_getPaint" );
                        core.app().PubSub.publish( new MsgGetPaintsTested );
                    }
                    break;
            }
        } )
    }

}

var globImageUploaded: string;
function uploadFile() {
    var fd = new FormData();
    fd.append( "fileToUpload", (<HTMLInputElement>document.getElementById( "fileToUpload" )).files[0] );
    fd.append( "submit", document.getElementById( "form1" ) );

    var site = new rest.RESTRequest( "http://cpairelasjunies.com/rest.php/" );
    site.request( rest.enumRequestVerb.POST, "pictures", fd, function ( result: core.CallbackSignatureReturn ) {
        switch ( result.status() ) {
            case core.eCallbackSignatureStatus.error:
                //Fail
                document.getElementById( "fileUploadResult" ).innerHTML = "Upload failed>>" + result.error() + "<<<";
                break;
            case core.eCallbackSignatureStatus.ok:
                //succeed?

                //check the returned value and collect the ID 
                var restReturn = result.value();
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
    core.setApp( window, true );
}

class MsgTestStart implements core.pubsub.IPubSubMsg{
}

class MsgPostPaintsTested implements core.pubsub.IPubSubMsg{
}

class MsgGetPaintsTested implements core.pubsub.IPubSubMsg{
}

var paintsTests = new restPaintsTests();

function startTest() {
    //shows the result div
    var testDivEl = document.getElementById( "testDivResult" );
    testDivEl.style.display = "block";


    //var testExecution = new tsUnit.Test();
    
    //testExecution.addTestClass( new restPicturesTests( globImageUploaded),"restPicturesTests" );
    //testExecution.addTestClass( new restPaintsTests( ), "restPaintsTests" );
    //testExecution.run( document.getElementById( 'testDivResult' ) );
 
    core.app().PubSub.subscribe( new MsgTestStart(), function ( MsgTestStart ) {
        paintsTests.test_postPaint();
    } );
    core.app().PubSub.subscribe( new MsgPostPaintsTested(), function ( MsgPostPaintsTested ) {
        paintsTests.test_getPaint();
    } );
    core.app().PubSub.publish( new MsgTestStart());
}

