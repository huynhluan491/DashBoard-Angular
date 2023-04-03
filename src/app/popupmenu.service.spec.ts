import { TestBed } from '@angular/core/testing';

import { PopupMenuService } from './popupmenu.service';

describe('PopupmenuService', () => {
    let service: PopupMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PopupMenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
