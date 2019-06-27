'use strict';

/**
 * this renders one card and returns the index for that card
 *
 */
function renderCard(aCardTopicIndex) {
  //locate container div document.getElementById CardDeck
  //use helper funct. add element to build out HTML with

  var card = CardTopic.list[aCardTopicIndex];

  var flipContainer = addElement(undefined, 'div', undefined, 'flip-container');
  console.log(flipContainer);

  flipContainer.onclick = function () {
    console.log('I was clicked');
    this.classList.toggle('flipped');
  };

  // TODO add ontouchstart and add dynamically changing flipCard number
  var flipCard = addElement(flipContainer, 'div', undefined, 'flip-card-0');

  var front = addElement(flipCard, 'div', undefined, 'front');
  addElement(front, 'h2', card.topicName);
  addElement(addElement(front, 'p'), 'i', undefined, card.topicIcon).style = 'color:white; font-size: 200px';
  console.log(front);
  addElement(front, 'i', undefined, 'card-0');

  var back = addElement(flipCard, 'div', undefined, 'back');
  var taskList = addElement(back, 'ul');

  // For loop creating each of the rows on the back side of the card from the skill list (card.topicSkillList)

  for (var i = 0; i < card.topicSkillList.length; i++) {

    var skill = card.topicSkillList[i];
    var li = addElement(taskList, 'li');

    var checkBox = addElement(li, 'input');
    checkBox.type = 'checkbox';
    checkBox.id = `${card.cardTopicIndex}.${i}`;
    checkBox.checked = skill.completed;
    checkBox.addEventListener('change', handleSkillChange);

    var a = addElement(li, 'a', skill.skillName);
    a.href = skill.link;
    a.target = '_blank';
  }
  return flipContainer;
}

function handleSkillChange(event) {
  var id = event.target.id;
  var fullSkillId = id.split('.');
  CardTopic.updateSkill(fullSkillId[0], fullSkillId[1], event.target.checked);
  console.log(fullSkillId, event.target.checked);
}

function renderDeck() {
  var container = document.getElementById('CardDeck');
  console.log(container);

  for (var i = 0; i < CardTopic.list.length; i++) {
    container.appendChild(renderCard(i));
  }
}


//Global variables
renderDeck();