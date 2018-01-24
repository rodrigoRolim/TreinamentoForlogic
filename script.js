let contacts = [];
let i = 0;
let successFunction = (response)=>{
    console.log(response);
}
let getRow = (str)=>{
    if($("#"+str).css("display") == 'none'){
        $("#"+str).css("display","table-row");
    } else {
        $("#"+str).css("display","none");
    }
}
let attachError = (err)=>{
    console.log(`${err}`);
}
let attachElements = (data)=>{
    contacts = data;
    console.log({data});
    if(!contacts) return false;
    
    console.log({contacts});
    contacts.forEach((contact)=>{
        i++;
        let rows = `
        
            <tr id="row-${i}" onclick="getRow('info-${i}')">

                <th scope="row" style="text-align:left" >
                    <a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>
                    <a href=""><i class="fa fa-eye" aria-hidden="true"></i></a>
                </th>
                <td style="text-align:center">${contact.name}</td>
                <td style="text-align:right">
                    <a href="#1" class="bt-edex" id="ed"><i class="fa fa-pencil" aria-hidden="true"></i>editar</a>
                    <a href="#2" class="bt-edex" id="ex"><i class="fa fa-trash-o" aria-hidden="true"></i>excluir</a>
                </td>
            </tr>
            <tr id="info-${i}">
                    
                <td style="text-align:left">
                    <div>
                        <p><span>Nome: </span><span>${contact.name}</span></p>
                        <p><span>Email: </span><span>${contact.email}</span></p>
                        <p><span>Sexo: </span><span>${contact.sexo}</span></p>
                        <p><span>Rua: </span><span>${contact.rua}</span></p>
                        <p><span>Nº: </span><span>${contact.numero}</span></p>
                        <p><span>Complemento: </span><span>${contact.complemento}</span></p>
                        <p><span>Bairro: </span><span>${contact.bairro}</span></p>

                    </div>
                </td>
                <td></td>
                <td></td>
                
            </tr>
        `
         
        $('#contatos').append(rows);
    });
}
$(document).ready(function(){
   
    $.ajax({ 
        type: 'GET',
        url: 'http://localhost:3000/v1/contacts',
        success: attachElements,
        error:attachError
    })

});
$(document).ready(function(){
    
    var enviando_formulario = false;
  
    
    $("form").submit(function(e){
        //debugger;
        e.preventDefault();
        
        var name = $("#name").val();
        var email = $("#email").val();
        var rua = $("#rua").val();
        var numero = $("#numero").val();
        var bairro = $("#bairro").val();
        var complemento = $("#complemento").val();
        var observacao = $("#observacao").val();
        var sexo = $("[name='sexo']").val();
        var dados = {
            name:name,
            email:email,
            rua:rua,
            numero:numero,
            bairro:bairro,
            complemento:complemento,
            observacao:observacao,
            sexo:sexo       
         };
          
        if(!enviando_formulario){
            $.ajax({
              
                type: "POST",
                url: 'http://localhost:3000/v1/contacts',
                data: dados,
                async: true,
                success:  successFunction(),
                error: function(request,status,error){
                    alert(request.responseText);
                }
            });
           // console.log({data});
       }
       return false;
    });

});
