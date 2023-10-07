const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  const tour = tours.find((item) => item.id === +req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};
exports.checkBody = (req, res, next) => {
  console.log(req.body.name);
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'fail post request',
      message: 'Missing name or price',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getIdTour = (req, res) => {
  console.log(req.params);
  const tour = tours.find((item) => item.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.postTour = (req, res) => {
  console.log(req.body);

  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );

  // 一次请求中，响应只能出现一次
  // res.send('Done')
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<Update></Update>',
    },
  });
};
exports.deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};