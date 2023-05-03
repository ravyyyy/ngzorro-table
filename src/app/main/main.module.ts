import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzTableModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
