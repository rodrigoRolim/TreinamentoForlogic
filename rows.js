$(document).ready(function(){
    debugger;
      $("[id*='row-']").click(function(){
        
        let linha = $(this).attr("id");
        console.log(linha);
        if($(linha + " + tr").css("display") == 'none'){
            $(linha + " + tr").css("display","table-row");
        } else {
            $(linha + " + tr").css("display","none");
        }
    });
})