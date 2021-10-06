import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppStateStore } from './store/app-state.store';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ MomentPipe],
  exports:[CommonModule, FormsModule, ReactiveFormsModule, MomentPipe],
  providers:[ AppStateStore ]
})
export class SharedModule { }
