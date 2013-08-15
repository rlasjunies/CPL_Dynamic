/// <reference path="models/paintsTests.ts" />
/// <reference path="core.ts" />
/// <reference path="models/picturesTests.ts" />
/// <reference path="libs/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="libs/typings/jquery/jquery.d.ts" />
/// <reference path="core_pubsub.ts" />
/// <reference path="core_restAPI.ts" />
/// <reference path="models/paints.ts" />

var globImageUploaded: string;
var picturesTests: models.pictures.PicturesTests;
var paintsTests: models.paints.PaintsTests;

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
                core.Logger.log( restReturn.value.id );

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
    var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
    gApp = new core.App( site );

    gApp.PubSub.subscribe( new cmdStartTest(), function ( cmdStartTest ) {
        picturesTests.test_getListOfPictures()
        picturesTests.test_deletePicture(globImageUploaded);
        paintsTests.test_postPaint(createPaintTestID);
        paintsTests.test_getAll();
    } );

    gApp.PubSub.subscribe( new evtTestFinished( null, null, null ), function ( evt: evtTestFinished ) {
        //start the other tests only when we have the paintID created
        if ( ( evt.passed ) && ( evt.guid === createPaintTestID ) ) {
            paintsTests.test_getPaint( getPaintTestID );
        } else if ( ( evt.passed ) && ( evt.guid === getPaintTestID ) ) {
            paintsTests.test_UpdatePaint( updatePaintTestID );
        } else if ( ( evt.passed ) && ( evt.guid === updatePaintTestID ) ) {
            paintsTests.test_DeletePaint( deletePaintTestID );
        }
    } );

    gApp.PubSub.subscribe( new cmdTestAdd( "", "", "" ), function ( cmd: cmdTestAdd ) {
        $( "#listResult" ).append( "<li id='" + cmd.guid + "' group='" + cmd.group +"' ><h3>" + cmd.name + "</h3><p style='color:white' id='" + cmd.guid + "result'></p></li>" )
        $( "#listResult" ).listview( "refresh" );
    } );

    gApp.PubSub.subscribe( new evtTestFinished( "", true, "" ), function ( evt: evtTestFinished ) {
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
    constructor ( public guid:string, public passed:boolean, public message: string){}
}

//Event registration
var createPaintTestID = core.misc.GUID_new();
var getPaintTestID = core.misc.GUID_new();
var updatePaintTestID = core.misc.GUID_new();
var deletePaintTestID = core.misc.GUID_new();

function startTest() {

    //Clean the result page before the tests
    $( "#testDivResultSucceed" ).html( "0" );
    $( "#testDivResultFailed" ).html( "0" );
    $( "#listResult" ).empty();
    $.mobile.changePage( "#pageTestResult" );

    paintsTests = new models.paints.PaintsTests( );
    picturesTests = new models.pictures.PicturesTests(globImageUploaded);

    gApp.PubSub.publish( new cmdStartTest());
}

//var _app: core.App;
//var _app: core.App;
//function core.app: core.App {
//    if (_app == null) { _app = new core.App(null)  };
//    return _app;
//}


//function subscribe(msg: core.pubsub.IPubSubMsg, callback: (msg: core.pubsub.IPubSubMsg, args?: any[]) => void , args?: any[]): core.pubsub.PubSubToken{
//    //return core.app.PubSub.subscribe( msg, callback, args );
//    return gApp.PubSub.subscribe(msg, callback, args);
//}
//function publish( msg: core.pubsub.IPubSubMsg ) {
//    gApp.PubSub.publish( msg );
//}


//new Request.JSON(
//{
//    url: '/list.json',
//    onSuccess: function ( json ) {
//        json.list.each( function ( key, val ) {
//            new Element( 'LI' )
//                .set( 'text', val )
//                .addEvent( 'click', function () {
//                    alert( 'item ' + key + ' pressed' );

//                    // alert('item '+val.id+' pressed');
//                    // considering val is an object instead of raw string, this way you must change set to something like this set('text', val.text)

//                } )
//                .inject( $( 'list' ) );
//            // any other thing you want add to your list item 
//        } );
//    }
//} ).get();

//<ul id = "list" > < / ul >