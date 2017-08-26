import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ICountry } from '../app/defines/ICountry';


const  filePath = join(__dirname, './data/countries.db.json');

class Country {
   static getAllCountries(): ICountry[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
}

export const CountryRouter = express.Router();

// get all countries (names)
CountryRouter.get('/country-list', (req, res) => {
  res.json(Country.getAllCountries());
});
