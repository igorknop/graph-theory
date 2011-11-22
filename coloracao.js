window.addEventListener("load", init);

var matrizAdjacencia = [];
var vetorGrau = [];
var vetorCor = [];

function init(){
   document.getElementById("fadj").addEventListener("submit", function(){
      if(event.preventDefault) event.preventDefault();
      event.result = false;
   });
   document.getElementById("btnRun").addEventListener("click", montaMatrizAdjacencia );
   
   montaMatrizAdjacencia();
   //montaTabelas();
   //mostraCores();
   //desenhaGrafo();
   
}
function montaMatrizAdjacencia(){
      if(event.preventDefault) event.preventDefault();
      event.result = false;
      matrizAdjacencia = [];
      vetorGrau = [];
      vetorCor = [];
      var ligacoes = document.fadj.txtadj.value.split(";");
      for(var i in ligacoes){
         var ligacao = ligacoes[i];
         var nos = ligacao.split("-");
         var n1 = nos[0].trim();
         var n2 = nos[1].trim();
         if(!matrizAdjacencia[n1]){
            matrizAdjacencia[n1] = [];
         }
         if(!matrizAdjacencia[n2]){
            matrizAdjacencia[n2] = [];
         }
         matrizAdjacencia[n1][n2] = 1;
         matrizAdjacencia[n2][n1] = 1;
      }
      for(var i=0; i<matrizAdjacencia.length;i++ ){
           if(vetorGrau[i]===undefined){ vetorGrau[i] = 0;}
           vetorCor[i] = i;
           for(var j=0; j<matrizAdjacencia.length;j++ ){
                 matrizAdjacencia[i][j] = matrizAdjacencia[i][j]?matrizAdjacencia[n1][n2]:0;
                  if(matrizAdjacencia[i][j]){ vetorGrau[i]++;}
           }
      }

      console.dir(vetorCor);
      imprimeMatrizAdjacencia();
      imprimeVetorGrau();
      coloreGrafo();
      imprimeVetorCor();
      desenhaGrafo();
   }
function imprimeMatrizAdjacencia(){
        var adj = document.getElementById("adj");
        adj.innerHTML = "";
        var i, j;
        var tr, td, th;
        tr = document.createElement("tr");
        th = document.createElement("th");
        tr.appendChild(th); 
        for(i=0;i<matrizAdjacencia.length;i++){
           th = document.createElement("th");
           th.innerText = "N"+i;
           tr.appendChild(th); 
        }
        adj.appendChild(tr);
        for(i=0;i<matrizAdjacencia.length;i++){
           tr = document.createElement("tr");
           th = document.createElement("th");
           th.innerHTML = "N"+i;
           tr.appendChild(th); 
           for(j=0;j<matrizAdjacencia.length;j++){
              var td = document.createElement("td");
              td.innerText = matrizAdjacencia[i][j];
              tr.appendChild(td); 
           }
           adj.appendChild(tr);
        }
}

function imprimeVetorGrau(){
        var grau = document.getElementById("grau");
        grau.innerHTML="";
        for(i=0;i<matrizAdjacencia.length;i++){
           tr = document.createElement("tr");
           tr.innerHTML = "<th>N"+i+"</th><td>"+vetorGrau[i]+"</td>";
           grau.appendChild(tr);
        }
}

function imprimeVetorCor(){
        var cor = document.getElementById("cor");
        cor.innerHTML="";
        for(i=0;i<matrizAdjacencia.length;i++){
           tr = document.createElement("tr");
           tr.innerHTML = "<th>N"+i+"</th><td>"+vetorCor[i]+"</td><td style='background-color:hsl("+(vetorCor[i]-1)*(360/matrizAdjacencia.length)+",100%,50%);'>&nbsp;</td>";
           cor.appendChild(tr);
        }
}


function desenhaGrafo(){
   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");
   ctx.fillStyle = "rgb(255,255,255)";
   ctx.strokeStyle = "rgb(0,0,0)";
   ctx.save();
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   var raio = 200;
   ctx.translate(canvas.width/2, canvas.height/2);
   var angulo = 2*Math.PI/matrizAdjacencia.length;
   var raioNo = (2*Math.PI*raio)/(10*matrizAdjacencia.length);

   for(i=0;i<matrizAdjacencia.length;i++){
      ctx.save();         
      for(j=i;j<matrizAdjacencia.length;j++){
         if(matrizAdjacencia[i][j]){
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

   ctx.save();
   for(i=0;i<matrizAdjacencia.length;i++){
      ctx.save();
      ctx.translate(raio/2, 0);
      ctx.beginPath();
      ctx.arc(0, 0, raioNo, 0, 2*Math.PI, false);
      ctx.lineWidth = 3;
      ctx.fillStyle = "hsl("+(vetorCor[i]-1)*(360/matrizAdjacencia.length)+",100%,50%)";
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeText("N"+i+": "+vetorCor[i],raioNo+5,3);
      ctx.restore();
      ctx.rotate(angulo);
   }
   ctx.restore();
   ctx.restore();
}


function coloreGrafo(){
        var c = 1;
        var lv = [0,1,2,3,4,5,6];
        lv.sort(function(i,j){
           return vetorGrau[i]-vetorGrau[j];
        });
        lv.reverse();

        var v = lv.pop();
        vetorCor[v] = c;
        //v = lv.pop();
        do{
           if(vetorCor[v]==0){
              vetorCor[v] = c;
              for(j=0;j<matrizAdjacencia.length;j++){
                 if(j==v){
                    continue;
                 }
                 if(matrizAdjacencia[v][j]==0){
                       if(vetorCor[j]==0){
                          vetorCor[j] = c;
                       }
                 }
              }
              c = c+1;
           }
           v = lv.pop();
        } while (v!==undefined);
}


