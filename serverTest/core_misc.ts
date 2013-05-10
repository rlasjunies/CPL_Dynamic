module core.misc {
    /* Returns the class name of the argument or undefined if
   it's not a valid JavaScript object.
    */
    export function getObjectClass( obj ): string {
        if ( obj && obj.constructor && obj.constructor.toString ) {
            var arr = obj.constructor.toString().match(
                /function\s*(\w+)/ );

            if ( arr && arr.length == 2 ) {
                return arr[1];
            }
        }

        return undefined;
    }
}
