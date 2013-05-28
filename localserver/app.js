var restPicturesTests = (function () {
    function restPicturesTests(image) {
        this._imageCreatedForTest = image;
    }
    restPicturesTests.prototype.test_getListOfPictures = function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/php/");
        site.request(rest.eRequestVerb.GET, "pictures", "", function (result) {
            switch(result.status()) {
                case rest.enumRestStatus.failed:
                    cbFail(result.error(), "test_getListOfPictures");
                    break;
                case rest.enumRestStatus.success:
                    var restReturn = result.response();
                    if(restReturn.status === "success") {
                        console.log(JSON.stringify(restReturn.value));
                        cbSuccess("test_getListOfPictures");
                    } else {
                        var s = "status: Failed - " + (restReturn.error.message);
                        cbFail(Error(s), "test_getListOfPictures");
                    }
                    break;
            }
        });
    };
    restPicturesTests.prototype.test_deletePicture = function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/php/");
        site.request(rest.eRequestVerb.DELETE, "pictures/" + this._imageCreatedForTest, "", function (result) {
            switch(result.status()) {
                case rest.enumRestStatus.failed:
                    cbFail(result.error(), "test_deletePicture");
                    break;
                case rest.enumRestStatus.success:
                    var restReturn = result.response();
                    if(restReturn.status === "success") {
                        console.log(JSON.stringify(restReturn.value));
                        cbSuccess("test_deletePicture");
                    } else {
                        var s = "status: Failed - " + (restReturn.error.message);
                        cbFail(Error(s), "test_deletePicture");
                    }
                    break;
            }
        });
    };
    return restPicturesTests;
})();
var restPaintsTests = (function () {
    function restPaintsTests(website) {
        this._paints = new models.Paints(website);
    }
    restPaintsTests.prototype.test_postPaint = function (intestID) {
        var testID = intestID;
        app().PubSub.publish(new cmdTestAdd(testID, "Paints", "New"));
        var that = this;
        app().PubSub.subscribeOnce(new models.evtPaintNewed(null, null, null), function (evt, args) {
            if(evt.error) {
                app().PubSub.publish(new evtTestFinished(testID, false, "Failed creating Painting: " + evt.error));
            } else {
                that._paint.id = evt.value.id;
                app().PubSub.publish(new evtTestFinished(testID, true, "Painting created ID: " + evt.value.id));
                ;
            }
        });
        this._paint = new models.Paint("notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg");
        this._paints.new(this._paint);
    };
    restPaintsTests.prototype.test_UpdatePaint = function (intestID) {
        var testID = intestID;
        app().PubSub.publish(new cmdTestAdd(testID, "Paints", "Update"));
        var that = this;
        app().PubSub.subscribeOnce(new models.evtPaintUpdated(null, null, null), function (evt, args) {
            if(evt.error) {
                app().PubSub.publish(new evtTestFinished(testID, false, "Failed updating Painting: " + evt.error));
            } else {
                app().PubSub.publish(new evtTestFinished(testID, true, "Painting updated: " + JSON.stringify(evt.value)));
            }
        });
        this._paint.name = "updated";
        this._paint.description = "updated";
        this._paint.year = "updated";
        this._paint.picture = "updated";
        this._paints.update(this._paint.id, this._paint);
    };
    restPaintsTests.prototype.test_DeletePaint = function (intestID) {
        var testID = intestID;
        app().PubSub.publish(new cmdTestAdd(testID, "Paints", "Delete"));
        var that = this;
        app().PubSub.subscribeOnce(new models.evtPaintDeleted(null, null, null), function (evt, args) {
            if(evt.error) {
                app().PubSub.publish(new evtTestFinished(testID, false, "Failed deleting Painting: " + evt.error));
            } else {
                app().PubSub.publish(new evtTestFinished(testID, true, "Painting deleting ID: " + evt.value));
                ;
            }
        });
        this._paints.delete(this._paint.id);
    };
    restPaintsTests.prototype.test_getPaint = function (intestID) {
        var testID = intestID;
        app().PubSub.publish(new cmdTestAdd(testID, "Paints", "Get"));
        var that = this;
        app().PubSub.subscribeOnce(new models.evtPaintGetted(null, null, null), function (evt, args) {
            if(evt.error) {
                app().PubSub.publish(new evtTestFinished(testID, false, "Failed getting Painting ID: " + that._paint.id + " ..." + evt.error));
            } else {
                app().PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved: " + JSON.stringify(evt.value)));
            }
        });
        this._paints.get(this._paint.id);
    };
    restPaintsTests.prototype.test_getAll = function () {
        var testID = core.misc.GUID_new();
        app().PubSub.publish(new cmdTestAdd(testID, "Paints", "GetAll"));
        var that = this;
        app().PubSub.subscribeOnce(new models.evtPaintsGetted(null, null, null), function (evt, args) {
            if(evt.error) {
                app().PubSub.publish(new evtTestFinished(testID, false, "Failed getting all Painting ID: " + that._paint.id + " ..." + evt.error));
            } else {
                app().PubSub.publish(new evtTestFinished(testID, true, "Painting retrieved all: " + JSON.stringify(evt.value)));
            }
        });
        this._paints.getAll();
    };
    return restPaintsTests;
})();
var globImageUploaded;
function uploadFile() {
    var fd = new FormData();
    fd.append("fileToUpload", (document.getElementById("fileToUpload")).files[0]);
    fd.append("submit", document.getElementById("form1"));
    var site = new rest.RESTRequest("http://cpairelasjunies.com/php/");
    site.request(rest.eRequestVerb.POST, "pictures", fd, function (result) {
        switch(result.status()) {
            case rest.enumRestStatus.failed:
                document.getElementById("fileUploadResult").innerHTML = "Upload failed>>" + result.error() + "<<<";
                break;
            case rest.enumRestStatus.success:
                var restReturn = result.response();
                document.getElementById("fileUploadedID").innerHTML = restReturn.status;
                console.log(restReturn.value.id);
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
    _app = new core.App();
    subscribe(new cmdStartTest(), function (cmdStartTest) {
        $("#testDivResultSucceed").html("0");
        $("#testDivResultFailed").html("0");
        $("#listResult").empty();
        $.mobile.changePage("#pageTestResult");
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        paintsTests = new restPaintsTests(site);
        paintsTests.test_postPaint(createPaintTestID);
        paintsTests.test_getAll();
    });
    subscribe(new evtTestFinished(null, null, null), function (evt) {
        if((evt.passed) && (evt.guid === createPaintTestID)) {
            paintsTests.test_getPaint(getPaintTestID);
        } else if((evt.passed) && (evt.guid === getPaintTestID)) {
            paintsTests.test_UpdatePaint(updatePaintTestID);
        } else if((evt.passed) && (evt.guid === updatePaintTestID)) {
            paintsTests.test_DeletePaint(deletePaintTestID);
        }
    });
    subscribe(new cmdTestAdd(null, null, null), function (cmd) {
        $("#listResult").append("<li id='" + cmd.guid + "' group='" + cmd.group + "' ><h3>" + cmd.name + "</h3><p style='color:white' id='" + cmd.guid + "result'></p></li>");
        $("#listResult").listview("refresh");
    });
    subscribe(new evtTestFinished(null, null, null), function (evt) {
        var s = evt.message.substr(0, 100) + (evt.message.length > 100 ? " ..." : "");
        if(evt.passed) {
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
        if(!text) {
            return null;
        }
        return text;
    };
};
var cmdStartTest = (function () {
    function cmdStartTest() { }
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
var createPaintTestID = core.misc.GUID_new();
var getPaintTestID = core.misc.GUID_new();
var updatePaintTestID = core.misc.GUID_new();
var deletePaintTestID = core.misc.GUID_new();
var paintsTests;
var _app;
function app() {
    return _app;
}
function subscribe(msg, callback) {
    return app().PubSub.subscribe(msg, callback);
}
function publish(msg) {
    app().PubSub.publish(msg);
}
//@ sourceMappingURL=app.js.map
