import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppStateStore } from './store/app-state.store'
@NgModule({
  imports: [CommonModule],
  declarations: [ ],
  exports:[CommonModule, FormsModule, ReactiveFormsModule],
  providers:[ AppStateStore ]
})
export class SharedModule { }
