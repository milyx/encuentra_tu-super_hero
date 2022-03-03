document.getElementById("button").addEventListener("click", () => {
  const numSuperHero = document.getElementById("number").value;
  let resultado = validarHero(numSuperHero);

  if (resultado == false) {
    alert("Error, dato inválido");
  } else {
    consultarApi(numSuperHero);
  }
});
const validarHero = (number) => {
  const patron = /[0-9]/gim;

  if (patron.test(number)) {
    return true;
  } else {
    return false;
  }
};

const consultarApi = (number) => {
  $.ajax({
    type: "get",
    url: "https://www.superheroapi.com/api.php/4905856019427443/" + number,
    dataType: "json",
  }).done((response) => {
    console.log(response);
    document.getElementById("card").innerHTML = `
     <h1 class="title1">SuperHero encontrado</h1>
    <div class="card mb-3" style="max-width: 540px;"> 
        <div class="row g-0">
            <div class="col-md-4">
              <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Nombre: ${response.name}</h5>
                <p class="card-text">Conexiones: ${response.connections.relatives}</p>
                <p class="card-text"><small class="text-muted">Publicado por: ${response.biography.publisher}</small></p>
                <p class="border-bottom">${response.work.occupation}</p>
                <p class="border-bottom">Altura: ${response.appearance.height}</p>
                <p class="border-bottom">Peso: ${response.appearance.weight}</p>
                <p class="border-bottom">Alianzas: ${response.connections.relatives}</p>
              </div>
            </div>
          </div>
        </div>
    `;
    var chart = new CanvasJS.Chart("pastel", {
      title: {
        text: "Estadísticas de Poder para Deadpool",
      },
      legend: {
        maxWidth: 290,
        itemWidth: 120,
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{indexLabel}",
          dataPoints: [
            {
              y: parseInt(response.powerstats.intelligence),
              indexLabel: "Intelligence",
            },
            {
              y: parseInt(response.powerstats.strength),
              indexLabel: "strength",
            },
            { y: parseInt(response.powerstats.speed), indexLabel: "Speed" },
            {
              y: parseInt(response.powerstats.durability),
              indexLabel: "Durability",
            },
            { y: parseInt(response.powerstats.power), indexLabel: "Power" },
            { y: parseInt(response.powerstats.combat), indexLabel: "Combat" },
          ],
        },
      ],
    });

    chart.render();
  });
};
