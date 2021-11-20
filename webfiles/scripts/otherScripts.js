// Function to make feather icons work properly
(function () {
    'use strict'
    feather.replace({ 'aria-hidden': 'true' })
  })()
  
// alerts for the edit data forms on the edit data tab
$("#county-form").submit(function(event){
    alert("County added succesfully!");
})

$("#county-edit-form").submit(function(event){
    alert("County edited succesfully.");
})

$("#county-delete-form").submit(function(event){
    alert("County successfully deleted.");
})

//END ALERTS


//Function fetches the county passed in by name from the data base, and prints its information to the popup
function fetchCounty(county) {

    //Creating the http request
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", '/api/allcounties', true);
  
    //when the request finishes this loads
    req.onload = function () {
        //fetches all the counties
        var res = JSON.parse(req.responseText);
        for (i in res) {
            //parsing counties for the proper one
            if(res[i].name == county){
                //calls function to calculate weight of county based on our algorithm
                var weight = CalcCountyData(res[i]);
                //formatting and putting into popup
                document.getElementById('myPopup').innerText = 
                 'County: ' + res[i].name + '\n'
                + 'Average Water Temperature: ' + res[i].temperature + 'C\n'
                + 'Average Water pH: ' + res[i].pH + '\n'
                + 'Average Dissolved Oxygen Concentration: ' + res[i].dissolved_oxygen + 'mg/L\n'
                + 'Average Suspended Sediment Concentration: ' + res[i].suspended_sediment + 'mg/L\n'
                + 'Average Specific Conductance of the Water: ' + res[i].specific_conductance + 'uS/cm\n'
                + 'Our rating for this county: ' + weight; 
            }
        }

        popup();
    };
  
    req.send(null);
}

//Function displays the popup
function popup() {
    var popup = document.getElementById('myPopup');
    popup.classList.toggle("show", true);
  }

//Algorithm used to identify the weight of the county
function CalcCountyData(county)
{
    //calculated percent error from ideal values
    var pH = Math.abs((7.25-parseFloat(county.pH))/7.25) * 40;
    var disOxy = Math.abs((10.0-parseFloat(county.dissolved_oxygen))/10.0) * 30.0;
    var susPar = Math.abs((30.0-parseFloat(county.suspended_sediment))/30.0) * 20.0;
    var SpecCon = Math.abs((300.0-parseFloat(county.specific_conductance))/300.0) * 5.0;
    var weight = pH + disOxy + SpecCon + susPar;
    weight = weight.toFixed(2);
    return(weight);
} 

//function to input data into both best and worst tables
function rankCounties(){
    worstCounties();
    bestCounties();
}


//sends the http request to fetch the county data and calls findWorstCounties() to figure out the bottom 5
function worstCounties() {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", '/api/allcounties', true);
    req.onload = function () {
        var res = JSON.parse(req.responseText);
        var bCounties = findWorstCounties(res);
        for (let i = 0; i < 5; i ++){
            for (j in res) {
                if(res[j].name == bCounties[1][i]){
                    var temp = res[j].temperature;
                    var ph = res[j].pH;
                    var o2 = res[j].dissolved_oxygen;
                }
            }
            document.getElementById('county' + (i+1) + '-name-w').innerText = bCounties[1][i];
            document.getElementById('county' + (i+1) + '-temp-w').innerText = temp;
            document.getElementById('county' + (i+1) + '-ph-w').innerText = ph;
            document.getElementById('county' + (i+1) + '-do-w').innerText = o2;
            document.getElementById('county' + (i+1) + '-rating-w').innerText = bCounties[0][i];
        }
    };
  
    req.send(null);
}


//Algorithm that finds the bottom 5 worst counties by our rating, takes in the raw response data from the http request that returns all the county data in json format
function findWorstCounties(res){
    var topFive = [];
    var topFiveNames = [];
    topFive[0] = 0;
    topFive[1] = 0;
    topFive[2] = 0;
    topFive[3] = 0;
    topFive[4] = 0;
    for (k in res) {
        var weight = CalcCountyData(res[k]);
            for (let i = 0; i < 5; i++) {
                if(weight > topFive[i]){
                    for(let j = 4; j > i; j--){
                        topFive[j] = topFive[j-1];
                    }
                    topFive[i] = weight;
                    topFiveNames[i] = res[k].name;
                    break;
                }
              }
    }
    return [topFive, topFiveNames];
}


//sends the http request to fetch the county data and calls findBestCounties() to figure out the top 5
function bestCounties() {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", '/api/allcounties', true);
    req.onload = function () {
        var res = JSON.parse(req.responseText);
        var bCounties = findBestCounties(res);
        for (let i = 0; i < 5; i ++){
            for (j in res) {
                if(res[j].name == bCounties[1][i]){
                    var temp = res[j].temperature;
                    var ph = res[j].pH;
                    var o2 = res[j].dissolved_oxygen;
                }
            }
            document.getElementById('county' + (i+1) + '-name').innerText = bCounties[1][i];
            document.getElementById('county' + (i+1) + '-temp').innerText = temp;
            document.getElementById('county' + (i+1) + '-ph').innerText = ph;
            document.getElementById('county' + (i+1) + '-do').innerText = o2;
            document.getElementById('county' + (i+1) + '-rating').innerText = bCounties[0][i];
        }
    };
  
    req.send(null);
}

//Algorithm that finds the top 5 best counties by our rating, takes in the raw response data from the http request that returns all the county data in json format
function findBestCounties(res){
    var topFive = [];
    var topFiveNames = [];
    topFive[0] = 200;
    topFive[1] = 200;
    topFive[2] = 200;
    topFive[3] = 200;
    topFive[4] = 200;
    for (k in res) {
        var weight = CalcCountyData(res[k]);
            for (let i = 0; i < 5; i++) {
                if(weight < topFive[i]){
                    for(let j = 4; j > i; j--){
                        topFive[j] = topFive[j-1];
                    }
                    topFive[i] = weight;
                    topFiveNames[i] = res[k].name;
                    break;
                }
              }
    }
    return [topFive, topFiveNames];
}