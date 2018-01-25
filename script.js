let contacts = [];
let i = 0;
let successFunction = (response)=>{
    
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
            
            <tr id="row-${i}">

                <th scope="row" style="text-align:left" >
                    <a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>
                    <a href=""><i class="fa fa-eye" aria-hidden="true"></i></a>
                </th>
                <td style="text-align:center" onclick="getRow('info-${i}')" class="contato">${contact.name}</td>
                <td style="text-align:right">
                    <a href="#1" class="bt-edex" id="ed-${contact._id}" type="button" onclick="editRow('${contact.name}',
                    '${contact.email}',
                    '${contact.rua}',
                    '${contact.numero}',
                    '${contact.bairro}',
                    '${contact.complemento}',
                    '${contact.observacao}')" data-toggle="modal" data-target="#modalEdit">
                    <i class="fa fa-pencil" aria-hidden="true"></i>editar</a>
                    <a href="#2" class="bt-edex" id="ex-${contact._id}" onclick="deleteRow('${contact._id}',this)" type="button"><i class="fa fa-trash-o" aria-hidden="true"></i>excluir</a>
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



let editRow = (name,email,rua,num,bairro,comp,obs)=>{
    //console.log(contact);
    let modal = `<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Editar Contato</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
                <div class="container">
                        <form method="get" id="formulario">
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
                                            <textarea class="form-control" aria-label="With textarea" value="${obs}" id="observacao-ed" name="observacao-ed" style="resize:none"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                        <div class="col-lg-12">
                                            <div class="radio">
                                                <label id="lb-sexo">Sexo</label>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="feminino" name="sexo" value="feminino" class="custom-control-input">
                                                    <label class="custom-control-label" for="feminino">feminino</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="masculino" name="sexo" value="masculino" class="custom-control-input">
                                                    <label class="custom-control-label" for="masculino">masculino</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                
                            </div>
                      
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </form>
                </div>
        </div>
    </div>
    </div>
    </div>`
    $('.lista-contatos').before(modal);
}
let deleteRow = (cod, r)=>{
    
    $.ajax({
        url: 'http://localhost:3000/v1/contacts/'+cod,
        type: 'DELETE',
        success: function(){
            let i = r.parentNode.parentNode.rowIndex;
            document.getElementById("table").deleteRow(i);
        },
        error: function(){
            alert("fudeu");
        } 
        
    })
    
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
                success:  successFunction,
                error: function(request,status,error){
                    alert(request.responseText);
                }
            });
           // console.log({data});
       }
       return false;
    });

});

/*<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
<div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">Editar Contato</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
            <div class="container">
                    <form method="get" id="formulario">
                        <div class="form-column align-items-center">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label  for="name-ed">Name</label>
                                        <input type="text" class="form-control mb-10 my-2" id="name-ed" name="name-ed" placeholder="Rodrigo rolim" required>
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
                                            <input type="email" class="form-control" id="email-ed" name="email-ed" placeholder="Username" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <label for="rua-ed">Rua</label>
                                        <input type="text" class="form-control" id="rua-ed" name="rua-ed">
                                    </div>
                                </div>
                               <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="numero-ed">Nº</label>
                                        <input type="text" class="form-control" id="numero-ed" name="numero-ed">
                                    </div>
                               </div>
                                
                            </div>
                           
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <label for="bairro">Bairro</label>
                                        <input type="text" class="form-control" id="bairro-ed" name="bairro-ed">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label for="complemento">Complemento</label>
                                        <input type="text" class="form-control" id="complemento-ed" name="complemento-ed">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="observacao-ed">Observação</label>
                                        <textarea class="form-control" aria-label="With textarea" id="observacao-ed" name="observacao-ed" style="resize:none"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-lg-12">
                                        <div class="radio">
                                            <label id="lb-sexo">Sexo</label>
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="feminino" name="sexo" value="feminino" class="custom-control-input">
                                                <label class="custom-control-label" for="feminino">feminino</label>
                                            </div>
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="masculino" name="sexo" value="masculino" class="custom-control-input">
                                                <label class="custom-control-label" for="masculino">masculino</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                        </div>
                  
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
            </div>
    </div>
</div>
</div>
</div>*/
