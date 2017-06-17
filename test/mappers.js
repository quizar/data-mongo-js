'use strict';

const assert = require('assert');
const mappers = require('../lib/entities/mappers');

const wikiEntityMapper = new mappers.WikiEntityMapper();
const quizMapper = new mappers.QuizMapper();

describe('mappers', function () {
    it('WikiEntity->Data WikiEntity', function () {
        const domainEntity = {
            id: 'Q100',
            lang: 'ro',
            label: 'Label Name',
            description: 'Some desc',
            aliases: ['Label Name 2', 'nmame 3'],
            pageTitle: 'Page title',
            categories: [{ id: 'Q1' }, { id: 'Q23' }]
        };
        const entity = wikiEntityMapper.fromDomainEntity(domainEntity);
        assert.equal(domainEntity.id, entity.id);
        assert.equal(domainEntity.lang, entity.lang);
        assert.equal(domainEntity.label, entity.label);
        assert.equal(domainEntity.description, entity.description);
        assert.equal(domainEntity.aliases.length, entity.aliases.length);
        assert.equal(domainEntity.pageTitle, entity.pageTitle);
        assert.equal(undefined, entity.categories);
    });

    it('Quiz->Data Quiz', function () {
        const domainQuiz = {
            id: 'id',
            lang: 'ro',
            title: 'Label Name',
            description: 'Some desc',
            items: [{ item: { id: 'itemid1' } }],
            image: { data: 'image data', propertyId: 'P232' }
        };
        const entity = quizMapper.fromDomainEntity(domainQuiz);

        // console.log(entity)

        assert.equal(domainQuiz.id, entity.id);
        assert.equal(domainQuiz.lang, entity.lang);
        assert.equal(domainQuiz.title, entity.title);
        assert.equal(domainQuiz.description, entity.description);
        assert.equal(domainQuiz.items.length, entity.items.length);
        assert.equal(domainQuiz.items[0].item.id, entity.items[0].itemId);
        assert.equal(domainQuiz.image.propertyId, entity.imageType);

    });
});
