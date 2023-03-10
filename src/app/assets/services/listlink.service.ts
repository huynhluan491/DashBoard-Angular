import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { listLink } from 'src/app/listLink';
import { Link } from 'src/app/link';

@Injectable({
    providedIn: 'root',
})
export class ListlinkService {
    private listLink$ = new BehaviorSubject<Link[]>(listLink);
    selectedLinkList: [] = [];
    // constructor(private db: AngularFireDatabase) {
    //     this.listLink$ = this.db.list('/links').valueChanges();
    // }

    getListLink(): Observable<Link[]> {
        return this.listLink$;
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
        window.alert('ADD SUCCESSFULLY');
    };

    editLink = (id: number, newlink: { type: string; description: string; oldLink: string; newLink: string }) => {
        const index = this.listLink$.value.findIndex((x) => x.id == id);
        if (index === -1) {
            window.alert('Khong tim thay link');
        }
        const updatedLink = {
            ...this.listLink$.value[index],
            type: newlink.type,
            description: newlink.description,
            old_link: newlink.oldLink,
            new_link: newlink.newLink,
        };
        const updatedList = [...this.listLink$.value];
        updatedList[index] = updatedLink;
        this.listLink$.next(updatedList);
    };

    deleteLink = (id: number) => {
        const deletedLink = this.listLink$.value.filter((list) => list.id !== id);
        this.listLink$.next(deletedLink);
        window.alert('DELETE SUCCESSFULLy');
    };

    deleteSelectedList(ids: number[]): Observable<Link[]> {
        const currentLinks = this.listLink$.getValue();
        const newLinks = currentLinks.filter((link) => !ids.includes(link.id));
        this.listLink$.next(newLinks);
        window.alert('DELETE SUCCESSFULLy');
        return of(newLinks);
    }

    // deleteSelectedList = (list: []) => {
    //     const newUpdatedList = list.filter((id) => !this.listLink$.value.includes(id));
    //     this.listLink$.next(newUpdatedList);
    //     console.log(this.listLink$.value);
    // };
}
