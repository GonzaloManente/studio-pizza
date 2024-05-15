let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener('click',function(){

    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let fechanac = document.querySelector("#birthdate");
    let pais = document.querySelector("#pais");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let terminos = document.getElementById('terminos_condiciones');
    let flag = 0;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(nombre.value.trim()=='' || nombre.value.trim().length < 3 ){
        document.querySelector("#err-nombre").innerHTML ="Debes completar el Nombre";
        flag = 1;
    }
    else{
        document.querySelector("#err-nombre").innerHTML ="";
    }

    if(apellido.value.trim()=='' || apellido.value.trim().length < 3 ){
        document.querySelector("#err-apellido").innerHTML ="Debes completar el Apellido";
        flag = 1;
    }
    else{
        document.querySelector("#err-apellido").innerHTML ="";
    }

    if(!emailRegex.test(email.value)){
        document.querySelector("#err-email").innerHTML ="El email no tiene un formato valido.";
        flag = 1;
    }
    else{
        document.querySelector("#err-email").innerHTML ="";
    }

    if(password.value.trim()=='' || password.value.trim().length < 3 ){
        document.querySelector("#err-password").innerHTML ="Debes completar el Password";
        flag = 1;
    }
    else{
        document.querySelector("#err-password").innerHTML ="";
    }
    
    if(!terminos.checked){
        flag = 1;
    }

    if(flag == 0){
        alert('Se ha registrado correctamente!');
    }
    else{
        alert('ERROR! No se ha completado el registro.');
    }
})