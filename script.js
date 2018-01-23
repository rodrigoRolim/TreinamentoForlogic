$(document).ready(function(){
    $("#row").click(function(){
        if($("#infor").css("display") == 'none'){
            $("#infor").css("display","table-row");
        } else {
            $("#infor").css("display","none");
        }
    });
    let attchValues = ()=>{
        $("input[type='submit']").click(function(){
            $("")
        });
    }
    $("input[type='submit']").click(function(){
        $.ajax({
            type: "POST",
            url: 'contacts.db',
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                rua:$("#rua").val(),
                numero:$("#numero").val(),
                bairro:$("#bairro").val(),
                complemento:$("#complemento").val(),
                observacao:$("#observacao").val(),
                sexo:$("#sexo").val()
            },
            success: alert("deu certo"),
            dataType: 'json',
            error: alert("erooou")
        });
    });

});