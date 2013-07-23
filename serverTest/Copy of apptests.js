/// <reference path="model/picturesTests.ts" />
/// <reference path="model/paintsTests.ts" />
/// <reference path="Scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="core.ts" />
/// <reference path="core_pubsub.ts" />
/// <reference path="core_restAPI.ts" />
/// <reference path="model/paints.ts" />
var globImageUploaded;
function uploadFile() {
    var fd = new FormData();
    fd.append("fileToUpload", (document.getElementById("fileToUpload")).files[0]);
    fd.append("submit", document.getElementById("form1"));

    var site = new rest.RESTRequest("http://cpairelasjunies.com/php/");
    site.request(rest.eRequestVerb.POST, "pictures", fd, function (result) {
        switch (result.status()) {
            case rest.enumRestStatus.failed:
                //Fail
                document.getElementById("fileUploadResult").innerHTML = "Upload failed>>" + result.error() + "<<<";
                break;
            case rest.enumRestStatus.success:
                //succeed?
                //check the returned value and collect the ID
                var restReturn = result.response();
                document.getElementById("fileUploadedID").innerHTML = restReturn.status;
                core.Logger.log(restReturn.value.id);

                //Prepare the test panel
                var testDivFileId = document.getElementById("testDivFileId");
                testDivFileId.innerHTML = restReturn.value.id;
                globImageUploaded = restReturn.value.id;

                var divToShow = document.getElementById("testDivStart");
                divToShow.style.display = "block";

                break;
        }
    });
}

window.onload = function () {
    _app = new core.App(window, false);

    //core.app = new core.App(window, false);
    subscribe(new cmdStartTest(), function (cmdStartTest) {
        picturesTests.test_getListOfPictures();
        picturesTests.test_deletePicture(globImageUploaded);
        paintsTests.test_postPaint(createPaintTestID);
        paintsTests.test_getAll();
    });

    subscribe(new evtTestFinished(null, null, null), function (evt) {
        if ((evt.passed) && (evt.guid === createPaintTestID)) {
            paintsTests.test_getPaint(getPaintTestID);
        } else if ((evt.passed) && (evt.guid === getPaintTestID)) {
            paintsTests.test_UpdatePaint(updatePaintTestID);
        } else if ((evt.passed) && (evt.guid === updatePaintTestID)) {
            paintsTests.test_DeletePaint(deletePaintTestID);
        }
    });

    subscribe(new cmdTestAdd("", "", ""), function (cmd) {
        $("#listResult").append("<li id='" + cmd.guid + "' group='" + cmd.group + "' ><h3>" + cmd.name + "</h3><p style='color:white' id='" + cmd.guid + "result'></p></li>");
        $("#listResult").listview("refresh");
    });

    subscribe(new evtTestFinished("", true, ""), function (evt) {
        var s = evt.message.substr(0, 100) + (evt.message.length > 100 ? " ..." : "");
        if (evt.passed) {
            $("#" + evt.guid + ">:first").addClass("good");
            $("#" + evt.guid + ">:first").html($("#" + evt.guid + ">:first").html() + "... passed");
            $("#" + evt.guid + "result").html(s);
            $("#" + evt.guid).wrapInner("<a href='/' style='text-decoration:none'>");
            $("#testDivResultSucceed").html("" + (parseInt($("#testDivResultSucceed").html()) + 1));
        } else {
            $("#" + evt.guid + ">:first").addClass("bad");
            $("#" + evt.guid + ">:first").html($("#" + evt.guid + ">:first").html() + "... failed");
            $("#" + evt.guid + "result").html(s);
            $("#" + evt.guid).wrapInner("<a href='/index.php' style='text-decoration:none'>");
            $("#testDivResultFailed").html("" + (parseInt($("#testDivResultFailed").html()) + 1));
        }
        $("#listResult").listview("refresh");
    });

    $.mobile.listview.prototype.options.autodividersSelector = function (elt) {
        var text = $.trim(elt.attr("group")) || null;
        if (!text) {
            return null;
        }
        return text;
    };
};

var cmdStartTest = (function () {
    function cmdStartTest() {
    }
    return cmdStartTest;
})();
var cmdTestAdd = (function () {
    function cmdTestAdd(guid, group, name) {
        this.guid = guid;
        this.group = group;
        this.name = name;
    }
    return cmdTestAdd;
})();
var evtTestFinished = (function () {
    function evtTestFinished(guid, passed, message) {
        this.guid = guid;
        this.passed = passed;
        this.message = message;
    }
    return evtTestFinished;
})();

//Event registration
var createPaintTestID = core.misc.GUID_new();
var getPaintTestID = core.misc.GUID_new();
var updatePaintTestID = core.misc.GUID_new();
var deletePaintTestID = core.misc.GUID_new();

function startTest() {
    //Clean the result page before the tests
    $("#testDivResultSucceed").html("0");
    $("#testDivResultFailed").html("0");
    $("#listResult").empty();
    $.mobile.changePage("#pageTestResult");

    //shows the result div
    //paintsTests = new restPaintsTests( "http://cpairelasjunies.com/php/" );
    var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
    paintsTests = new models.paints.PaintsTests(site, _app);
    picturesTests = new models.pictures.PicturesTests(site, _app, globImageUploaded);

    publish(new cmdStartTest());
}

var picturesTests;
var paintsTests;
var _app;

//var _app: core.App;
//function core.app: core.App {
//    if (_app == null) { _app = new core.App(null)  };
//    return _app;
//}
function subscribe(msg, callback, args) {
    //return core.app.PubSub.subscribe( msg, callback, args );
    return _app.PubSub.subscribe(msg, callback, args);
}
function publish(msg) {
    _app.PubSub.publish(msg);
}
//@ sourceMappingURL=Copy of apptests.js.map
