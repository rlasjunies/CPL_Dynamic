var core;
(function (core) {
    (function (misc) {
        /* Returns the class name of the argument or undefined if
        it's not a valid JavaScript object.
        */
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
    })(core.misc || (core.misc = {}));
    var misc = core.misc;
})(core || (core = {}));
//@ sourceMappingURL=core_misc.js.map
