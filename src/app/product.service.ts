import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import {
    State,
    toDataSourceRequest,
    toDataSourceRequestString,
    translateDataSourceResultGroups,
} from '@progress/kendo-data-query';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

const listProductAPI = 'http://test.lapson.vn/api/product/GetListProduct';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) {}

    public state: State = {
        skip: 0,
        take: 10,
        filter: {
            logic: 'and',
            filters: [
                { field: 'productName', operator: 'contains', value: 'kendo' },
                { field: 'Code', operator: 'gte', value: 453 },
            ],
        },
        sort: [{ field: 'productName', dir: 'asc' }],
    };

    getListProduct(body: any): Observable<any> {
        console.log(body);
        console.log(toDataSourceRequest(body));

        return this.http.post<any>(listProductAPI, toDataSourceRequest(body), httpOptions).pipe(
            map((res) => {
                const data = res.ObjectReturn;
                // const total = res.ObjectReturn.Total
                if (res.ErrorString === null) {
                    return data;
                } else {
                    console.log(data.Errors);
                }
            }),
        );
    }

    getProductByIds(ids: any): Observable<any> {
        console.log(ids);

        return this.http.post<any>('http://test.lapson.vn/api/product/GetListProductByIDs', ids, httpOptions).pipe(
            map((res) => {
                const data = res.ObjectReturn;

                if (res.ErrorString === null) {
                    return data[0];
                } else {
                    console.log(res.ObjectReturn.Errors);
                }
            }),
        );
    }

    getProductByCode(code: number): Observable<any> {
        const body = {
            Code: code,
        };

        return this.http
            .post<any>('http://test.lapson.vn/api/product/GetProduct', JSON.stringify(body), httpOptions)
            .pipe(
                map((res) => {
                    const data = res.ObjectReturn;

                    if (res.ErrorString === null) {
                        console.log(data);

                        return data;
                    } else {
                        console.log(res.ObjectReturn.Errors);
                    }
                }),
            );
    }

    testDataSource(): void {
        const kendoDataSource = {
            // page: this.state.skip / this.state.take + 1
        };

        const queryStr = `${toDataSourceRequestString(this.state)}`;
        console.log(queryStr);
    }

    getSearchValue() {
        return this.searchValue.asObservable();
    }

    setSearchValue(value: string) {
        this.searchValue.next(value);
    }
}
