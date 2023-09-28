const express = require("express");
const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tours
        }
    })
}
const getIdTour = (req, res) => {
    console.log(req.params)
    const tour = tours.find(item => item.id === +req.params.id)

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success', data: {
            tour
        }
    })
}
const postTour = (req, res) => {
    console.log(req.body)

    const newId = tours.at(-1).id + 1;
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success', data: {
                tour: newTour
            }
        })
    })

    // 一次请求中，响应只能出现一次
    // res.send('Done')
}
const updateTour = (req, res) => {

    if (+req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'succes',
        data: {
            tour: '<Update></Update>'
        }
    })
}
const deleteTour = (req, res) => {
    if (+req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

const router = express.Router();

router.route('/')
    .get(getAllTours)
    .post(postTour)

router.route('/:id')
    .get(getIdTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;