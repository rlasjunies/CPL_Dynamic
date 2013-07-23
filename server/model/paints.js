var LPCR;
(function (LPCR) {
    var Paints = (function () {
        function Paints(id, name, year, description, Image) {
            this.id = id;
            this.name = name;
            this.year = year;
            this.description = description;
            this.Image = Image;
        }
        return Paints;
    })();
    LPCR.Paints = Paints;    
})(LPCR || (LPCR = {}));
//@ sourceMappingURL=paints.js.map
