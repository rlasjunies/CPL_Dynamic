/// <reference path="core.ts" />
/// <reference path="models/pictures.ts" />
/// <reference path="libs/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="libs/typings/jquery/jquery.d.ts" />
/// <reference path="core_pubsub.ts" />
/// <reference path="core_restAPI.ts" />
/// <reference path="models/paints.ts" />

class cmdLoadPaints implements core.pubsub.IPubSubMsg { };
class evtPaintsLoaded implements core.pubsub.IPubSubMsg { };

class cmdLoadPaint implements core.pubsub.IPubSubMsg { constructor(public paintId: string) { }  };
class evtPaintLoaded implements core.pubsub.IPubSubMsg { constructor(public paint: models.paints.Paint) { } };

class cmdUpdatePaint implements core.pubsub.IPubSubMsg { constructor(public paintId: string) { }};
class evtPaintUpdated implements core.pubsub.IPubSubMsg { constructor(public paint: models.paints.Paint) { } };

//class cmdJumpToPage_Paints
//class evtPageShowned-Paints
//class cmdJumpToPage_Paint
//class evtPageShowned_Paint
//class cmdJumpToPage_Pictures
//class evtPageShowned_Pictures

//class cmdQuit
//class cmdRequestLogin
//class evtUserLogged

window.onload = () => {
    var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
    gApp = new core.App(site);
    gSite = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");

    gApp.PubSub.subscribe(new cmdLoadPaints, function (cmdLoadPaint) {
        var ps: models.paints.Paints;
        ps = new models.paints.Paints();
        ps.getAll();
    });
    gApp.PubSub.subscribe(new models.paints.evtPaintsGetted(null,null,null), function (evt: models.paints.evtPaintsGetted) {
        ///TODO refrech the list of paints

        if (evt.error) {
            alert("error: loading the paintings data!!");
        } else {
            
        }


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

    });
}