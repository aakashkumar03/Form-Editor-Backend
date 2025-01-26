const express = require('express');
const router = express.Router();
const Form = require('../schema/from.schema');


router.get('/', async (req, res) => {
    try {
        const forms = await Form.find({}); 
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/create', async (req, res) => {
    const form = new Form({
        title: req.body.title,
        fields: req.body.fields,
        formId: Date.now()
    });
    
    try {
        const newForm = await form.save();
        res.status(201).json({newForm,message:"Form created successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const updatedObject = {
            title: req.body.title,
            fields: req.body.fields,
            formId: Number(req.params.id)
        }
        const updatedForm = await Form.findOneAndUpdate(
            {formId:Number(req.params.id)},
            updatedObject
        );
        
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        
        res.json(updatedForm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findOne({formId:Number(req.params.id)}  );
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/V2/:id', async (req, res) => {
    try {
        const form = await Form.findOne({formId:Number(req.params.id)}  );
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        const resArr=[
            {
                title:form.title,
                type:'text'
            }
        ]
        let finalArray= [...resArr,...form.fields]
        res.json(finalArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await Form.deleteOne({formId:Number(req.params.id)});
        res.json({message:"Form deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
