// https: //gamersclub.com.br/lobby/partida/3545417
var demoid = "3545417";
var request = new XMLHttpRequest();
request.open('GET', '/lobby/demoDownload/'+demoid, true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText)
    console.log(data.demo);
  }
};
request.send();

// #match-info-lobby .stats
// <div class="fightback-bridge" style="
//     height: 40px;
//     position: relative;
//     top: 220 px;
// ">
//     <a href="#">Importar para o fightback</a>
// </div>

// botao
// color: white;
// position: absolute;
// top: 0;
// right: 0;
// margin: 10px auto;
// border: 1px solid red;
// padding: 4px 15px;
// border-radius: 5px;
// background: #D9252A;
// font-weight: bold;
