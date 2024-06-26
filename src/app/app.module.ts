import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { DetailComponent } from './views/detail/detail.component';
import { SearchComponent } from './views/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntlCro } from './common/utils/MatPaginatorIntlCro';
import { PostRoomComponent } from './views/post-room/post-room.component';
import { LoginComponent } from './views/login/login.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { ImagePreviewComponent } from './views/image-preview/image-preview.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RoomPreviewComponent } from './views/room-preview/room-preview.component';
import { ManagerComponent } from './views/manager/manager.component';
import { DashboardComponent } from './views/manager/dashboard/dashboard.component';
import { UserComponent } from './views/manager/user/user.component';
import { CurrencyFormatDirective } from './common/directive/currency-format.directive';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridTableComponent } from './common/GUI/grid-table/grid-table.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppHttpInterceptor } from './common/interceptor/http.interceptor';
import { UserDialogComponent } from './views/manager/user/user-dialog/user-dialog.component';
import { RegisterComponent } from './views/register/register.component';
import { UserRoomComponent } from './views/user-room/user-room.component';
import { FavoriteRoomComponent } from './views/favorite-room/favorite-room.component';
import { DialogComfirmComponent } from './common/GUI/dialog-comfirm/dialog-comfirm.component';
import { BookingRoomComponent } from './views/booking-room/booking-room.component';
import { BookingDialogComponent } from './views/booking-room/booking-dialog/booking-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailComponent,
    SearchComponent,
    PostRoomComponent,
    LoginComponent,
    ImagePreviewComponent,
    RoomPreviewComponent,
    ManagerComponent,
    DashboardComponent,
    UserComponent,
    GridTableComponent,
    CurrencyFormatDirective,
    UserDialogComponent,
    RegisterComponent,
    UserRoomComponent,
    FavoriteRoomComponent,
    DialogComfirmComponent,
    BookingRoomComponent,
    BookingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatPaginatorModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatChipsModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    MatSidenavModule,
    MatListModule,
    NgxCurrencyDirective,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgChartsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
  },
    CurrencyPipe,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
