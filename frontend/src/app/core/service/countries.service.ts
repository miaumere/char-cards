import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ICountry,
    Country,
} from 'src/app/modules/admin-panel/models/countries/country.model';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http
            .get('https://restcountries.com/v3.1/all?fields=name,flags,cca2')
            .pipe(
                map((response) => {
                    const typedResponse = response as ICountry[];
                    const mappedResponse = typedResponse.map(
                        (c) => new Country(c)
                    );

                    const potsdamCountry: ICountry = {
                        flags: {
                            svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Flag_of_Potsdam.svg/1920px-Flag_of_Potsdam.svg.png',
                            png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Flag_of_Potsdam.svg/1920px-Flag_of_Potsdam.svg.png',
                        },
                        name: { common: 'Podstam' },
                        cca2: 'PDM',
                    };

                    const NRD: ICountry = {
                        flags: {
                            svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Flag_of_East_Germany.svg/1920px-Flag_of_East_Germany.svg.png',
                            png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Flag_of_East_Germany.svg/1920px-Flag_of_East_Germany.svg.png',
                        },
                        name: { common: 'NRD' },
                        cca2: 'NRDGERMANY',
                    };

                    mappedResponse.push(potsdamCountry, NRD);

                    mappedResponse.sort((a, b) =>
                        a.name.common.localeCompare(b.name.common)
                    );
                    return mappedResponse;
                })
            );
    }

    getFlagByCode(code: string): Observable<Country | undefined> {
        return this.getCountries().pipe(
            map((response) => {
                const mappedResponse = response.map((c) => new Country(c));
                return mappedResponse.find((x) => x.cca2 === code);
            })
        );
    }

    getCountryByCode(code: string) {
        return this.getCountries().pipe(
            map((response) => {
                const mappedResponse = response.map((c) => new Country(c));
                return mappedResponse.find((x) => x.cca2 === code);
            })
        );
    }
}
