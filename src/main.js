'use strict';

function hasClass (el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(i, array[i]);
  }
}

var searchData = {};
searchData.server = "COMPETITIVO (LOBBY)";
searchData.period  = "2018-03-01";
var searchData = JSON.stringify(searchData);

addToUsers( document.querySelectorAll('a[href^="https://gamersclub.com.br/jogador/"]') );
addToUsers( document.querySelectorAll('a[href^="/jogador/"]') );

function addToUsers(userCards) {
  forEach(userCards, (userCard) => {
    let playerId = userCard.href.replace('https://gamersclub.com.br/jogador/', '')

    userCard.setAttribute('title', 'carregando kdr')
    userCard.addEventListener('mouseover', function(e) {
      var request = new XMLHttpRequest();
      request.open('POST', '/api/statistics/'+playerId+'/search/'+playerId+'/pt-br', true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          var statsContent = 'KDR: '+data.kd_ratio;
          userCard.setAttribute('title', statsContent);
          userCard.dataset.tipText = document.getElementById('tooltip-span').innerHTML = statsContent;
          userCard.dispatchEvent(new MouseEvent('mousemove'));
        }
      };
      request.send(searchData);
    })
  });
}

var observer = new MutationObserver((mutations) => {
  forEach(mutations, (mutation) => {
    if(mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      forEach(mutation.addedNodes, (addedNode) => {
        if (addedNode.querySelectorAll) {
          addToUsers( addedNode.querySelectorAll('a[href^="https://gamersclub.com.br/jogador/"]') );
          addToUsers( addedNode.querySelectorAll('a[href^="/jogador/"]') );
        }
      });
    }
  });
});

var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);
