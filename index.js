
var shades = ["#3F7085B3","#4A728B","#557390","#607494","#6C7497","#78759A","#84759C","#90759D","#9C759D","#A7759C","#B2759B","#BD7598","#C67595","#D07691","#D8778D","#DF7888","#E67B83","#EB7D7E","#F08178","#F38572"];
theUrl = "https://jsonplaceholder.typicode.com/comments";

async function getApi(url){
	const response = await fetch(url);
  const data = await response.json();


	newData = addViews(data);
  console.log(newData);
  drawCharts(newData);
  addSwatches(newData);

}

function drawCharts(data){
  drawBarChart(data);
	drawPieChart(data);
  drawTable(data);
  displayCards(data);
}

function addViews(raw){
	var newRaw = raw.slice(0,20);
	for (i = 0; i < newRaw.length; i++){
		newRaw[i].views = Math.floor(Math.random() * 101) ;
	}
	return newRaw;
}

function drawBarChart(info){
	var can= document.getElementById("bar");
	var wid = can.width;
	var hei = can.height;

	var context = can.getContext("2d");

	context.fillStyle="rgb(252, 252, 252";
	context.strokeStyle="#999999";
	context.fillRect(0,0,wid,hei);

	var pad = 20;
	context.font = "12pt Verdana, sans-serif";
	context.fillStyle = "#999999";

	//describes the starting point of the line
	context.moveTo(pad, pad);
	//describes the end point of the line
	context.lineTo(pad, hei - pad);
	//the prvious point becomes the starting point of this next line
	context.lineTo(wid - pad, hei - pad);


	//Displays the ticks and numbers
	var stepSize =(hei - pad*2)/10;

	for (var i=0; i<100; i++){
		context.moveTo(pad, pad + i* stepSize);
		context.lineTo(pad*1.3, pad + i* stepSize);
		context.fillText(100 - (i*10),pad*1.5,pad + i* stepSize + 6);
	}

	context.stroke();

	//Displays the data
	var elementWidth = (wid - pad*2)/info.length;

	context.textAlign ="center";

	for (i=0; i< info.length; i++){
		context.fillStyle = shades[i];
		context.fillRect(pad + elementWidth*i, hei - pad - info[i].views *4.6, elementWidth, info[i].views*4.6);
		context.fillStyle = "rgba(255,255,255,0.8)";
		context.fillText(info[i]['id'], pad + elementWidth*(i + 0.5), hei - pad*1.5);
	}

}

function drawPieChart(info){
	var canv = document.getElementById("pie");
	var radius = 150;
	var w = canv.width;
	var h = canv.height;
	var copyStyle = "#0000000000";
	var contx = canv.getContext("2d");

	var total = 0;
	for (var i =0; i<info.length; i++){
		total +=info[i].views;
	}

	var rad360 = Math.PI*2;
	contx.translate(w/2, h/2);
	var currentTotal=0;

	for (i=0; i<info.length; i++){
		contx.beginPath();
		contx.moveTo(0,0);
		contx.fillStyle =  shades[i]
		contx.arc(0,0,radius, currentTotal/total*rad360, (currentTotal+ info[i].views)/total*rad360,false);
		contx.lineTo(0,0);
		contx.closePath();
		contx.fill();
		contx.strokeStype= contx.fillStyle = copyStyle;
		midRadian = (currentTotal+info[i].views/2)/total*rad360;
		contx.beginPath();
	    contx.moveTo(Math.cos(midRadian)*radius,Math.sin(midRadian)*radius);
	    contx.lineTo(Math.cos(midRadian)*(radius+10),Math.sin(midRadian)*(radius+10));
	    contx.stroke();
	    contx.fillText( " (" +(info[i].views * 100/total).toPrecision(2) + "%)" ,Math.cos(midRadian)*(radius+50),Math.sin(midRadian)*(radius+40));

		currentTotal+=info[i].views;
	}
}

function randomColor (){
	return "#" + Math.random().toString(16).slice(2,8)
}

function randomAlphaColors(){
	return "#" + Math.random().toString(16).slice(2,10);
}

function drawTable(data){
	var keys = Object.keys(data[0]);
	let table= document.createElement('table');
	let thead = document.createElement('thead');
	let tbody= document.createElement('tbody');

	table.appendChild(thead);
	table.appendChild(tbody);
	document.getElementById('table').appendChild(table);

	fillHead(keys,thead);
	fillBody(data,keys,tbody);
}

function fillHead(keys,thead){
	let headRow =document.createElement('tr');
	for (i=0; i<keys.length; i++){
		let heading = document.createElement('th');
		heading.textContent = keys[i];
		headRow.appendChild(heading);
	}
	thead.appendChild(headRow)
}

function fillBody(data,keys,tbody){
	for (r=0; r < data.length; r++){
		var row = document.createElement('tr');
		//Adding class attribute to all even rows
		if ((r == 0)| (r %2 == 0)){
			row.setAttribute('class','light');
		}
		var entry = data[r];
		console.log(entry);

		for (i=0; i < keys.length; i++){
			var cell= document.createElement('td');
			//var cellText = document.createTextNode(entry[keys[i]]);
			cell.innerHTML = entry[keys[i]];
			row.appendChild(cell);
		}

		tbody.appendChild(row);
	}
}

function displayCards(data){
  const cardsSection = document.getElementById("cards-section");

  for(let record of data){
    // create card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card");

    // create the name
    const cardName = document.createElement("p");
    cardName.classList.add('card__name');
    cardName.innerHTML = record.email;

    // create the comment
    const cardComment = document.createElement("p");
    cardComment.classList.add('card__comment');
    cardComment.innerHTML = record.body;

    // create the views
    const viewsDiv = document.createElement('div');
    viewsDiv.classList.add('card__views')

    const viewNumber = document.createElement('span');
    const viewsText = document.createElement('span');
    const viewsImg = document.createElement('img');
    viewsImg.setAttribute('src', './images/eye.svg');
    viewsImg.setAttribute('height', '8px')

    viewNumber.innerHTML = record.views;
    viewsText.innerHTML = 'views';

    viewsDiv.appendChild(viewsImg);
    viewsDiv.appendChild(viewNumber);
    viewsDiv.appendChild(viewsText);

    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardComment);
    cardDiv.appendChild(viewsDiv);

    cardsSection.appendChild(cardDiv);
  }

}

function addSwatches(data){
	var colors = document.getElementById("colors");
	for (i=0; i<shades.length; i++){
		var color = document.createElement('div');
		color.setAttribute("class","color")
		colors.appendChild(color);
		color.style.backgroundColor = shades[i];
		color.textContent = data[i]["id"];
	}
}

getApi(theUrl)









