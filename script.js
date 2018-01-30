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


let closeModal = ()=>{
   let x='';
   $('.container .modal').replaceWith(x);
   $('.modal-backdrop').replaceWith(x);
   $('body').attr('class','');
   $('body').attr('style','');
 
}

$(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#contatos tr:even").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
     
    });
  });