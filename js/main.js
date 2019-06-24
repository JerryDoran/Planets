const modal = document.getElementById('modal');
// const image = document.getElementById('pluto');
const closeBtn = document.querySelector('.close-btn');

// image.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', clickOutside);

class Planets {
  async getPlanets() {
    try {
      let result = await fetch('planet.json');
      let data = await result.json();

      let planets = data.planets;

      // Mapping the planets array to return data fields that mean something to us
      planets = planets.map(planet => {
        // Destructuring the json file to pull out the data we want
        const { id, name, distance, diameter } = planet;
        return { id, name, distance, diameter };
      });
      return planets;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayPlanetInfo(planets) {
    console.log(planets);
  }

  getImages() {
    const images = [...document.querySelectorAll('.image-container')];

    images.forEach(image => {
      let id = image.dataset.id;

      image.addEventListener('click', openModal);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const planets = new Planets();
  const ui = new UI();

  // Get planet information
  planets
    .getPlanets()
    .then(planets => {
      ui.displayPlanetInfo(planets);
    })
    .then(() => {
      ui.getImages();
    });
});
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
