import * as express from 'express';
import {readFileSync} from 'fs';
import {join} from 'path';

const  filePath = join(__dirname, './data/countries.db.json');

class Country {
  countryId: string;
  name: string;

  static getAllCountries(): Country[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
}

export const CountryRouter = express.Router();

CountryRouter.get('/country-list', (req, res) => {
  res.json(Country.getAllCountries());
});
