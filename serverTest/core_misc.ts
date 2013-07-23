module core.misc {
    export enum enumEntityStatus { success, failed }
    export interface IEntities {
        id: string;
    }
    export enum eLogSeverity { critical, warning, information }


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

    export function GUID_new():string {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString( 16 );
        } );
        return guid;
    };

}
