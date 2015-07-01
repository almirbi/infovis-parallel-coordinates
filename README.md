# Information Visualisation Parallel Coordinates

Creates a <canvas> element representing parallel coordinates visualisation for a loaded CSV file. Uses a object 
```javascript
g1ParallelCoordinatesPlexx 
```
to draw load a CSV string and draw the canvas.

# API

The main two functions are

```javascript
//loads a CSV string provided in the strData variable and using the strDelimiter provided (usually ',')
g1ParallelCoordinatesPlexx.loadCsvData: function (strData, strDelimiter) {...}

//draw the provided data into a canvas element
g1ParallelCoordinatesPlexx.draw: function () {...}

g1ParallelCoordinatesPlexx = {
    //width of the canvas
    canvasWidth: 1400,
    
    //height of the canvas
    canvasHeight: 900,
    
    //vertical axis line width
    lineWidth: 0.5,
    
    //polylines width
    polylineWidth: 0.5,
    
    //colour of the vertical axis
    lineColour: '#000000',
    
    //colour of the polylines
    polylineColour: '#4682b4',
    
    //the id of the container div
    divId: 'g1',
    
    //index of the column containing names
    nameColumnIndex: 0
}

```

# Example
```javascript
g1ParallelCoordinatesPlexx.canvasWidth = 1200;
g1ParallelCoordinatesPlexx.canvasHeight = 900;
g1ParallelCoordinatesPlexx.loadCsvData(csvString, ',');
g1ParallelCoordinatesPlexx.draw();
```
