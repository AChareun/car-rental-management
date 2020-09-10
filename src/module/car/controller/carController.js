/* eslint-disable class-methods-use-this */

/**
 * @typedef {import('../service/carService')} CarService
 * @typedef {import('express').Application} ExpressApp
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../mapper/carMapper');

module.exports = class CarController extends AbstractController {
  /**
   * @param {CarService} carService
   */
  constructor(carService) {
    super();
    this.ROUTE_BASE = '/car';
    this.carService = carService;
  }

  /**
   * @param {ExpressApp} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.list.bind(this));
    app.get(`${ROUTE}/register`, this.register.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async list(req, res) {
    const { errors, messages } = req.session;
    const carList = await this.carService.getAll();
    res.render('car/view/car-list.html', {
      data: { carList },
      errors,
      messages,
      styles: 'car-list.css',
    });

    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  register(req, res) {
    res.render('car/view/car-form.html', {
      styles: 'car-form.css',
    });
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new Error();
    }

    try {
      const car = await this.carService.getById(id);
      res.render('car/view/car-info.html', {
        data: { car },
        styles: 'car-info.css',
      });
    } catch (error) {
      req.session.errors = [...req.session.errors, error];
      res.redirect('/car');
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async save(req, res) {
    const car = fromDataToEntity(req.body);
    try {
      const savedCar = this.carService.save(car);
      req.session.messages = [...req.session.messages, `Car N°${savedCar.id} was registered successfully`];

      res.redirect('/car');
    } catch (error) {
      req.session.errors = [...req.session.errors, error];
      res.redirect('/car');
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      const carToDelete = await this.carService.getById(id);
      await this.carService.delete(carToDelete);

      req.session.messages = [...req.session.messages, 'Requested car was successfully deleted'];
      res.redirect('/car');
    } catch (error) {
      req.session.errors = [...req.session.errors, error];
      res.redirect('/car');
    }
  }
};
