

var contacts = [];

let successFunction = ()=>{
    $.alert({
        title: 'Sucesso!',
        content: 'Cadastrado com sucesso!',
        theme: 'modern',
        icon: 'fa fa-check-circle-o',
        title: 'OK!',
        backgroundDismiss: 'fechar',
        buttons:{
            fechar: function(){
                
                $("#modalNav").modal("hide");
                let linhas = [];
                linhas =  $('#contatos tr');
                for(let i = 0; i < linhas.length; i++){
                    linhas[i].replaceWith('');
                }
                $.ajax({ 
                    type: 'GET',
                    url: 'http://localhost:3000/v1/contacts',
                    success: attachElements,
                    error:attachError
                });
            }
        }
       
    });
}
let bufferModal = ()=>{
    var inp = $("#modalNav input").val();
    console.log(inp.length);
    for(let i = 0; i < inp.length; i++){
        inp[i] = '';
    }
}
let getRow = (str)=>{
    if($("#"+str).css("display") == 'none'){
        $("#"+str).css("display","table-row");
    } else {
        $("#"+str).css("display","none");
    }
}
let addFavorite = (value,cod,name,email,rua,numero,bairro,complemento,observacao,sexo,favorito)=>{
    if($("#"+value).attr('class') == 'fa fa-star-o'){
        $("#"+value).attr('class','fa fa-star');
        let data = {
            name:name,
            email:email,
            rua:rua,
            numero:numero,
            bairro:bairro,
            complemento:complemento,
            observacao:observacao,
            sexo:sexo,
            favorite:true
        };
        console.log(data);
        $.ajax({
          
            type: 'PUT',
            url : 'http://localhost:3000/v1/contacts/'+cod,
            data: data
        });

    } else{
        $("#"+value).attr('class','fa fa-star-o');
        let data = {
            name:name,
            email:email,
            rua:rua,
            numero:numero,
            bairro:bairro,
            complemento:complemento,
            observacao:observacao,
            sexo:sexo,
            favorito:false
        };
        console.log(data);
        $.ajax({
          
            type: 'PUT',
            url : 'http://localhost:3000/v1/contacts/'+cod,
            data: data
        });
    }
}
let attachError = (err)=>{
    console.log(`${err}`);
}
let attachElements = (data)=>{
    let i = 0;
    contacts = data;
    console.log({data});
    if(!contacts) return false;
   // localStorage.clear();
    console.log({contacts});
    contacts.forEach((contact)=>{
        i++;
 
        let rows = `
            
            <tr id="row-${i}">

                <th scope="row" style="text-align:left" >
                    <a href="#2"><i class="${(contact.favorite === 'true')?'fa fa-star':'fa fa-star-o'}" aria-hidden="true" onclick="addFavorite('star-${i}',
                                                                                                                                      '${contact._id}',
                                                                                                                                      '${contact.name}',
                                                                                                                                      '${contact.email}',
                                                                                                                                      '${contact.rua}',
                                                                                                                                      '${contact.numero}',
                                                                                                                                      '${contact.bairro}',
                                                                                                                                      '${contact.complemento}',
                                                                                                                                      '${contact.observacao}',
                                                                                                                                      '${contact.sexo}',
                                                                                                                                      '${contact.favorite}')" id="star-${i}"></i></a>
                    ${(contact.observacao != '')?'<i class="fa fa-exclamation" aria-hidden="true"></i>':''}
                </th>
                <td style="text-align:center; font-weight:bold;" onclick="getRow('info-${i}')" class="contato"><a href="#1" class="nome">${contact.name}</a></td>
                <td style="text-align:right">
                    <a href="#1" class="bt-edex" id="ed-${contact._id}" type="button" onclick="editRow('${contact.name}',
                    '${contact.email}',
                    '${contact.rua}',
                    '${contact.numero}',
                    '${contact.bairro}',
                    '${contact.complemento}',
                    '${contact.observacao}',
                    '${contact.sexo}',
                    '${contact._id}',
                    '${i}')" data-toggle="modal" data-target="#modalEdit">
                    <i class="fa fa-pencil" aria-hidden="true"></i>editar</a>
                    <a href="#2" class="bt-edex" id="ex-${contact._id}" onclick="deleteRow('${contact._id}',this)" type="button"><i class="fa fa-trash-o" aria-hidden="true"></i>excluir</a>
                </td>
            </tr>
            <tr id="info-${i}">
               
                <td></td>
                     
                <td style="text-align:left">
                    
                        <p><span>Nome: </span><span>${contact.name}</span></p>
                        <p><span>Email: </span><span>${contact.email}</span></p>
                        <p><span>Sexo: </span><span>${contact.sexo}</span></p>
                        <p><span>Rua: </span><span>${contact.rua}</span></p>
                        <p><span>Nº: </span><span>${contact.numero}</span></p>
                        <p><span>Complemento: </span><span>${contact.complemento}</span></p>
                        <p><span>Bairro: </span><span>${contact.bairro}</span></p>
                        <p><span>${(contact.observacao != '')?'Observação':''} </span<span>${contact.observacao}</span></p>

                  
                </td>
                <td></td>
                
            </tr>
        `
         var dado = [
                    `${contact.name}`,
                    `${contact.email}`,
                    `${contact.sexo}`,
                    `${contact.rua}`,
                    `${contact.numero}`,
                    `${contact.complemento}`,
                    `${contact.bairro}`,
                    `${contact.observacao}`
         ];
        window.localStorage.setItem(`dado-${i}`,dado);
        $('#contatos').append(rows);
        
    });
    
 
}


