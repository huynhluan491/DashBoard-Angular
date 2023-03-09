import { Component, EventEmitter, Output, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    @Output() handleCloseEditForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() handleCloseForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() addLink: EventEmitter<object> = new EventEmitter<object>();

    ngOnInit(): void {
        this.myForm = this.fb.group({
            // linkType: ['', Validators.required],
            description: ['', Validators.required],
            // oldSite: ['', Validators.required],
            // newSite: ['', Validators.required],
        });
        this.myForm = new FormGroup({
            description: new FormControl(this.selectedLink?.description, Validators.required)
           
        })

        console.log('oninit',this.myForm.getRawValue())
        
        this.myForm.get('linkFormGroup.linkType')?.valueChanges.subscribe((value) => {
            this.myForm.get('linkFormGroup')?.patchValue({ linkType: value }, { emitEvent: false });
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges){
        this.myForm.controls['description'].setValue(this.selectedLink?.description)
        // console.log('onchange', this.selectedLink,simpleChanges,this.myForm.getRawValue())
        // simpleChanges['selectedLink'].currentValue
    }

    constructor(private fb: FormBuilder) {}

    handleOnSubmit = () => {
        const newUpdatedLink = {
            type: this.myForm.value.linkType,
            description: this.myForm.value.description,
            oldLink: this.myForm.value.oldSite,
            newLink: this.myForm.value.newSite,
        };

        this.addLink.emit(newUpdatedLink);
        this.myForm.reset();
        console.log(newUpdatedLink);
    };

    handleResetForm() {
        this.myForm.reset({
            linkFormGroup: {
                linkType: 'product',
            },
        });
    }

    findControl(controlPath: string) {
        return this.myForm.get(controlPath);
    }

    handleRadioClick(event: MouseEvent) {
        event.preventDefault();
    }

    handleClose(event: MouseEvent) {
        event.preventDefault();
        if (this.isShowEditForm) {
            this.handleCloseEditForm.emit();
            console.log('click');
        } else {
            this.handleCloseForm.emit();
        }
    }
}
