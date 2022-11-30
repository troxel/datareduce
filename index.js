module.exports.lt3b = function(dataX, dataY, rtnLen) {
	return lt3b(dataX, dataY, rtnLen);
}

var floor = Math.floor,	abs = Math.abs;
//-------------------------------------------
const lt3b = function(dataX, dataY, rtnLen) {

   let dataLen = dataX.length

	if ( dataLen != dataY.length ) { throw new Error('List lengths must agree'); }

   if (rtnLen >= dataLen || rtnLen === 0) { console.log("dataLen",dataLen); return [dataX,dataY] }

   var rtnX = [], rtnY = []
   rtnX[0] = dataX[0]
   rtnX[rtnLen - 1] = dataX[dataLen - 1]
   rtnY[0] = dataY[0]
   rtnY[rtnLen - 1] = dataY[dataLen - 1]

	let stride = (dataLen - 2 ) / (rtnLen - 2)

   for (let i = 0; i < (rtnLen - 2); i++) {
 
      let avgStart  = floor( ( i + 1 ) * stride ) + 1
      let avgStop   = floor( ( i + 2 ) * stride ) + 1
      if ( avgStop > dataLen ) { avgStop = dataLen }

      let rngStart = floor( i * stride ) + 1
      let rngStop = avgStart
      
      // Calc average for 3rd bucket (c)
      let avgX = 0, avgY = 0
      for ( var j=avgStart; j<avgStop; j++) {
         avgX += dataX[j] * 1 
         avgY += dataY[j]
      }
      
      let avgLen = avgStop - avgStart

		avgX /= avgLen
		avgY /= avgLen

      // Provides a slight speed up not worth it. 
      //let median = floor(avgStart+(avgLen/2))
      //avgX = dataX[median]

	   let max_area = 0, area = 0, maxK = 0
      let aX = rtnX[i]
      let aY = rtnY[i]
   
      for (var k = rngStart; k < rngStop; k++) {
         
			// Calculate area over three buckets determinate method, factor out the * 0.5
         area = abs( ( aX - avgX ) * ( dataY[k] - aY ) - ( aX - dataX[k] ) * ( avgY - aY ) )

			if ( area > max_area ) {
            max_area = area
            maxK = k
         }
      }

      rtnX[i+1] = dataX[maxK] * 1
      rtnY[i+1] = dataY[maxK]
   }
   
   return [rtnX,rtnY];
}

