import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { State, toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
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
        return this.http.post<any>(listProductAPI, body, httpOptions).pipe(
            map((res) => {
                const data = res.ObjectReturn;
                // const total = res.ObjectReturn.Total
                if (res.ErrorString === null) {
                    return data;
                } else {
                    console.log(res.ObjectReturn.Errors);
                }
            }),
        );
    }

    getProductByCode(ids: any): Observable<any> {
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

    testDataSource(): void {
        const kendoDataSource = {
            // page: this.state.skip / this.state.take + 1
        };

        const queryStr = `${toDataSourceRequestString(this.state)}`;
        console.log(queryStr);
    }
}
