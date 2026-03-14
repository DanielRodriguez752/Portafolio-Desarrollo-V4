/*cargar proyectos*/
async function cargarProyectos() {
  try {
    const response = await fetch(
      "https://api.github.com/users/loquendo2309/repos",
    );

    if (!response.ok) {
      throw new Error("Error al cargar los proyectos: " + response.status);
    }

    const proyectos = await response.json();
    const contenedorProyectos = document.getElementById("contenedor-proyectos");
    contenedorProyectos.innerHTML = "";
    proyectos.forEach((proyecto) => {
      contenedorProyectos.innerHTML += `
        <div class="proyecto-card">
            <h4>${proyecto.name}</h4>
            <p>${proyecto.description || "Sin descripción"}</p>
            <p><strong>Lenguaje:</strong> ${proyecto.language || "No definido"}</p>

            <a href="${proyecto.html_url}" target="_blank" class="boton-saber-mas">
                Ver en GitHub
            </a>
        </div>
    `;
    });
    animarProyectos();/*animación al cargar proyectos*/
  } catch (error) {
    console.error(error);
  }
}
cargarProyectos();

/*cambiar tema*/
const btnTema = document.getElementById("btn-tema");
const UI = {
    cuerpo: document.body,
    alternarColor: function(){
        const esVerde = this.cuerpo.style.backgroundColor === "rgb(108, 192, 145)";
        if(esVerde){
            this.cuerpo.style.backgroundColor = "white";
            this.cuerpo.style.color = "black";
        }else{
            this.cuerpo.style.backgroundColor = "#6cc091";
            this.cuerpo.style.color = "white";
        }

    }

};
btnTema.addEventListener("click", function(){
    UI.alternarColor();
});


/*cambio de color con el cursor sobre proyectos*/
const contenedor = document.getElementById("contenedor-proyectos");
contenedor.addEventListener("mouseover", function(e){
    const tarjeta = e.target.closest(".proyecto-card");
    if(tarjeta){
        tarjeta.style.backgroundColor = "rgba(77, 77, 92, 0.6)";
        const titulo = tarjeta.querySelector("h4");
        const texto = tarjeta.querySelector("p");

        if(titulo) titulo.style.color = "white";
        if(texto) texto.style.color = "white";
    }
});

contenedor.addEventListener("mouseout", function(e){
    const tarjeta = e.target.closest(".proyecto-card");
    if(tarjeta){
        tarjeta.style.backgroundColor = "";
        const titulo = tarjeta.querySelector("h4");
        const texto = tarjeta.querySelector("p");
        if(titulo) titulo.style.color = "";
        if(texto) texto.style.color = "";
    }

});
/*animación al cargar proyectos*/
function animarProyectos(){
    const proyectos = document.querySelectorAll(".proyecto-card");
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if(entrada.isIntersecting){
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
            }
        });
    });
    proyectos.forEach((proyecto) => {
        proyecto.style.opacity = "0";
        proyecto.style.transform = "translateY(40px)";
        proyecto.style.transition = "all 0.6s ease";
        observer.observe(proyecto);
    });
}
/*buscador de proyectos*/
function buscarProyectos(){

    const buscador = document.getElementById("buscar-proyectos");
    buscador.addEventListener("keyup", function(){
        const texto = this.value.toLowerCase();
        const proyectos = document.querySelectorAll(".proyecto-card");
        proyectos.forEach(proyecto => {
            const nombre = proyecto.innerText.toLowerCase();
            if(nombre.includes(texto)){
                proyecto.style.display = "block";
            }else{
                proyecto.style.display = "none";
            }
        });
    });
}
buscarProyectos();

