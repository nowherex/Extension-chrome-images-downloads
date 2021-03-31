
let iniciar = document.getElementById('iniciar');

function enviarMsg (arg) {
  chrome.tabs.executeScript({code: arg}, function(result) {
    setUp(result[0]);
  })
}

iniciar.onclick = function() {
  handleButtonClick()
}

async function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {

    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function handleButtonClick() {
  let urlLinks = document.getElementById('urlLinks').value


  if (urlLinks) {     

    let resultado = urlLinks.split(",")
      var links = resultado
      try {
        for (i in links){
        var img_url=links[i];
        var filename = img_url.substring(img_url.lastIndexOf('/')+1)
        saveas=filename
        
          chrome.downloads.setShelfEnabled(false)
          chrome.downloads.download({
          url: img_url,
          filename: saveas,
          saveAs: false
          })
        }
        enviarMsg("alert('Baixando as fotos')")       
      } catch (error) {
        enviarMsg("alert('Erro ao baixar fotos, verefique os links inseridos!')")
      }   
     


    // chrome.runtime.sendMessage({ link: resultado }, (response) => {
    //  if(response.status == "ok") {
    //   enviarMsg("alert('Baixando as fotos')")
    //  } else {
    //   enviarMsg("alert('Erro ao baixar fotos, verefique os links inseridos!')")
    //  }
      
    // })
  } else {
    enviarMsg("alert('Campo de links vazio')")
  }
}