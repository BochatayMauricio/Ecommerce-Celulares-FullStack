import express from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import routesUsers from '../routes/user';
import routesCustomers from '../routes/customers';
import routesAdministrator from '../routes/administrator';
import routesSales from '../routes/sales';
import { Product } from './product';
import { User } from './user';
import { Domicile } from './domicile';
import { Publication } from './publication';
import { Sales } from './sales';
import { Shipping } from './shipping';

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
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
  }

  midlewares() {
    // Parseo Body
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await Product.sync();
      await User.sync();
      await Domicile.sync();
      await Shipping.sync();
      await Publication.sync();
      await Sales.sync();
    } catch (error) {
      console.log('Unable to connect to the database: ', error);
    }
  }

}

export default Server;