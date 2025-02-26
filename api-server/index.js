const express = require('express');
const app = new express();
const port = 3000;


const { getMinNumber, getMaxNumber, getAverage, getSortedNumbers, getCount } = require('./util.js')

app.get('/number/max', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result = getMaxNumber(num1, num2);

    res.status(result.status).json(result.data);
});

app.get('/number/avg', (req, res) => {
    const numbersList = req.query.numbers;

    const result = getAverage(numbersList);

    res.status(result.status).json(result.data);
});

app.get('/number/sort', (req, res) => {
    const numbersList = req.query.numbers;
    const sortType = req.query.type;

    const result = getSortedNumbers(numbersList, sortType);

    res.status(result.status).json(result.data);
});

app.get('/number/count', (req, res) => {
    const elements = req.query.numbers;
    const search = req.query.search;

    const result = getCount(elements, search);

    res.status(result.status).json(result.data);
});

app.get('/number/min', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result = getMinNumber(num1, num2);

    res.status(result.status).json(result.data);
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})