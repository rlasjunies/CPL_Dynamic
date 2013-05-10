var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="model/paints.ts" />
/// <reference path="RESTRequest.ts" />
/// <reference path="tsUnit.ts" />
/* PICTURES */
var restPicturesTests = (function (_super) {
    __extends(restPicturesTests, _super);
    function restPicturesTests(image) {
        _super.call(this);
        this._imageCreatedForTest = image;
    }
    restPicturesTests.prototype.test_getListOfPictures = //$app - > get( '/pictures', 'getPictures' );
    function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        site.request(rest.enumRequestVerb.GET, "pictures", "", function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail(result.error(), "test_getListOfPictures");
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var restReturn = result.value();
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
    restPicturesTests.prototype.test_deletePicture = //$app - > delete ( '/pictures/:id', 'deletePicture' );
    function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        site.request(rest.enumRequestVerb.DELETE, "pictures/" + this._imageCreatedForTest, "", function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail(result.error(), "test_deletePicture");
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var restReturn = result.value();
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
})(tsUnit.TestClass);
//$app - > post( '/pictures', 'addPicture' );
//test_postPicture( cbFail: ( err: Error, testMethod: string ) => void , cbSuccess: ( testMethod: string ) => void ) {
// Not succeed
//}
/*  PAINTS  */
var restPaintsTests = (function (_super) {
    __extends(restPaintsTests, _super);
    function restPaintsTests() {
        _super.apply(this, arguments);

    }
    restPaintsTests.prototype.test_postPaint2 = //$app - > get( '/paints', 'getPaints' );
    //$app - > options( '/paints', 'getPaints' );
    //$app - > get( '/paints/search/:query', 'findByName' );
    //$app - > put( '/paints/:id', 'updatePaint' );
    //$app - > delete ( '/paints/:id', 'deletePaint' );
    //$app - > post( '/paints', 'addPaint' );
    function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        this._paint = new Paints("notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg");
        var that = this;
        site.request(rest.enumRequestVerb.POST, "paints", this._paint, function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail(result.error(), "test_postPaint");
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var serviceReturn = result.value();
                    if(serviceReturn.status === "success") {
                        console.log("test_postPaint:" + JSON.stringify(serviceReturn.value));
                        that._paint.id = serviceReturn.value.id;
                        cbSuccess("test_postPaint");
                    } else {
                        var s = "status: Failed - " + (serviceReturn.error.message);
                        cbFail(Error(s), "test_postPaint");
                    }
                    break;
            }
        });
    };
    restPaintsTests.prototype.test_postPaint = function () {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        this._paint = new Paints("notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg");
        var that = this;
        site.request(rest.enumRequestVerb.POST, "paints", this._paint, function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    //cbFail( result.error(), "test_postPaint" );
                    core.app().PubSub.publish(new MsgPostPaintsTested());
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var serviceReturn = result.value();
                    if(serviceReturn.status === "success") {
                        console.log("test_postPaint:" + JSON.stringify(serviceReturn.value));
                        that._paint.id = serviceReturn.value.id;
                        //cbSuccess( "test_postPaint" );
                        core.app().PubSub.publish(new MsgPostPaintsTested());
                    } else {
                        var s = "status: Failed - " + (serviceReturn.error.message);
                        //cbFail( Error( s ), "test_postPaint" );
                        core.app().PubSub.publish(new MsgPostPaintsTested());
                    }
                    break;
            }
        });
    };
    restPaintsTests.prototype.test_getPaint2 = //$app - > get( '/paints/:id', 'getPaint' );
    function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        //this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        site.request(rest.enumRequestVerb.POST, "paints", "" + this._paint.id, function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    cbFail(result.error(), "test_getPaint");
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var serviceReturn = result.value();
                    if(serviceReturn.status === "success") {
                        console.log("test_getPaint:" + JSON.stringify(serviceReturn.value));
                        //this._paint.id = ( <Paints>serviceReturn.value ).id;
                        cbSuccess("test_getPaint");
                    } else {
                        var s = "status: Failed - " + (serviceReturn.error.message);
                        cbFail(Error(s), "test_getPaint");
                    }
                    break;
            }
        });
    };
    restPaintsTests.prototype.test_getPaint = function () {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        //this._paint = new Paints( "notDefined", "testName", "testDescription", "testYear 2013 May 5", "test/pictures/azertyuiop.jpg" );
        site.request(rest.enumRequestVerb.POST, "paints", "" + this._paint.id, function (result) {
            switch(result.status()) {
                case core.eCallbackSignatureStatus.error:
                    //Fail
                    //cbFail( result.error(), "test_getPaint" );
                    core.app().PubSub.publish(new MsgGetPaintsTested());
                    break;
                case core.eCallbackSignatureStatus.ok:
                    //succeed?
                    //check the returned value and collect the ID
                    var serviceReturn = result.value();
                    if(serviceReturn.status === "success") {
                        console.log("test_getPaint:" + JSON.stringify(serviceReturn.value));
                        //this._paint.id = ( <Paints>serviceReturn.value ).id;
                        //cbSuccess( "test_getPaint" );
                        core.app().PubSub.publish(new MsgGetPaintsTested());
                    } else {
                        var s = "status: Failed - " + (serviceReturn.error.message);
                        //cbFail( Error( s ), "test_getPaint" );
                        core.app().PubSub.publish(new MsgGetPaintsTested());
                    }
                    break;
            }
        });
    };
    return restPaintsTests;
})(tsUnit.TestClass);
var globImageUploaded;
function uploadFile() {
    var fd = new FormData();
    fd.append("fileToUpload", (document.getElementById("fileToUpload")).files[0]);
    fd.append("submit", document.getElementById("form1"));
    var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
    site.request(rest.enumRequestVerb.POST, "pictures", fd, function (result) {
        switch(result.status()) {
            case core.eCallbackSignatureStatus.error:
                //Fail
                document.getElementById("fileUploadResult").innerHTML = "Upload failed>>" + result.error() + "<<<";
                break;
            case core.eCallbackSignatureStatus.ok:
                //succeed?
                //check the returned value and collect the ID
                var restReturn = result.value();
                document.getElementById("fileUploadedID").innerHTML = restReturn.status;
                console.log(restReturn.value.id);
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
    core.setApp(window, true);
};
var MsgTestStart = (function () {
    function MsgTestStart() { }
    return MsgTestStart;
})();
var MsgPostPaintsTested = (function () {
    function MsgPostPaintsTested() { }
    return MsgPostPaintsTested;
})();
var MsgGetPaintsTested = (function () {
    function MsgGetPaintsTested() { }
    return MsgGetPaintsTested;
})();
var paintsTests = new restPaintsTests();
function startTest() {
    //shows the result div
    var testDivEl = document.getElementById("testDivResult");
    testDivEl.style.display = "block";
    //var testExecution = new tsUnit.Test();
    //testExecution.addTestClass( new restPicturesTests( globImageUploaded),"restPicturesTests" );
    //testExecution.addTestClass( new restPaintsTests( ), "restPaintsTests" );
    //testExecution.run( document.getElementById( 'testDivResult' ) );
    core.app().PubSub.subscribe(new MsgTestStart(), function (MsgTestStart) {
        paintsTests.test_postPaint();
    });
    core.app().PubSub.subscribe(new MsgPostPaintsTested(), function (MsgPostPaintsTested) {
        paintsTests.test_getPaint();
    });
    core.app().PubSub.publish(new MsgTestStart());
}
//@ sourceMappingURL=tests.js.map
