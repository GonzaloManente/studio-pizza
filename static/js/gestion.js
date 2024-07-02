// const BASEURL = 'http://127.0.0.1:5000';

const BASEURL = 'https://gmanente.pythonanywhere.com/'

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de promociones
 * por medio del uso de template string de JS.
 */
async function showPromos(){
    let promos =  await fetchData(BASEURL+'/api/promos/', 'GET');
    
    const tablePromos = document.querySelector('#list-table-promos tbody');
    tablePromos.innerHTML='';
    promos.forEach((promo, index) => {
      let tr = `<tr>
                    <td>${promo.nombre_promocion}</td>
                    <td>${promo.detalle_pizzas}</td>
                    <td>${promo.precio_promocion}</td>
                    <td>
                        <button class="btn-cac" onclick='updatePromo(${promo.id_promocion})'><i color="Red"; class="fa fa-pencil"></button></i>
                        <button class="btn-cac" onclick='deletePromo(${promo.id_promocion})'><i class="fa fa-trash"></button></i>
                    </td>
                  </tr>`;
      tablePromos.insertAdjacentHTML("beforeend",tr);
    });
  }

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * una promocion
 * @returns 
 */
async function savePromo(){
    const id_promocion = document.querySelector('#id_promocion').value;
    const nombre_promocion = document.querySelector('#nombre_promocion').value;
    const detalle_pizzas = document.querySelector('#detalle_pizzas').value;
    const precio_promocion = document.querySelector('#precio_promocion').value;
    //VALIDACION DE FORMULARIO
    if (!nombre_promocion || !detalle_pizzas || !precio_promocion) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const promoData = {
        nombre_promocion: nombre_promocion,
        detalle_pizzas: detalle_pizzas,
        precio_promocion: precio_promocion
    };
  let result = null;
  // Si hay un id_promocion, realiza una petición PUT para actualizar la promoción existente
  if(id_promocion!==""){
    result = await fetchData(`${BASEURL}/api/promos/${id_promocion}`, 'PUT', promoData);
  }else{
    // Si no hay id_promocion, realiza una petición POST para crear una nueva promocion
    result = await fetchData(`${BASEURL}/api/promos/`, 'POST', promoData);
  }
  
  const formPromo = document.querySelector('#form-promo');
  formPromo.reset();
  Swal.fire({
    title: 'Operación relizada con éxito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar',
  })
  showPromos();
}
  
/**
 * Function que permite eliminar una promocion del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deletePromo(id){
    Swal.fire({
        title: "Esta seguro de eliminar la promoción?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/promos/${id}`, 'DELETE');
          showPromos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updatePromo(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/promos/${id}`, 'GET');
    const id_promocion = document.querySelector('#id_promocion');
    const nombre_promocion = document.querySelector('#nombre_promocion');
    const detalle_pizzas = document.querySelector('#detalle_pizzas');
    const precio_promocion = document.querySelector('#precio_promocion');
    
    id_promocion.value = response.id_promocion;
    nombre_promocion.value = response.nombre_promocion;
    detalle_pizzas.value = response.detalle_pizzas;
    precio_promocion.value = response.precio_promocion;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSavePromo = document.querySelector('#btn-save-promo');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSavePromo.addEventListener('click',savePromo);
    showPromos();
});
  