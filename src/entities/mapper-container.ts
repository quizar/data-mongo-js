
import { EntityMapperContainer } from 'quizar-domain';

export const MapperContainer = new EntityMapperContainer(['Quiz', 'QuizItem', 'WikiEntity']);

const wikiEntity = MapperContainer.createType('WikiEntity');

wikiEntity.add('id');
wikiEntity.add('lang');
wikiEntity.add('label');
wikiEntity.add('description');
wikiEntity.add('aliases');
wikiEntity.add('props');
wikiEntity.add('type');
wikiEntity.add('types');
wikiEntity.add('pageTitle');
wikiEntity.add('pageId');
wikiEntity.add('extract');
wikiEntity.add('name');
wikiEntity.add('slug');
wikiEntity.add('countQuizItems');
wikiEntity.add('countQuizzes');
wikiEntity.add('rank');
wikiEntity.add('cc2');
wikiEntity.add('createdAt');
wikiEntity.add('updatedAt');

const quizItem = MapperContainer.createType('QuizItem');

quizItem.add('id');
quizItem.add('lang');
quizItem.add('entity.id', 'entityId');
quizItem.add('property.id', 'propertyId');
quizItem.add('property.type', 'propertyType');
quizItem.add('property.value', 'propertyValue');
quizItem.add('qualifier.type', 'qualifierType');
quizItem.add('qualifier.value', 'qualifierValue');
quizItem.add('qualifier.id', 'qualifierId');
quizItem.add('image.data', 'imageData');
quizItem.add('image.propertyId', 'imageType');
quizItem.add('topics[].id', 'topicsIds[]');
quizItem.add('createdAt');
quizItem.add('updatedAt');

const quiz = MapperContainer.createType('Quiz');

quiz.add('id');
quiz.add('lang');
quiz.add('target');
quiz.add('title');
quiz.add('question');
quiz.add('description');
quiz.add('image.data', 'imageData');
quiz.add('image.propertyId', 'imageType');
quiz.add('items[].item.id', 'items[].itemId');
quiz.add('items[].order', 'items[].order');
quiz.add('items[].image.data', 'items[].imageData');
quiz.add('items[].image.propertyId', 'items[].imageType');
quiz.add('items[].title', 'items[].title');
quiz.add('items[].question', 'items[].question');
quiz.add('items[].description', 'items[].description');
quiz.add('items[].target', 'items[].target');
quiz.add('topics[].id', 'topicsIds[]');
quiz.add('createdAt');
quiz.add('updatedAt');
