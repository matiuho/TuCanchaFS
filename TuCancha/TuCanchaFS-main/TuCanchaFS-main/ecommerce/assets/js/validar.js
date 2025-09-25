function validaAdmin() {
    console.log('email : ' + document.getElementById('email').value);
    console.log('password : ' + document.getElementById('password').value);
    if (document.getElementById('email').value == 'admin' && document.getElementById('password').value == '12345') { 
        document.location.href = '../admin/index.html'
    } else { 
        alert('Usuario no permitido!');
    }
}

function addCart() { 
    console.log('addCart');
    contador = contador + 1;
}

if (sessionStorage.getItem('carro') == null) {
    sessionStorage.setItem('carro', '0');
}

function leerNumero() { 
    var valor = sessionStorage.getItem('carro');
    return valor 
}

function agregarNumero() {
    var valor = sessionStorage.getItem('carro');
    suma = parseInt(valor) + 1;
    sessionStorage.setItem('carro', suma);
}
