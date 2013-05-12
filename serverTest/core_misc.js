var core;
(function (core) {
    (function (misc) {
        function getObjectClass(obj) {
            if(obj && obj.constructor && obj.constructor.toString) {
                var arr = obj.constructor.toString().match(/function\s*(\w+)/);
                if(arr && arr.length == 2) {
                    return arr[1];
                }
            }
            return undefined;
        }
        misc.getObjectClass = getObjectClass;
        function GUID_new() {
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
        }
        misc.GUID_new = GUID_new;
        ;
    })(core.misc || (core.misc = {}));
    var misc = core.misc;
})(core || (core = {}));
//@ sourceMappingURL=core_misc.js.map
