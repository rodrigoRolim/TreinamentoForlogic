$(document).ready(function(){
    var enviando_formulario = false;
    $("#row").click(function(){
        if($("#infor").css("display") == 'none'){
            $("#infor").css("display","table-row");
        } else {
            $("#infor").css("display","none");
        }
    });
  
    $("form").submit(function(e){
        //debugger;
        e.preventDefault();
        //var form = $("#formulario").serialize();
        //var str1 = form.replace(/([=&])/g,",");
       // var str2 = str1.split(",");
        var name = $("#name").val();
        var email = $("#email").val();
        var rua = $("#rua").val();
        var numero = $("#numero").val();
        var bairro = $("#bairro").val();
        var complemento = $("#complemento").val();
        var observacao = $("#observacao").val();
        var sexo = $("#sexo").val();
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
         
         //console.log({dados});
        //console.log({str1});
       // console.log({str2});
        //var arr = [];
       // for(let i = 0; i < str2.length; i++){
           // arr[i] = {str2[i] : str2[i+1]};
       // }
       // console.log({arr});
        var submit_btn = $("button");
        var submit_text = submit_btn.val();
        //var dados = new FormData(obj);
        //console.log({dados});
        //var name = $("#name").val();
      //  var email = $("#email").val();
        //var rua = $("#rua").val();
        //var numero = $("#numero").val();
        //var bairro = $("#bairro").val();
       // var complemento = $("#complemento").val();
       // var observacao = $("#observacao").val();
        //var sexo = $("#sexo").val();
       // var formData = {'name':name,'email':email,'rua':rua,'numero':numero,'bairro':bairro,'complemento':complemento,'observacao':observacao,'sexo':sexo};
        function  volta_submit(){
            submit_btn.removeAttr('disabled');
            submit_btn.val(submit_text);
            enviando_formulario = false;
        }
        if(!enviando_formulario){
            $.ajax({
              
                type: "POST",
                url: 'http://localhost:3000/v1/contacts',
                data: dados,
                success: function(data){
                    
                    alert('dados enviados com sucesso');
                },
                error: function(request,status,error){
                    alert(request.responseText);
                }
            });
            console.log({data});
       }
       return false;
    });

});