var cmdLoadPaints = (function () {
    function cmdLoadPaints() {
    }
    return cmdLoadPaints;
})();
;
var evtPaintsLoaded = (function () {
    function evtPaintsLoaded() {
    }
    return evtPaintsLoaded;
})();
;

var cmdLoadPaint = (function () {
    function cmdLoadPaint(paintId) {
        this.paintId = paintId;
    }
    return cmdLoadPaint;
})();
;
var evtPaintLoaded = (function () {
    function evtPaintLoaded(paint) {
        this.paint = paint;
    }
    return evtPaintLoaded;
})();
;

var cmdUpdatePaint = (function () {
    function cmdUpdatePaint(paintId) {
        this.paintId = paintId;
    }
    return cmdUpdatePaint;
})();
;
var evtPaintUpdated = (function () {
    function evtPaintUpdated(paint) {
        this.paint = paint;
    }
    return evtPaintUpdated;
})();
;

window.onload = function () {
    var site = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");
    gApp = new core.App(site);
    gSite = new rest.RESTRequest("http://cpairelasjunies.com/rest.php/");

    gApp.PubSub.subscribe(new cmdLoadPaints(), function (cmdLoadPaint) {
        var ps;
        ps = new models.paints.Paints();
        ps.getAll();
    });
    gApp.PubSub.subscribe(new models.paints.evtPaintsGetted(null, null, null), function (evt) {
        if (evt.error) {
            alert("error: loading the paintings data!!");
        } else {
        }
    });
};
//@ sourceMappingURL=appAdmin.js.map
