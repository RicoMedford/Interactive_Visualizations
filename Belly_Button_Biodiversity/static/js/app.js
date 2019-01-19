function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // data route
  
  
  var bioData = `/metadata/${sample}`

  d3.json(bioData).then(function(response) {
  
  console.log(response);
  
 var html = d3.select("#sample-metadata");

html.html("");

  var table = html.append("table");
  var tbody = table.append("tbody");
  var trow;

  Object.entries(response).forEach(([key, value]) => {
     trow = tbody.append("tr");
    var td = trow.append("td").text(`${key}`);
    trow.append("td").text(`${value}`);
  
  });
})

  // var trace = {
  //   type: "pie",
  //   value: "sample_values",
  //   labels: "otu_id",
   
  //   }
  // });

//console.log(bioData);


//   var data = [trace];
  
// Plotly.newPlot("plot", bioData);
//   };

// buildPlot();


    // Use d3 to select the panel with id of `#sample-metadata`
   
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  var url = "/samples/"+sample

  d3.json(url).then(function(response){
    console.log(response);
    var values = response.sample_values;
    var ids = response.otu_ids;

    console.log(ids);
console.log(values.slice(0, 10));

   var trace = {
    type: "pie",
    values: values.slice(0,10),
    labels: ids.slice(0,10)
   };
var data = [trace];
Plotly.newPlot("pie", data);





  });

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
