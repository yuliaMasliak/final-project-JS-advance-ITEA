const baseUrl = 'https://swapi.dev/api/';

let personCard = document.querySelector('.personCard');
let overlay = document.querySelector('.overlay');
document.querySelector('.show').addEventListener('click', generatePeople);
let people = document.querySelector('.people');
async function generatePeople() {
  const response = await fetch(`${baseUrl}people`, {
    method: 'GET'
  });
  const people = await response.json();
  renderPeople(people.results);
}

function renderPeople(people) {
  document.querySelector('.people').innerHTML = '';
  people.forEach((person) => {
    let listItem = document.createElement('div');
    listItem.classList.add('person');
    listItem.id = `${person.url}`;
    listItem.innerHTML = `${person.name}`;
    document.querySelector('.people').append(listItem);
  });
}

people.addEventListener('click', () => {
  renderPopup(event.target.id);
});

async function showSinglePerson(url) {
  let hero = {
    name: '',
    birth: '',
    gender: '',
    films: [],
    planet: '',
    species: []
  };

  await fetch(url, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then(async (value) => {
      console.log(value);
      hero.name = value.name;
      hero.birth = value.birth_year;
      hero.gender = value.gender;
      let films = [];
      value.films.forEach(async (film) => {
        await fetch(film, {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((title) => {
            films.push(title.title);
          });
      });
      hero.films.push(films);
      await fetch(value.homeworld, { method: 'GET' })
        .then((response) => response.json())
        .then((planet) => (hero.planet = planet.name));
      let species = [];
      value.species.forEach(async (specy) => {
        await fetch(specy, {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((specy) => {
            species.push(specy);
          });
      });
      hero.species.push(species);
    });

  return hero;
}

async function renderPopup(url) {
  let hero = await showSinglePerson(url);

  setTimeout(() => {
    console.log(hero.species[0]);
    let species = [];
    hero.species[0].forEach((el) => {
      species.push(el.name);
    });
    let card = document.createElement('div');
    card.innerHTML = `
  <h3>${hero.name}</h3>
  <table>
  <tr>
  <td class="first-col">Birth:</td>
   <td>${hero.birth}</td>
  </tr>
  <tr>
  <td class="first-col">Gender:</td>
   <td>${hero.gender}</td>
  </tr>
   <tr>
  <td class="first-col">Films:</td>
   <td>${hero.films[0].join(',<br />')}</td>
  </tr>
   <tr>
  <td class="first-col">Planet:</td>
   <td>${hero.planet}</td>
  </tr>
    <tr>
  <td class="first-col">Species:</td>
   <td>${species.join(', ')}</td>
  </tr>
  </tr>
  </table>
  <button class="close-btn">Close</button>`;
    personCard.innerHTML = card.innerHTML;
    personCard.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.querySelector('.close-btn').addEventListener('click', closePopup);
  }, 1000);
}

overlay.addEventListener('click', closePopup);

function closePopup() {
  personCard.classList.add('hidden');
  overlay.classList.add('hidden');
}