let closeModal = ()=>{
   let x='';
   $('.container .modal').replaceWith(x);
   $('.modal-backdrop').replaceWith(x);
   $('body').attr('class','');
   $('body').attr('style','');
 
}
let editRow = (name,email,rua,num,bairro,comp,obs,sexo,cod,i)=>{
    //console.log(contact);
    let modal = `<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Editar Contato</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeModal()">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
                <div class="container">
                        <form method="put" id="formulario-ed">
                            <div class="form-column align-items-center">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label  for="name-ed">Name</label>
                                            <input type="text" class="form-control mb-10 my-2" value="${name}" id="name-ed" name="name-ed" placeholder="Rodrigo rolim" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label  for="email-ed">Email</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">@</div>
                                                </div>
                                                <input type="email" class="form-control" id="email-ed" value="${email}" name="email-ed" placeholder="Username" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="form-group">
                                            <label for="rua-ed">Rua</label>
                                            <input type="text" class="form-control" id="rua-ed" value="${rua}" name="rua-ed">
                                        </div>
                                    </div>
                                   <div class="col-lg-4">
                                        <div class="form-group">
                                            <label for="numero-ed">Nº</label>
                                            <input type="text" class="form-control" id="numero-ed" value="${num}" name="numero-ed">
                                        </div>
                                   </div>
                                    
                                </div>
                               
                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="form-group">
                                            <label for="bairro">Bairro</label>
                                            <input type="text" class="form-control" id="bairro-ed" value="${bairro}" name="bairro-ed">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <label for="complemento">Complemento</label>
                                            <input type="text" class="form-control" id="complemento-ed" value="${comp}" name="complemento-ed">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="observacao-ed">Observação</label>
                                            <textarea class="form-control" aria-label="With textarea" id="observacao-ed" name="observacao-ed" style="resize:none">${obs}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="radio">
                                            <label>Sexo</label>
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="feminino-ed" name="sexo-ed" value="feminino" class="custom-control-input" ${(sexo == 'feminino')?'checked':''}>
                                                <label class="custom-control-label" for="feminino-ed">feminino</label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="masculino-ed" name="sexo-ed" value="masculino" class="custom-control-input" ${(sexo == 'masculino')?'checked':''}>
                                                <label class="custom-control-label" for="masculino-ed">masculino</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                      
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Cancel</button>
                                <button type="button" class="btn btn-primary" onclick="edit('${cod}','${i}')" id="save">Save</button>
                            </div>
                        </form>
                </div>
        </div>
    </div>
    </div>
    </div>`
    if($('.container .modal').text() === ''){
        $('.lista-contatos').before(modal);
    } else {
        $('.container .modal').replaceWith(modal);
    }
    
}
let deleteRow = (cod, r)=>{
    $.confirm({
        backgroundDismiss: 'sim',
        content: "você deseja mesmo excluir?",
        buttons:{
            sim: function(){
                $.ajax({
                    url: 'http://localhost:3000/v1/contacts/'+cod,
                    type: 'DELETE',
                    success: function(){
                        let i = r.parentNode.parentNode.rowIndex;
                        document.getElementById("table").deleteRow(i);
                        document.getElementById("table").deleteRow(i);
                        $.alert({
                            title: 'Sucesso!',
                            content: 'Excluído com sucesso!',
                            theme: 'modern',
                            icon: 'fa fa-check-circle-o',
                            title: 'OK!',
                            backgroundDismiss: 'fechar',
                        })
                    },
                    error: function(){
                        alert("fudeu");
                    } 
                    
                })
            },
            cancelar: function(){

            }
        }
    });

    
}
let edit = (cod,i)=>{
       
        let name = $('#name-ed').val();
        let email =$('#email-ed').val();
        let rua = $('#rua-ed').val();
        let numero = $('#numero-ed').val();
        let bairro = $('#bairro-ed').val();
        let comp = $('#complemento-ed').val();
        let obs = $('#observacao-ed').val();
        let sexo = $('#sexo-ed').val();
        let data = {name:name,email:email,numero:numero,bairro:bairro,complemento:comp,observacao:obs};
        $.ajax({
            type: 'PUT',
            url : 'http://localhost:3000/v1/contacts/'+cod,
            data: data
        });
       
        console.log(name);
        $.alert({
            content: 'Salvo com sucesso!',
            theme: 'modern',
            icon: 'fa fa-check-circle-o',
            title: 'OK!',
            backgroundDismiss: 'fechar',
            buttons:{
                fechar: function(){
                    closeModal();
                    let linhas = [];
                    linhas =  $('#contatos tr');
                    for(let i = 0; i < linhas.length; i++){
                        linhas[i].replaceWith('');
                    }
                    $.ajax({ 
                        type: 'GET',
                        url: 'http://localhost:3000/v1/contacts',
                        success: attachElements,
                        error:attachError
                    });
                }
            }
           
        });
  
}
$(document).ready(function(){
    
    $.ajax({ 
        type: 'GET',
        url: 'http://localhost:3000/v1/contacts',
        success: attachElements,
        error:attachError
    });

});
$(document).ready(function(){
    
    var enviando_formulario = false;
  
    
    $("#formulario").submit(function(e){
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
        var favorite = $("#petcheck").prop('checked');
        console.log($("#petcheck").prop('checked'));
        var dados = {
            name:name,
            email:email,
            rua:rua,
            numero:numero,
            bairro:bairro,
            complemento:complemento,
            observacao:observacao,
            sexo:sexo,
            favorite:favorite
         };
          
        if(!enviando_formulario){
            $.ajax({
              
                type: "POST",
                url: 'http://localhost:3000/v1/contacts',
                data: dados,
                async: true,
                success:  successFunction,
                error: function(request,status,error){
                    alert(request.responseText);
                }
            });
           // console.log({data});
           $(this)[0].reset();
       }
       return false;
    });

});
/* $(document).ready(function(){
    $("#search").keyup(function(){
        var rows = document.querySelectorAll("#contatos tr");
        for(let i = 0; i < rows.length; i++){
            rows[i].replaceWith('');
        }
    })
  

});
 */
$(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#contatos tr:even").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });