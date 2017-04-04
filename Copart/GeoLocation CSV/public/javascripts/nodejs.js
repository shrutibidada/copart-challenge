fs = require('fs');
csv = require('fast-csv');
mysql = require('mysql');
geocoder = require('geocoder');

var array = []
var stream = fs.createReadStream("VehicleDetails.csv");
 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'vehicledb'
});
connection.connect();
flag = 0
csv
 .fromStream(stream, {ignoreEmpty: true})
 .on("data", function(rows){
     //console.log(data[0]);
    if(flag == 0){
    	flag = 1;
    }
    else
    {
    	if(rows[11] = "")
    		rows[11] = 0;

    	for(var i=0;i<rows.length;i++){
    		rows[i] = rows[i].replace(/\\/gi, "");  
    	}

		var options = {
		  provider: 'google',

		  // Optional depending on the providers
		  httpAdapter: 'https', // Default
		  apiKey: 'AIzaSyBIQn9jEmLWrBHgARK6jwEQmYaORhvUfTI', // for Mapquest, OpenCage, Google Premier
		  formatter: null         // 'gpx', 'string', ...
		};
		geocoder.geocode(rows[19], function ( err, data ) {
			if(err){
				//console.log("error "+data)
			}
			//console.log(data);
			var lat = "";
			var lng = "";
			//check if usage limit error occured
			if(data!=undefined && data.results!= undefined && data.results[0]!= undefined){
				lat = data.results[0].geometry.location.lat;
				lng = data.results[0].geometry.location.lng;
			}
		  	

		  	var sql = 'INSERT INTO vehicle VALUES ("'+rows[0]+'","'+rows[1]+
		    '","'+rows[2]+'","'+rows[3]+'","'+rows[4]+'","'+rows[5]+'","'+rows[6]+
		    '","'+rows[7]+'","'+rows[8]+'","'+rows[9]+'","'+rows[10]+'","'+rows[11]+'","'+rows[12]+
		    '","'+rows[13]+'","'+rows[14]+'","'+rows[15]+'","'+rows[16]+'","'+rows[17]+'","'+rows[18]+
		    '","'+rows[19]+'","'+rows[20]+'","'+rows[21]+'","'+lat+'","'+lng+'");'
		    //console.log(sql);
		    connection.query(sql, function(err, res) {
		     	if(err) console.log(data +"\n"+err+" \n"+sql);

		    })
		},options);
	    
	}
 
 })
 .on("end", function(){
     console.log("done");
     process.exit(0);
 });


