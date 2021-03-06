

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                g1ParallelCoordinatesPlexx.loadCsvData(reader.result, ',');
                g1ParallelCoordinatesPlexx.draw();
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
}

/*
var cerealCsv ='name,mfr,type,calories,protein,fat,sodium,fiber,carbo,sugars,potass,vitamins,shelf,weight,cups,rating\n' +
'100% Bran,N,C,70,4,1,130,10,5,6,280,25,3,1,0.33,68.402\n'+
    '100% Natural Bran,Q,C,120,3,5,15,2,8,8,135,0,3,1,1,33.983\n'+
'All-Bran,K,C,70,4,1,260,9,7,5,320,25,3,1,0.33,59.425\n'+
'All-Bran with Extra Fiber,K,C,50,4,0,140,14,8,0,330,25,3,1,0.5,93.704\n'+
'Almond Delight,R,C,110,2,2,200,1,14,8,-1,25,3,1,0.75,34.384\n'+
'Apple Cinnamon Cheerios,G,C,110,2,2,180,1.5,10.5,10,70,25,1,1,0.75,29.509\n'+
'Apple Jacks,K,C,110,2,0,125,1,11,14,30,25,2,1,1,33.174\n'+
'Basic 4,G,C,130,3,2,210,2,18,8,100,25,3,1.33,0.75,37.038\n'+
'Bran Chex,R,C,90,2,1,200,4,15,6,125,25,1,1,0.67,49.120\n'+
'Bran Flakes,P,C,90,3,0,210,5,13,5,190,25,3,1,0.67,53.3133\n'+
'CapnCrunch,Q,C,120,1,2,220,0,12,12,35,25,2,1,0.75,18.042\n'+
'Cheerios,G,C,110,6,2,290,2,17,1,105,25,1,1,1.25,50.764\n'+
'Cinnamon Toast Crunch,G,C,120,1,3,210,0,13,9,45,25,2,1,0.75,19.823\n'+
'Clusters,G,C,110,3,2,140,2,13,7,105,25,3,1,0.5,40.400\n'+
'Cocoa Puffs,G,C,110,1,1,180,0,12,13,55,25,2,1,1,22.736\n'+
'Corn Chex,R,C,110,2,0,280,0,22,3,25,25,1,1,1,41.445\n'+
'Corn Flakes,K,C,100,2,0,290,1,21,2,35,25,1,1,1,45.863\n'+
'Corn Pops,K,C,110,1,0,90,1,13,12,20,25,2,1,1,35.782\n'+
'Count Chocula,G,C,110,1,1,180,0,12,13,65,25,2,1,1,22.396\n'+
'Cracklin Oat Bran,K,C,110,3,3,140,4,10,7,160,25,3,1,0.5,40.448\n'+
'Cream of Wheat (Quick),N,H,100,3,0,80,1,21,0,-1,0,2,1,1,64.533\n'+
'Crispix,K,C,110,2,0,220,1,21,3,30,25,3,1,1,46.895\n'+
'Crispy Wheat & Raisins,G,C,100,2,1,140,2,11,10,120,25,3,1,0.75,36.176\n'+
'Double Chex,R,C,100,2,0,190,1,18,5,80,25,3,1,0.75,44.330';

g1ParallelCoordinatesPlexx.loadCsvData(cerealCsv, ',');
g1ParallelCoordinatesPlexx.draw();
    */