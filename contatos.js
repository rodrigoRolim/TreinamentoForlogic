let contacts = [];
let i = 0;
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
                <td style="text-align:center">${contact.name}</td>
                <td style="text-align:right">
                    <a href="#1" class="bt-edex" id="ed"><i class="fa fa-pencil" aria-hidden="true"></i>editar</a>
                    <a href="#2" class="bt-edex" id="ex"><i class="fa fa-trash-o" aria-hidden="true"></i>excluir</a>
                </td>
            </tr>
            <tr id="info-${i}">
                    
                <td style="text-align:left">
                    <div>
                        <p><span>Nome:</span><span>${contact.name}</span></p>
                        <p><span>Email:</span><span>${contact.email}</span></p>
                        <p><span>Sexo:</span><span>${contact.sexo}</span></p>
                        <p><span>Rua:</span><span>${contact.rua}</span></p>
                        <p><span>Nº</span><span>${contact.numero}</span></p>
                        <p><span>Complemento</span><span>${contact.complemento}</span></p>
                        <p><span>Bairro</span><span>${contact.bairro}</span></p>

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