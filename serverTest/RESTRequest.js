/// <reference path="core.ts" />
var rest;
(function (rest) {
    (function (enumRequestVerb) {
        enumRequestVerb._map = [];
        enumRequestVerb._map[0] = "GET";
        enumRequestVerb.GET = 0;
        enumRequestVerb._map[1] = "POST";
        enumRequestVerb.POST = 1;
        enumRequestVerb._map[2] = "PUT";
        enumRequestVerb.PUT = 2;
        enumRequestVerb._map[3] = "DELETE";
        enumRequestVerb.DELETE = 3;
    })(rest.enumRequestVerb || (rest.enumRequestVerb = {}));
    var enumRequestVerb = rest.enumRequestVerb;
    ;
    function enumRequestVerb_String(verb) {
        var sVerb;
        if(verb === enumRequestVerb.GET) {
            sVerb = "GET";
        } else if(verb === enumRequestVerb.POST) {
            sVerb = "POST";
        } else if(verb === enumRequestVerb.PUT) {
            sVerb = "PUT";
        } else if(verb == enumRequestVerb.DELETE) {
            sVerb = "DELETE";
        }
        return sVerb;
    }
    rest.enumRequestVerb_String = enumRequestVerb_String;
    var RESTRequest = (function () {
        function RESTRequest(url) {
            this.__url = url;
        }
        RESTRequest.prototype.request = function (verb, additionalUrl, postData, callback) {
            var xhr = new XMLHttpRequest();
            try  {
                xhr.open(enumRequestVerb_String(verb), this.__url + additionalUrl, true);
                xhr.onload = function (evt) {
                    var xhrResponse = function () {
                        try  {
                            return JSON.parse(xhr.responseText);
                        } catch (ex) {
                            return xhr.responseText;
                        }
                    };
                    callback(new core.CallbackSignatureReturn(core.eCallbackSignatureStatus.ok, xhrResponse()));
                };
                xhr.onerror = function (err) {
                    callback(new core.CallbackSignatureReturn(core.eCallbackSignatureStatus.error, "", //new Error( 0, 'Woops, there was an error making the request.$1', [new core.ErrorParam( "$1", e )] )
                    new Error(err.message)));
                };
                if(postData) {
                    if(typeof (postData) === "string") {
                        xhr.send(JSON.stringify(postData));
                    } else {
                        xhr.send(postData);
                    }
                } else {
                    xhr.send();
                }
            } catch (ex) {
                core.app().log(core.eLogSeverity.critical, ex);
                throw ex;
            }
        };
        return RESTRequest;
    })();
    rest.RESTRequest = RESTRequest;    
})(rest || (rest = {}));
//@ sourceMappingURL=RESTRequest.js.map
