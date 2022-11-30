# reducedata


Node package to reduce or downsample data using the Largest Triangle Three Buckets algorithm

## Description

Implements a downsample technique known as Largest Triangle Three Buckets as defined in Sveinn Steinarsson MS thesis.

http://skemman.is/stream/get/1946/15343/37285/3/SS_MSthesis.pdf

The idea is to downsample a data set without losing the visual character of the plotted data. The technique draws on ideas in cartographic generalization or polyline simplification. This technique is often useful in client-server applications such as webserver-browser where the length of the data far exceeds the pixels available to plot. Reducing the data size significantly speeds up data transfer and rendering time.

There are other packages that do the same but expect input of the form 
```
data = [ [1,5], [2.4], [3,7]...]
```

Which is not suitable for many plotting packages such as plotly or matplotlit or dygraph which use data in the form

```
dataX = [1,2,3...]
datay = [5,4,7...]
```

When converting 100000s of data points the cost is significant to convert back and forth. 

In the test directory there is a program that compares the performance with respect to other packages and checks against a reference to verify results are as expected

```
Time to reduce 70000 data points to 1000
-------------------------
d3fc-sample:      55.86ms
-------------------------
downsampler-lttb: 21.789ms
-------------------------
reducedata.lt3b:  19.792ms
-------------------------
Comparison of reduced dataset between lttb and lt3b are EQUAL :)
```

Note: If X axis data is a list of Date objects they will be converted to number (* 1) to facilitate processing. If you plotting package requires Date object you will need to convert back. 


## Synopsis

```javascript
const datareduce = require("./datareduce")

dsX = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
dsY = [ 8, 4, 2, 4, 4, 9, 8, 8, 3, 9, 7, 2, 5, 3, 7, 3 ]
reduced_len = 5

var rdsX,rdsY
[rdsX,rdsY] = datareduce.lt3b(dsX, dsY, 5)

console.log('reduced X',rdsX)
console.log('reduced Y',rdsY)
```

Outputs 

```javascript
reduced X [ 1, 3, 6, 12, 16 ]
reduced Y [ 8, 2, 9, 2, 3 ]
```


### Install 
```
npm install git+https://github.com/troxel/datareduce.git
```
~

