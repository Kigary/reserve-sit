import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule , MdListModule, MdIconModule, MdCardModule} from '@angular/material';
import { MdToolbarModule, MdMenuModule, MdDialogModule, MdInputModule, MdRadioModule, MdProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule,
    MdListModule,
    MdIconModule,
    MdCardModule
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule,
    MdListModule,
    MdIconModule,
    MdCardModule
  ],
})

export class AppMaterialModule { }
