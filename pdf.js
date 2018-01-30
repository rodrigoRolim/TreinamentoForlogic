$(document).ready(function(){
    $.ajax({ 
        type: 'GET',
        url: 'http://localhost:3000/v1/contacts',
        responseType: 'arraybuffer',
        success: function(data){
            $("#btn-exp").click(function(){
               var x='';
               /*var doc = new jsPDF({
                    orientation: 'p',
                    unit: 'pt',
                    format: 'a4',
                    hotfixes: [],
                   
                });*/
                data.forEach(element => {
                    let lista = `
                                 nome: ${element.name}
                                 email: ${element.email}
                                 rua: ${element.rua}
                                 numero: ${element.numero}   
                                 bairro: ${element.bairro}
                                 complemento: ${element.complemento}
                                 observacao: ${element.observacao}
                                 sexo: ${element.sexo}
                                 favorito: ${element.favorite}
                                 `
                    x += lista;
                }); 
                download(x,"file");
               // doc.setFontSize(10)
               // doc.text(10, 10,x).addPage();
               // doc.setLineCap(10)
                //doc.viewerPreferences({'FitWindow': true}, true)
               // doc.save("viewerPreferences.pdf")
               
                //doc.autoPrint()
               // doc.save('two-by-four.pdf')
            });
        },
        
    });
   
});
let download = (content, filename)=>{
    //var arraybuffer = new Uint16Array(content);
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':'application/pdf;base64'});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();

    
}