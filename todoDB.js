
const path = require('path');
const uuid = require('node-uuid');
const JSData = require('js-data');
const DSNedbAdapter = require('js-data-nedb');

const store = new JSData.DS();
const adapter = new DSNedbAdapter();

store.registerAdapter('nedb', adapter, { default: true });

const List = store.defineResource({
	name: 'list',
	filepath: path.join(__dirname, '/data/listData.db'),
	relations: {
		hasMany: {
			card: {
				localField: 'cards',
				foreignKey: 'listId'
			}
		}
	}
});

const Card = store.defineResource({
	name: 'card',
	filepath: path.join(__dirname, '/data/cardData.db'),
	relations: {
		belongsTo: {
			list: {
				localField: 'list',
				foreignKey: 'listId'
			}
		}
	}
});

function getLists() {

	const params = {};

	const options = {
		with: ['card']
	};

	return List.findAll(params, options);
}

function addList(name, description) {

	return List.create({
		id: uuid.v4(),
		name: name,
		description: description
	});
}

function saveList(list) {

	return List.update(list.Id, list);
}

function deleteList(list) {

	return List.destroy(list.Id);
}

function getCards(listId) {

	const params = {
		where: {
			listId: {
				'==': listId
			}
		}
	};

	return Card.findAll(params);
}

function addCard(listId, summary, detail) {

	return Card.create({
		id: uuid.v4(),
		listId: listId,
		summary: summary,
		detail: detail
	});
}

function saveCard(card) {

	return Card.update(card.Id, card);
}

function deleteCard(card) {

	return Card.destroy(card.Id);
}

module.exports = {
	getLists: getLists,
	addList: addList,
	saveList: saveList,
	deleteList: deleteList,
	getCards: getCards,
	addCard: addCard,
	saveCard: saveCard,
	deleteCard: deleteCard
};