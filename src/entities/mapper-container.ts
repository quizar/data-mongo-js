
import { EntityMapperContainer } from 'quizar-domain';

export const MapperContainer = new EntityMapperContainer(['Quiz', 'QuizItem', 'WikiEntity']);

const wikiEntityTypeInfo = MapperContainer.createType('WikiEntity');

wikiEntityTypeInfo.add('id');
wikiEntityTypeInfo.add('lang');
wikiEntityTypeInfo.add('label');
wikiEntityTypeInfo.add('description');
wikiEntityTypeInfo.add('aliases');
wikiEntityTypeInfo.add('props');
wikiEntityTypeInfo.add('types');
wikiEntityTypeInfo.add('pageTitle');
wikiEntityTypeInfo.add('extract');
wikiEntityTypeInfo.add('name');
wikiEntityTypeInfo.add('slug');
wikiEntityTypeInfo.add('countQuizItems');
wikiEntityTypeInfo.add('countQuizzes');
wikiEntityTypeInfo.add('createdAt');
wikiEntityTypeInfo.add('updatedAt');

const quizItemTypeInfo = MapperContainer.createType('QuizItem');

quizItemTypeInfo.add('id');
quizItemTypeInfo.add('lang');
quizItemTypeInfo.add('entity.id', 'entityId');
quizItemTypeInfo.add('propertyId');
quizItemTypeInfo.add('value.type', 'valueType');
quizItemTypeInfo.add('value.value', 'value');
quizItemTypeInfo.add('value.entity.id', 'valueEntityId');
quizItemTypeInfo.add('qualifier.type', 'qualifierType');
quizItemTypeInfo.add('qualifier.value', 'qualifierValue');
quizItemTypeInfo.add('qualifier.id', 'qualifierId');
quizItemTypeInfo.add('image.data', 'imageData');
quizItemTypeInfo.add('image.propertyId', 'imageType');
quizItemTypeInfo.add('pageTitle');
quizItemTypeInfo.add('topics[].id', 'topicsIds[]');
quizItemTypeInfo.add('createdAt');
quizItemTypeInfo.add('updatedAt');

const quizInfo = MapperContainer.createType('Quiz');

quizInfo.add('id');
quizInfo.add('lang');
quizInfo.add('target');
quizInfo.add('title');
quizInfo.add('question');
quizInfo.add('description');
quizInfo.add('image.data', 'imageData');
quizInfo.add('image.propertyId', 'imageType');
quizInfo.add('items[].item.id', 'items[].itemId');
quizInfo.add('items[].order', 'items[].order');
quizInfo.add('items[].image.data', 'items[].imageData');
quizInfo.add('items[].image.propertyId', 'items[].imageType');
quizInfo.add('items[].title', 'items[].title');
quizInfo.add('items[].question', 'items[].question');
quizInfo.add('items[].description', 'items[].description');
quizInfo.add('items[].target', 'items[].target');
quizInfo.add('createdAt');
quizInfo.add('updatedAt');
