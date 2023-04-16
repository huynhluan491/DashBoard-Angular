import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TestLisstComponent } from './test-lisst/test-lisst.component';
const routes: Routes = [
    { path: 'news/:userID', component: ProductDetailComponent },
    { path: 'news', component: TestLisstComponent },
    { path: '', redirectTo: '/news', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
