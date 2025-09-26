
const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', (e)=> {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email === 'admin' && password === '12345') {        
        document.location.href = '../admin/index.html';        
    }

    if (email === 'matias@duocuc.cl' && password === '12345') { 
        document.location.href = '../ecommerce/index.html'            
    }

    else{ 
        console.log("Usuario no permitido");
    }

});



function addCart() { 
     console.log('addCart');
     contador = contador + 1;
 }

if (sessionStorage.getItem('carro') == null) {
     sessionStorage.setItem('carro', '0');
 }

function leerNumero() { 
     let valor = sessionStorage.getItem('carro');
     return valor 
 }

 function agregarNumero() {
     let valor = sessionStorage.getItem('carro');
     suma = parseInt(valor) + 1;
     sessionStorage.setItem('carro', suma);
 }
