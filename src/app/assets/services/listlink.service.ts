import { Injectable, OnInit } from '@angular/core';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { listLink } from 'src/app/listLink';
import { Link } from 'src/app/link';

@Injectable({
    providedIn: 'root',
})
export class ListlinkService {
    //private listLink$ = new BehaviorSubject<Link[]>(listLink);
    private listLink$ = new BehaviorSubject<Link[]>(listLink);

    constructor() {}

    getListLink(): Observable<Link[]> {
        // const Links = of(listLink);
        // console.log(Links);
        // return Links;

        return this.listLink$.asObservable();
    }

    getLinksByDescription(description: string) {
        const link = this.listLink$.value.filter((item) =>
            item.description.toLocaleLowerCase().includes(description.toLocaleLowerCase()),
        )!;
        const filteredLinks = of(link);
        return filteredLinks;
    }

    addLink = (newlink: { type: string; description: string; oldLink: string; newLink: string }) => {
        const newObjectLink = {
            id: this.listLink$.value[this.listLink$.value.length - 1].id + 1,
            type: newlink.type,
            description: newlink.description,
            old_link: newlink.oldLink,
            new_link: newlink.newLink,
        };

        this.listLink$.next([...this.listLink$.value, newObjectLink]);
    };

    editLink = (id: number, newlink: { type: string; description: string; oldLink: string; newLink: string }) => {
        const newObjectLink = {
            id: this.listLink$.value[this.listLink$.value.length - 1].id + 1,
            type: newlink.type,
            description: newlink.description,
            old_link: newlink.oldLink,
            new_link: newlink.newLink,
        };

        this.listLink$.next([...this.listLink$.value, newObjectLink]);
    };

    deleteLink = (id: number) => {
        this.listLink$.next(this.listLink$.value.filter((list) => list.id !== id));
    };
}
