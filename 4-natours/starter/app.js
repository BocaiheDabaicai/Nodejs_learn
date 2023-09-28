const fs = require('fs')
const express = require('express')
const app = express();
const morgan = require('morgan')

// 1. 中间件
// 添加中间件
app.use(morgan('dev'));
app.use(express.json())
app.use((req, res, next) => {
    console.log('Hello from the middleware 😐')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// 2. 路由处理函数
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

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}
const getIdUser = (req, res) => {
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
const postUser = (req, res) => {
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
const updateUser = (req, res) => {

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
const deleteUser = (req, res) => {
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

// 3. 路由连接
const tourRouter = express.Router();
app.use('/api/v1/tours',tourRouter)

// 重构写法
tourRouter.route('/')
    .get(getAllTours)
    .post(postTour)

tourRouter.route('/:id')
    .get(getIdTour)
    .patch(updateTour)
    .delete(deleteTour)

app.route('/api/v1/users')
    .get(getAllUsers)
    .post(postUser)

app.route('/api/v1/users/:id')
    .get(getIdUser)
    .patch(updateUser)
    .delete(deleteUser)

// 4. 启动服务
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
