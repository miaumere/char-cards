import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry, Country } from 'src/app/modules/admin-panel/models/countries/country.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly countriesURL = 'https://restcountries.eu/rest/v2/all?fields=name;flag;alpha2Code';

  constructor(private http: HttpClient) {
  }


  getCountries() {
    return this.http.get<ICountry[]>(this.countriesURL).pipe(
      map(response => {
        const mappedResponse = response.map(c => new Country(c));
        return mappedResponse;
      })
    )
  }

  getFlagByCode(code: string) {
    return this.http.get<ICountry[]>(this.countriesURL).pipe(
      map(response => {
        const mappedResponse = response.map(c => new Country(c));
        return mappedResponse.find(x => x.alpha2Code === code)?.flag;
      })
    )
  }

}
