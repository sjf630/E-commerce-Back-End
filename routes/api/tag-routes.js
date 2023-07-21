const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async(req, res) => {
    try {
        const tagsData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
        });
        res.status(200).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const tagDataId = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
        });

        res.status(200).json(tagDataId);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    try {
        const newTagData = await Tag.create();

        res.status(201).json(newTagData);
    } catch (err) {
        req.status(500).json(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const updatedTag = await Tag.update({
            tag_name: req.body.tag_name,
        }, {
            where: {
                id: req.params.id
            },
        });

        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const deletedTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;