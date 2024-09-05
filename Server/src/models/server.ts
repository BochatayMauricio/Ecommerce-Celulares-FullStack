import express from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import routesUsers from '../routes/user';
import routesCustomers from '../routes/customers';
import routesAdministrator from '../routes/administrator';
import routesSales from '../routes/sales';
import routesPublications from '../routes/publications';
import routesPayment from '../routes/payment';
import routesDomicile from '../routes/domicile';
import routesBrand from '../routes/brand';
import { Product } from './product';
import { User } from './user';
import { Domicile } from './domicile';
import { Publication } from './publication';
import { Sales } from './sales';
import { Shipping } from './shipping';
import { Brand } from './brand';
import { config } from 'dotenv';

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    config();
    this.app = express();
    this.port = process.env.PORT || '3306';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Aplicacion corriendo en el puerto ' + this.port)
    })
  }

  routes() {
    this.app.use('/api/products', routesProduct);
    this.app.use('/api/users', routesUsers);
    this.app.use('/api/customers', routesCustomers);
    this.app.use('/api/Administrators', routesAdministrator);
    this.app.use('/api/sales', routesSales);
    this.app.use('/api/publications', routesPublications);
    this.app.use('/api/payment', routesPayment);
    this.app.use('/api/domicile', routesDomicile);
    this.app.use('/api/brands',routesBrand);
  }

  midlewares() {
    // Parseo Body
    this.app.use(express.json());
    this.app.use(cors());
    const path = require('path')
    this.app.use('/static', express.static(path.join(__dirname, '../../../frontend/src/assets/Products')))
  }

  async dbConnect() {
    try {
      await Brand.sync();
      await Product.sync();
      await User.sync();
      await Domicile.sync();
      await Shipping.sync();
      await Publication.sync();
      await Sales.sync();
      await Domicile.sync();
      
    } catch (error) {
      console.log('Unable to connect to the database: ', error);
    }
  }

}

export default Server;