import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ICountry } from '../app/defines/ICountry';

const  filePath = join(__dirname, './data/countries.db.json');

class Country {

   static getAllCountries(): ICountry[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
}

export const CountryRouter = express.Router();

CountryRouter.get('/country-list', (req, res) => {
  res.json(Country.getAllCountries());
});
