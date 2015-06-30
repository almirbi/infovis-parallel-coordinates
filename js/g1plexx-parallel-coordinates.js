/**
 * Created by almir on 30/06/15.
 */

var g1ParallelCoordinatesPlexx = {
    data: null,
    canvasWidth: 800,
    canvasHeight: 500,
    backgroundColor: '#ffffff',
    parallelCoordinatesCanvas: null,
    lineWidth: 1,
    lineColour: '#000000',
    renderContext: null,
    divId: 'g1',
    loadCsvData: function (strData, strDelimiter) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        this.data = arrData;
    },
    getVerticalAxisX1: function(i) {
        var parallelAxesSpacing = parseInt(this.canvasWidth * 0.8 / (this.data[0].length - 1));
        return parallelAxesSpacing * i + parseInt(this.canvasWidth * 0.1);
    },
    getVerticalAxisY1: function() {
        return this.canvasHeight * 0.2;
    },
    getVerticalAxisX2: function(i) {
        return this.getVerticalAxisX1(i);
    },
    getVerticalAxisY2: function() {
        return this.canvasHeight * 0.2;
    },
    draw: function () {
        this.renderContext = new Plexx.RenderContext(this.divId);
        this.parallelCoordinatesCanvas = new Plexx.CanvasNode(this.canvasWidth, this.canvasHeight, this.backgroundColor);

        var axes = this.data[0];

        for(var i = 0; i < axes.length; i++) {

            var x1 = this.getVerticalAxisX1(i);
            var y1 = this.getVerticalAxisY1();

            var x2 = this.getVerticalAxisX2(i);
            var y2 = this.getVerticalAxisY2();

            this.parallelCoordinatesCanvas.add(
                new Plexx.Line(x1, y1, x2, y2, this.lineWidth, Constants.LineType.Default, this.lineColour));

            this.parallelCoordinatesCanvas.add(
                new Plexx.Text(axes[i], x1, 20 + y2, "#000000", 10, "Verdana", "left", "middle"));
        }


        for	(i = 1; i < data.length; i++) {

            var row = data[i];
            var points = [];

            for (var j = 0; j < row.length; j++) {
                points.push(this.getVerticalAxisX1(j));
                points.push();
            }

            //var point2=(Math.abs(data[i].acc-minimum_acc)/ratio_acc)+400;
            //
            //var point4=(Math.abs(data[i].year-minimum_year)/ratio_year)+400;
            //console.log(point1+"-"+point2)
            points = [ 100, point1, 200, point2, 300, point3,400, point4,500, point5,600, point6,700, point7];
            this.parallelCoordinatesCanvas.add(new Plexx.PolyLine(points, 1, Constants.LineType.Default,'#4682b4'));

        }



        this.parallelCoordinatesCanvas.render(this.renderContext);
    }
}