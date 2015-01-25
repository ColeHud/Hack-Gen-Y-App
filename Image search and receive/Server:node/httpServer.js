var http = require('http');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var download = require('download-file');
var path = require('path');

var request = undefined;


http.createServer(function callback (req, res) 
{
	req.on('data', function(data)
	{
		//get the thing to be requested
		console.log(data.toString());

		request = data.toString();


		//get the data from google
		var options ={
			hostname: "https://www.googleapis.com/customsearch/v1?cx=000681453094033258501%3Atuuffghkcmu&q=" + request + "&fileType=.jpg,.png&searchType=image&key=AIzaSyDA_i3ASjTZm1cz259vdesmlZ71aOsjoaM",
			method: "GET"
		}

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open("GET", options.hostname, true);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function() 
		{		
			console.log("On ready state change");
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
			{
				var myArr = JSON.parse(xmlhttp.responseText);
				myFunction(myArr);
			}
		}




		//get the top view
		//get the thing to be requested
		console.log(data.toString() + " top");

		//get the data from google
		var options ={
			hostname: "https://www.googleapis.com/customsearch/v1?cx=000681453094033258501%3Atuuffghkcmu&q=" + request + " top view&fileType=.jpg,.png&searchType=image&key=AIzaSyDA_i3ASjTZm1cz259vdesmlZ71aOsjoaM",
			method: "GET"
		}

		var xmlhttpTop = new XMLHttpRequest();

		xmlhttpTop.open("GET", options.hostname, true);
		xmlhttpTop.send();

		xmlhttpTop.onreadystatechange = function() 
		{		
			console.log("On ready state change");
			if (xmlhttpTop.readyState == 4 && xmlhttpTop.status == 200) 
			{
				console.log("Tried to save data");
				var myArr = JSON.parse(xmlhttpTop.responseText);
				topView(myArr);
			}
		}





	});

}).listen(8000);




function myFunction(arr) 
{
	var items = arr.items;

	for(var i = 0; i < items.length; i++)
	{
		console.log(items[i].link);

		//download api thingy
		var url = items[i].link;
		var extension = path.extname(items[i].link);

		var options = 
		{
    		directory: "./images/",
    		filename: i + extension
		}

		try
		{
			download(url, options, function(err){});
		}
		catch(err)
		{
			console.log("Error");
		}
	}	
}

function topView(arr)
{
	var items = arr.items;

	for(var i = 0; i < items.length; i++)
	{
		console.log("Top View " + items[i].link);

		//download api thingy
		var url = items[i].link;
		var extension = path.extname(items[i].link);

		var options = 
		{
    		directory: "./topImages/",
    		filename: "top" + i + extension
		}

		try
		{
			download(url, options, function(err){});
		}
		catch(err)
		{
			console.log("Error");
		}
	}	

}















