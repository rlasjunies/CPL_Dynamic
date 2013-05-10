var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var restPicturesTests = (function (_super) {
    __extends(restPicturesTests, _super);
    function restPicturesTests() {
        _super.apply(this, arguments);

    }
    restPicturesTests.prototype.test_getListOfPictures = function (cbFail, cbSuccess) {
        var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
        site.request(rest.enumRequestVerb.GET, "pictures", "", function (result) {
            switch(result.status()) {
                case core.enumCallbackSignatureStatus.error:
                    cbFail(result.error());
                    break;
                case core.enumCallbackSignatureStatus.ok:
                    cbSuccess();
                    break;
            }
        });
    };
    return restPicturesTests;
})(tsUnit.TestClass);
exports.restPicturesTests = restPicturesTests;
var app;
window.onload = function () {
    app = new core.claApp(window, true);
};
var testExecution = new tsUnit.Test();
testExecution.addTestClass(new restPicturesTests(), "GroupTest");
testExecution.run(document.getElementById('testsResult'));
