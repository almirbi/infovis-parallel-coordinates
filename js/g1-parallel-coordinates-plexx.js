/**
 * Created by almir on 30/06/15.
 */

var g1ParallelCoordinatesPlexx = {
    data: null,
    canvasWidth: 1400,
    canvasHeight: 900,
    backgroundColor: '#ffffff',
    parallelCoordinatesCanvas: null,
    lineWidth: 0.5,
    polylineWidth: 0.5,
    lineColour: '#000000',
    renderContext: null,
    divId: 'g1',
    columns: new Object,
    nameColumnIndex: 0,
    loadCsvData: function (strData, strDelimiter) {
        this.data = null;
        var container = document.getElementById('g1');
        container.innerHTML = '';
        this.columns = new Object;
        this.renderContext = null;
        this.parallelCoordinatesCanvas = null;

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
        return this.canvasHeight * 0.8;
    },
    draw: function () {
        this.renderContext = new Plexx.RenderContext(this.divId);
        this.parallelCoordinatesCanvas = new Plexx.CanvasNode(this.canvasWidth, this.canvasHeight, this.backgroundColor);

        var axes = this.data[0];

        var y1 = this.getVerticalAxisY1();
        var y2 = this.getVerticalAxisY2();

        for (var i = 0; i < axes.length; i++) {

            if(i == this.nameColumnIndex) continue;

            var x1 = this.getVerticalAxisX1(i);
            var x2 = this.getVerticalAxisX2(i);

            this.parallelCoordinatesCanvas.add(
                new Plexx.Line(x1, y1, x2, y2, this.lineWidth, Constants.LineType.Default, this.lineColour));

            this.parallelCoordinatesCanvas.add(
                new Plexx.Text(axes[i], x1, 20 + y2, "#000000", 8, "Verdana", "left", "middle"));
        }

        this.populateColumns();

        for (i = 0; i < axes.length; i++) {

            if(i == this.nameColumnIndex) continue;

            if(this.columns[axes[i]]['type'] == 'string') {
                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }
                var unique = this.columns[axes[i]].filter( onlyUnique );
                var spacing = (y2 - y1) / unique.length;
                for(var j = 0; j < unique.length; j++) {
                    this.columns[axes[i]]['map'][unique[j]] = spacing * j + this.canvasHeight * 0.2;
                }
            }

            var min = Math.min.apply(null, this.columns[axes[i]]);
            var max = Math.max.apply(null, this.columns[axes[i]]);

            //var tickScale = new TickScale();
            //tickScale.setMinMaxPointsTicks(min, max, this.columns[axes[i]]);

            //getTickSpacing, getRoundedMin, getRoundedMax

            /*
            var tick = tickScale.getRoundedMin();
            var k = 0;
            while (tick < tickScale.getRoundedMax()) {
                this.parallelCoordinatesCanvas.add(
                    new Plexx.Text(tick, this.getVerticalAxisX1(k), this.getVerticalAxisY1() + 100, "#000000", 10, "Verdana", "left", "middle"));
                this.parallelCoordinatesCanvas.add(
                    new Plexx.Line(this.getVerticalAxisX1(k) - 10,
                        this.getVerticalAxisY1() + 100,
                        this.getVerticalAxisX1(k),
                        this.getVerticalAxisY1() + 100,
                        2,
                        Constants.LineType.Default,
                        "#000000"));
                k++;
                tick += tickScale.getTickSpacing();
            }
            */

            if (max == min) {
                min = 0;
            }

            if (max == 00 && min == 0) {
                max = 100;
                min = 0;
            }

            var R = (y2 - y1) / (max - min);
            this.columns[axes[i]]['R'] = R;
            this.columns[axes[i]]['max'] = max;
            this.columns[axes[i]]['min'] = min;
        }

        for (i = 1; i < this.data.length; i++) {
            var row = this.data[i];
            var points = [];
            for (var j = 0; j < row.length; j++) {
                if(j == this.nameColumnIndex) continue;

                if(this.columns[axes[j]]['type'] == 'string') {
                    var y = this.columns[axes[j]]['map'][row[j]];
                    points.push(this.getVerticalAxisX1(j));
                    points.push(y);

                    continue;
                }

                R = this.columns[axes[j]]['R'];
                max = this.columns[axes[j]]['max'];
                min = this.columns[axes[j]]['min'];
                var y = (row[j] - min) * R + y1;

                points.push(this.getVerticalAxisX1(j));
                points.push(y);
            }
            this.parallelCoordinatesCanvas.add(new Plexx.PolyLine(points, this.polylineWidth, Constants.LineType.Default, '#4682b4'));
        }

        this.parallelCoordinatesCanvas.render(this.renderContext);
    },
    populateColumns: function() {
        for(var i = 0; i < this.data[0].length; i ++) {
            this.columns[this.data[0][i]] = [];
            for(var j = 1; j < this.data.length; j++) {
                var value = this.data[j][i];
                if (!isNaN(parseFloat(value))) {
                    this.columns[this.data[0][i]].push(parseFloat(value));
                    this.columns[this.data[0][i]]['type'] = 'numeric';
                } else {
                    this.columns[this.data[0][i]].push(value);
                    this.columns[this.data[0][i]]['type'] = 'string';
                }
            }
        }
    }
}