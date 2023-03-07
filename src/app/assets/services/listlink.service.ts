import { Injectable, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { listLink } from 'src/app/listLink';
import { Link } from 'src/app/link';

@Injectable({
    providedIn: 'root',
})
export class ListlinkService {
    constructor() {}

    getListLink(): Observable<Link[]> {
        const Links = of(listLink);
        console.log(Links);
        return Links;
    }

    getLinksByDescription(description: string): Observable<Link[]> {
        const link = listLink.filter((item) =>
            item.description.toLocaleLowerCase().includes(description.toLocaleLowerCase()),
        )!;
        const filteredLinks = of(link);
        return filteredLinks;
    }
}
