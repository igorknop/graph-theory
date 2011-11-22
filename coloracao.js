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


function coloreGrafo3(){
   var g3verticesOrdenados = [];
   for(var i=0; i<grafo.length; i++){
      g3verticesOrdenados.push(i);
   }
   g3verticesOrdenados.sort(function(i,j){
      return vgrau[i]-vgrau[j];
   });
   g3verticesOrdenados.reverse();
   var g3cores = [];
   for(var i = 0; i<grafo.length; i++){
      g3cores[i] = [];
   }
   var g3cor = 0;
   g3cores[g3cor].push(g3verticesOrdenados[0]);
   var g3cor = 0;
   var g3ci = 0;
   for(var g3v=1; g3v<g3verticesOrdenados.length; g3v++){
        var g3vertice = g3verticesOrdenados[g3v];
        var achou = false;
        do{
         var g3verticeColorido = g3cores[g3cor][g3ci];
         if(grafo[g3vertice][g3verticeColorido]){
            g3cor++;
            achou = true;
         }
        }while(g3verticeColorido);
        if(!achou){
         g3cores[g3cor].push(g3vertice);
         vcor[g3vertice] = g3cor;
        }
   }
}
function coloreGrafo2(){
   var g2verticesOrdenados = [];
   for(var i=0; i<grafo.length; i++){
      g2verticesOrdenados.push(i);
   }
   g2verticesOrdenados.sort(function(i,j){
      return vgrau[i]-vgrau[j];
   });
   g2verticesOrdenados.reverse();
   var g2cores = [];
   for(var i = 0; i<grafo.length; i++){
      g2cores[i] = [];
   }
   var g2cor = 0;
   g2cores[g2cor].push(g2verticesOrdenados[0]);
   for(var g2v=1; g2v<g2verticesOrdenados.length; g2v++){
        for(var g2ci=0;g2ci<g2cores[g2cor].length; g2cor++){
         if(grafo[g2verticesOrdenados[g2v]][g2cores[g2cor][g2ci]]){
            g2cor++;
         } else {
            g2cores[g2cor].push(g2verticesOrdenados[g2v]);
            vcor[g2verticesOrdenados[g2v]] = g2cor;
            break;
         }
        }
        g2cor = 0;
   }
}
function coloreGrafo(){
        var c = 1;
        var lv = [0,1,2,3,4,5,6];
        lv.sort(function(i,j){
           return vgrau[i]-vgrau[j];
        });
        lv.reverse();

        var v = lv.pop();
        //vcor[v] = c;
        //v = lv.pop();
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
}


