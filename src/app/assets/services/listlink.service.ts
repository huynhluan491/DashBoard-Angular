import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { listLink } from 'src/app/listLink';
import { Link } from 'src/app/link';

@Injectable({
    providedIn: 'root',
})
export class ListlinkService {
    data = listLink;
    private listLink$ = new BehaviorSubject<Link[]>(this.data);
    private searchValue$ = new BehaviorSubject<string>('');
    selectedLinkList: [] = [];
    isShowProduct: boolean = true;
    isShowPost: boolean = true;

    getListLink(): Observable<Link[]> {
        if (this.searchValue$.value.length <= 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                this.listLink$.next(this.data);
            }
            if (!this.isShowProduct && this.isShowPost) {
                console.log(this.listLink$.value);
                const filteredList = this.listLink$.value.filter((item) => item.type != 'product');
                this.listLink$.next(filteredList);
            }
            if (this.isShowProduct && !this.isShowPost) {
                console.log(this.listLink$.value);
                const filteredList = this.listLink$.value.filter((item) => item.type != 'post');
                this.listLink$.next(filteredList);
            }
        } else if (this.searchValue$.value.length > 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                const filteredData = this.data.filter((item) => {
                    const result = item.description
                        .toLocaleLowerCase()
                        .includes(this.searchValue$.value.toLocaleLowerCase());
                    return result;
                });
                this.listLink$.next(filteredData);
            }
            if (!this.isShowProduct && this.isShowPost) {
                let filteredTypeList = this.data.filter((item) => item.type != 'product');
                let searchedList = filteredTypeList.filter((list) => {
                    return list.description.toLocaleLowerCase().includes(this.searchValue$.value.toLocaleLowerCase());
                });
                this.listLink$.next(searchedList);
            }
            if (this.isShowProduct && !this.isShowPost) {
                let filteredTypeList = this.data.filter((item) => item.type != 'post');
                let searchedList = filteredTypeList.filter((list) => {
                    return list.description.toLocaleLowerCase().includes(this.searchValue$.value.toLocaleLowerCase());
                });
                this.listLink$.next(searchedList);
            }
        }
        return this.listLink$.asObservable();
    }

    getSearchQuery = (input: string) => {
        this.searchValue$.next(input);
        this.getListLink();
    };

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
        this.data.push(newObjectLink);
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
        this.data[index] = updatedLink;
        window.alert('EDIT SUCCESSFULLY');
    };

    deleteLink = (id: number) => {
        this.data = this.data.filter((item) => item.id != id);
        this.listLink$.next(this.data);
        console.log(this.listLink$);
    };

    deleteSelectedList = (ids: number[]) => {
        if (ids.length > 0) {
            this.data = this.data.filter((link) => !ids.includes(link.id));
            this.listLink$.next(this.data);
            window.alert('DELETE SUCCESSFULLy');
        } else {
            window.alert('SelectedLink Not Found');
        }
    };

    onFilter = (filter: { post: boolean; product: boolean }) => {
        this.isShowPost = filter.post;
        this.isShowProduct = filter.product;
        this.getListLink();
    };

    onResetFilter = () => {
        this.isShowPost = true;
        this.isShowProduct = true;
        this.getListLink();
    };
}
