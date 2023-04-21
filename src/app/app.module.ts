import { LOCALE_ID, NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LinkactionComponent } from './components/linkaction/linkaction.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ListlinkComponent } from './components/listlink/listlink.component';
import { FormupdateComponent } from './components/formupdate/formupdate.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatagridComponent } from './datagrid/datagrid.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PagerModule } from '@progress/kendo-angular-pager';
import { MappingPopupComponent } from './mapping-popup/mapping-popup.component';
import { ProductDashBoardComponent } from './ProductManagement/product-dash-board/product-dash-board.component';
import { DashboardHeaderComponent } from './ProductManagement/components/dashboard-header/dashboard-header.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UserActionComponent } from './ProductManagement/components/user-action/user-action.component';
import { ActionsNavigationComponent } from './ProductManagement/components/actions-navigation/actions-navigation.component';
import { CouponFormComponent } from './ProductManagement/components/coupon-form/coupon-form.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ConditionOptionComponent } from './ProductManagement/components/condition-option/condition-option.component';
import { SendNotificationComponent } from './ProductManagement/components/send-notification/send-notification.component';
import { ProgramProductsComponent } from './ProductManagement/components/program-products/program-products.component';
import { ProductListComponent } from './ProductManagement/components/product-list/product-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CalenderIconComponent } from './ProductManagement/calender-icon/calender-icon.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddProductFormComponent } from './ProductManagement/components/add-product-form/add-product-form.component';
import { CustomizedHeaderComponent } from './ProductManagement/components/customizedCalendar/customized-header/customized-header.component';
import { CustomizedCalenderComponent } from './ProductManagement/components/customized-calender/customized-calender.component';
import { FormPipePipe } from './pipes/form-pipe.pipe';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TestLisstComponent } from './test-lisst/test-lisst.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MatSelectModule } from '@angular/material/select';
import { SidebarDrawerComponent } from './ProductManagement/components/sidebar-drawer/sidebar-drawer.component';
import { CouponPageManagementComponent } from './ProductManagement/components/coupon-page-management/coupon-page-management.component';
import { DateTimePickerComponent } from './ProductManagement/components/date-time-picker/date-time-picker.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { EditDialogComponent } from './ProductManagement/components/edit-dialog/edit-dialog.component';
import { WatingPageComponent } from './ProductManagement/components/wating-page/wating-page.component';
import { FormDrawerComponent } from './ProductManagement/components/form-drawer/form-drawer.component';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        LinkactionComponent,
        SearchbarComponent,
        ListlinkComponent,
        FormupdateComponent,
        DatagridComponent,
        MappingPopupComponent,
        ProductDashBoardComponent,
        DashboardHeaderComponent,
        UserActionComponent,
        ActionsNavigationComponent,
        CouponFormComponent,
        ConditionOptionComponent,
        SendNotificationComponent,
        ProgramProductsComponent,
        ProductListComponent,
        CalenderIconComponent,
        AddProductFormComponent,
        CustomizedHeaderComponent,
        CustomizedCalenderComponent,
        FormPipePipe,
        ProductDetailComponent,
        TestLisstComponent,
        SidebarDrawerComponent,
        CouponPageManagementComponent,
        DateTimePickerComponent,
        EditDialogComponent,
        WatingPageComponent,
        FormDrawerComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbAlertModule,
        ButtonsModule,
        BrowserAnimationsModule,
        GridModule,
        GridModule,
        InputsModule,
        PagerModule,
        ToolBarModule,
        NavigationModule,
        IconsModule,
        IndicatorsModule,
        LayoutModule,
        LabelModule,
        DateInputsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatIconModule,
        MatMomentDateModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        HttpClientInMemoryWebApiModule,
        DropDownsModule,
        MatSelectModule,
        DialogsModule,
    ],
    providers: [DatePipe, MatIconRegistry],
    bootstrap: [AppComponent],
})
export class AppModule {}
