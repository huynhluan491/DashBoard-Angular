import { Component, EventEmitter, Output, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListlinkService } from 'src/services/listlink.service';
import { FormService } from 'src/app/form-service.service';
@Component({
    selector: 'app-formupdate',
    templateUrl: './formupdate.component.html',
    styleUrls: ['./formupdate.component.scss'],
})
export class FormupdateComponent implements OnInit {
    myForm!: FormGroup;

    @Input() isProductType!: string;
    @Input() isPostType!: string;
    @Input() descriptionValue!: string;
    @Input() oldSiteValue!: string;
    @Input() newSiteValue!: string;
    @Input() isShowEditForm!: boolean;
    @Input() selectedLink!: any;

    constructor(private myService: ListlinkService, private formService: FormService) {}

    ngOnInit(): void {
        this.myForm = new FormGroup({
            linkType: new FormControl(this.selectedLink?.type, Validators.required),
            description: new FormControl(this.selectedLink?.description, Validators.required),
            oldSite: new FormControl(this.selectedLink?.old_link, Validators.required),
            newSite: new FormControl(this.selectedLink?.new_link, Validators.required),
        });

        this.myForm.get('linkFormGroup.linkType')?.valueChanges.subscribe((value) => {
            this.myForm.get('linkFormGroup')?.patchValue({ linkType: value }, { emitEvent: false });
            console.log(this.myForm);
        });

        let isNew = this.formService.isEditForm;
        if (isNew) {
            this.myForm?.controls['linkType'].setValue(null);
            this.myForm?.controls['description'].setValue(null);
            this.myForm?.controls['oldSite'].setValue(null);
            this.myForm?.controls['newSite'].setValue(null);
            console.log('add form');
        } else {
            this.myForm?.controls['linkType'].setValue(this.selectedLink?.type);
            this.myForm?.controls['description'].setValue(this.selectedLink?.description);
            this.myForm?.controls['oldSite'].setValue(this.selectedLink?.old_link);
            this.myForm?.controls['newSite'].setValue(this.selectedLink?.new_link);
        }
    }

    ngOnChanges(simpleChanges: SimpleChanges) {}

    handleOnSubmit = () => {
        const isAdd = this.formService.isEditForm;

        if (
            this.myForm.value.description != undefined &&
            this.myForm.value.oldSite != undefined &&
            this.myForm.value.newSite != undefined
        ) {
            if (this.myForm.value.linkType) {
                const newUpdatedLink = {
                    type: this.myForm.value.linkType,
                    description: this.myForm.value.description,
                    oldLink: this.myForm.value.oldSite,
                    newLink: this.myForm.value.newSite,
                };

                if (isAdd == false) {
                    this.myService.editLink(this.selectedLink.id, newUpdatedLink);
                    this.myForm.reset();
                } else if (isAdd) {
                    this.myService.addLink(newUpdatedLink);
                    this.myForm.reset();
                }
            } else {
                window.alert('Please fill all of fields');
            }
        } else if (
            this.descriptionValue == undefined &&
            this.isPostType == undefined &&
            this.isProductType == undefined &&
            this.oldSiteValue == undefined &&
            this.newSiteValue == undefined
        ) {
            window.alert('Please fill all of fields');
        }
    };

    togglecloseForm(): void {
        this.formService.handleCloseForm();
    }
}
