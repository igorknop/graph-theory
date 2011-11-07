var grafos = [];

grafos[0] = [
[0, 1, 1, 1, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1],
[1, 1, 0, 1, 0, 1, 1],
[1, 1, 1, 0, 1, 1, 0],
[0, 1, 0, 1, 0, 1, 1],
[0, 0, 1, 1, 1, 0, 1],
[1, 1, 1, 0, 1, 1, 0]
];

grafos[1] = [
[0, 1, 1, 1],
[1, 0, 1, 1],
[1, 1, 0, 1],
[1, 1, 1, 0]
];

grafos[2] = [
[0, 1, 1, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 0],
[1, 1, 0, 0, 0, 1, 1, 0],
[1, 1, 0, 0, 1, 1, 0, 0],
[0, 1, 0, 1, 0, 1, 1, 0],
[0, 0, 1, 1, 1, 0, 1, 0],
[0, 1, 1, 0, 1, 1, 0, 0],
[1, 0, 0, 0, 0, 0, 0, 0]
];


var grafo = grafos[0];
var vgrau = [];
var vcor = [];
for(i=0;i<grafo.length;i++){
	vgrau[i] = 0;
	vcor[i] = 0;
}

var adj = document.getElementById("adj");
var i, j;
var tr, td, th;
tr = document.createElement("tr");
th = document.createElement("th");
tr.appendChild(th); 
for(i=0;i<grafo.length;i++){
   th = document.createElement("th");
   th.innerHTML = "N"+i;
   tr.appendChild(th); 
}
adj.appendChild(tr);
for(i=0;i<grafo.length;i++){
   tr = document.createElement("tr");
   th = document.createElement("th");
   th.innerHTML = "N"+i;
   tr.appendChild(th); 
   for(j=0;j<grafo.length;j++){
      var td = document.createElement("td");
      td.innerHTML = grafo[i][j];
      tr.appendChild(td); 
   }
   adj.appendChild(tr);
}

var grau = document.getElementById("grau");
for(i=0;i<grafo.length;i++){
   tr = document.createElement("tr");
   var th = document.createElement("th");
   th.innerHTML = "N"+i;
   tr.appendChild(th); 
   var g =0;
   for(j=0;j<grafo.length;j++){
      if(grafo[i][j]){
         g++;
      }
   }
   td = document.createElement("td");
   td.innerHTML = g;
   vgrau[i] = g;
   tr.appendChild(td); 
   grau.appendChild(tr);
}



var lv = [0,1,2,3,4,5,6];
lv.sort(function(i,j){
   return vgrau[i]-vgrau[j];
});
lv.reverse();

var c = 1;
var v = lv.pop();
do{
   if(vcor[v]==0){
      vcor[v] = c;
      for(j=0;j<grafo.length;j++){
         if(j==v){
            continue;
         }
         if(grafo[v][j]==0){
               if(vcor[j]==0){
                  vcor[j] = c;
               }
         }
      }
      c = c+1;
   }
   v = lv.pop();
} while (v!==undefined);

var cor = document.getElementById("cor");
for(i=0;i<grafo.length;i++){
   tr = document.createElement("tr");
   th = document.createElement("th");
   th.innerHTML = "N"+i;
   tr.appendChild(th); 
   td = document.createElement("td");
   td.innerHTML = vcor[i];
   tr.appendChild(td); 
   cor.appendChild(tr);
}

document.getElementById("crom").innerHTML = c-1;


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(255,255,255)";
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, 300, 300);

var raio = 200;
ctx.translate(150, 150);
var angulo = 2*Math.PI/grafo.length;

ctx.save();         
for(i=0;i<grafo.length;i++){
   for(j=i;j<grafo.length;j++){
      if(grafo[i][j]){
         ctx.save();
         ctx.rotate(i*angulo);
         ctx.translate(raio/2, 0);
         ctx.beginPath();
         ctx.moveTo(0, 0);
         ctx.restore();
         ctx.save();
         ctx.rotate(j*angulo);
         ctx.translate(raio/2,0);
         ctx.lineTo(0, 0);
         ctx.closePath();
         ctx.stroke();
         ctx.restore();
      }
   }
   ctx.restore();
}
ctx.restore();

ctx.save();
for(i=0;i<grafo.length;i++){
   ctx.save();
   ctx.translate(raio/2, 0);
   ctx.beginPath();
   ctx.arc(0, 0, 10, 0, 2*Math.PI, false);
   ctx.lineWidth = 3;
   ctx.fillStyle = "hsl("+(vcor[i])*(360/grafo.length)+",100%,50%)";
   ctx.fill();
   ctx.stroke();
   ctx.lineWidth = 1;
   ctx.strokeText("N"+i+": "+vcor[i],15,3);
   ctx.restore();
   ctx.rotate(angulo);
}
ctx.restore();
