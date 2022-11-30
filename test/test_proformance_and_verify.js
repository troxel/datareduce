const reducedata = require("../../datareduce")

const downsampler = require("downsample-lttb")

const {largestTriangleThreeBucket} = require('d3fc-sample')
const llttd3 = largestTriangleThreeBucket();

loops = 1
reduced_size = 1000
dataset_size = 70000

//provide a series as an array of [x,y] pairs
var dataSeries = [[1,2],[2,2],[3,3],[4,3],[5,6],[6,3],[7,3],[8,5],[9,4],[10,4],[11,1],[12,2]];

for(i=0;i<dataset_size;i++){
   dataSeries[i] = [i,Math.floor(Math.random() * 10) ]
}

var arrX=[],arrY=[]

for(i=0;i<dataSeries.length;i++){
   arrX.push(dataSeries[i][0])
   arrY.push(dataSeries[i][1])
}

//console.log(arrX,arrY)

var dwnSmp

console.log(`\nTime to reduce ${dataset_size} data points to ${reduced_size}`)
console.log('------------------------')

//-----------------------------------
console.time('d3fc-sample');
chunkSize = Math.ceil( (dataSeries.length - 2 )/ (reduced_size - 2) )

llttd3.bucketSize(chunkSize);
llttd3.x(d => d[0]).y(d => d[1]);

for (i=0;i<loops;i++) {
   dwnSmp = llttd3(dataSeries);
}

console.timeEnd('d3fc-sample');
//console.log(dwnSmp);  
console.log("------------------------")

//-----------------------------------
console.time('downsampler-lttb');
for (i=0;i<loops;i++) {
   dwnSmp = downsampler.processData(dataSeries, reduced_size);
}
console.timeEnd('downsampler-lttb');
console.log("------------------------")

//-----------------------------------
console.time('reducedata.lt3b');
var dsX, dsY
for (i=0;i<loops;i++) {
   [dsX,dsY] = reducedata.lt3b(arrX, arrY, reduced_size)
}  
console.timeEnd('reducedata.lt3b');
//console.log(dsX,dsY);  
console.log("------------------------")


// Check for compiance. 
assert = 0
for (i=0; i<dwnSmp.length;i++){
    if (dwnSmp[i][0] != dsX[i]) { 
      //console.log( i,'x',dwnSmp[i][0], dsX[i] )
      assert = 1
   }
    if (dwnSmp[i][1] != dsY[i]) { 
      //console.log( i,'y',dwnSmp[i][1], dsY[i] )
      assert = 1
   }
}

str_prefix = "Comparison of reduced dataset between lttb and lt3b are"
if ( assert ) {
   console.log(`${str_prefix} NOT EQUAL !!!\n`)
}
else {
   console.log(`${str_prefix} EQUAL :)\n`)
}
