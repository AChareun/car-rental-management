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
    const carList = await this.carService.getAll();
    res.render('car/view/car-list.html', {
      data: { carList },
      styles: 'car-list.css',
    });
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
      // eslint-disable-next-line no-unused-vars
      const savedCar = this.carService.save(car);
      res.redirect('/car');
    } catch (error) {
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
      res.redirect('/car');
    } catch (error) {
      res.redirect('/car');
    }
  }
};
