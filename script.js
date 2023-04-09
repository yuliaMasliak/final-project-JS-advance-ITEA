const baseUrl = 'https://swapi.dev/api/';

document.querySelector('.show').addEventListener('click', generatePeople);
// let people = document.querySelectorAll('.person');
// console.log(people);
// people.forEach((person) => {
//   person.addEventListener('click', showSinglePerson(person.id));
// });
async function generatePeople() {
  const response = await fetch(`${baseUrl}people`, {
    method: 'GET'
  });
  const people = await response.json();
  renderPeople(people.results);
  console.log(people);
}
function renderPeople(people) {
  document.querySelector('.people').innerHTML = '';
  people.forEach((person) => {
    let listItem = document.createElement('div');
    listItem.classList.add('person');
    // listItem.id = `${person.url}`;
    listItem.innerHTML = `<div>${person.name}</div>`;
    document.querySelector('.people').append(listItem);
    listItem.addEventListener('click', showSinglePerson(person.url));
  });
}

async function showSinglePerson(url) {
  let request = await fetch(url, {
    method: 'GET'
  });
  const hero = await request.json();
  console.log(hero);
  let card = document.createElement('div');
  card.innerHTML = `<ul>
  <li>${person.birth_year}</li>
  <li>${person.gender}</li>
  <li class="films"></li>
  <li class="films">${person.homeworld}</li>
  <li class="films">${person.species}</li>
</ul>`;
  document.querySelector('.personCard').innerHTML = card.innerHTML;
  document.querySelector('.personCard').classList.remove('hidden');
}
