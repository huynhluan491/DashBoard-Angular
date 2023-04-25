import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';
import { State, toDataSourceRequest, toDataSourceRequestString } from '@progress/kendo-data-query';
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
    isListUpdated: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient) {}

    public state: State = {
        skip: 0,
        take: 10,
        filter: {
            filters: [
                {
                    field: 'Barcode',
                    operator: 'contains',
                    value: '',
                },
                {
                    field: 'Poscode',
                    operator: 'contains',
                    value: '',
                },
                {
                    field: 'ProductName',
                    operator: 'contains',
                    value: '',
                },
            ],
            logic: 'or',
        },
        sort: [{ field: 'Code', dir: 'desc' }],
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

    getProductByBarcode(barcode: number): Observable<any> {
        const body = {
            Barcode: barcode.toString(),
        };

        return this.http
            .post<any>('http://test.lapson.vn/api/product/GetProduct', JSON.stringify(body), httpOptions)
            .pipe(
                map((res) => {
                    return res;
                }),
            );
    }

    deleteProductByCode(code: number): Observable<any> {
        const id = {
            Code: code,
        };

        console.log(typeof code);

        console.log(JSON.stringify(id));

        return this.http.post<any>('http://test.lapson.vn/api/product/DeleteListProduct', [id], httpOptions);
    }

    updateProductByCode(updateValue: any): Observable<any> {
        const updateInfo = {
            DTO: updateValue,
            Properties: ['Price', 'PriceBase'],
        };

        console.log(JSON.stringify(updateInfo));

        return this.http
            .post<any>('http://test.lapson.vn/api/product/UpdateProduct', JSON.stringify(updateInfo), httpOptions)
            .pipe(
                map((res) => {
                    console.log(res.StatusCode);

                    if (res.ErrorString == null) {
                        return res;
                    } else {
                        console.log(res.ErrorString);
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

    _isListUpdate() {
        return this.isListUpdated.asObservable();
    }

    handleTriggerGetList() {
        let random = Math.random();
        this.isListUpdated.next(random);
    }
}
