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



function validarCorreo(correo) {
    if (correo.length > 100) return false;
    return /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/i.test(correo);
}

function validarUsuario() {

    var nombre = document.getElementById('nombre').value.trim();
    var apellidos = document.getElementById('apellidos').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var direccion = document.getElementById('direccion').value.trim();
    // Región y comuna deben tener select con id 'region' y 'comuna'
    var region = document.getElementById('region').value;
    var comuna = document.getElementById('comuna').value;

    
    if (!nombre || nombre.length > 50) {
        alert('Nombre requerido y máximo 50 caracteres.');
        return false;
    }
    if (!apellidos || apellidos.length > 100) {
        alert('Apellidos requeridos y máximo 100 caracteres.');
        return false;
    }
    if (!correo || !validarCorreo(correo)) {
        alert('Correo requerido, máximo 100 caracteres y debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return false;
    }
    if (!direccion || direccion.length > 300) {
        alert('Dirección requerida y máximo 300 caracteres.');
        return false;
    }
    if (!region) {
        alert('Debe seleccionar una región.');
        return false;
    }
    if (!comuna) {
        alert('Debe seleccionar una comuna.');
        return false;
    }
    // Si todo está correcto
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const comunasPorRegion = {
        'Metropolitana': [
            'Santiago', 'Maipú', 'Puente Alto', 'Las Condes', 'La Florida', 'Ñuñoa'
        ],
        'Valparaíso': [
            'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'
        ]
    };

    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    if(regionSelect && comunaSelect) {
        regionSelect.addEventListener('change', function() {
            const region = this.value;
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
            if (comunasPorRegion[region]) {
                comunasPorRegion[region].forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            }
        });
    }
});
