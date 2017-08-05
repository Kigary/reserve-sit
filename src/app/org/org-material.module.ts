import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdInputModule, MdToolbarModule, MdButtonModule, MdSelectModule, MdListModule, MdGridListModule,
        MdTabsModule, MdCardModule, MdDialogModule, MdCheckboxModule} from '@angular/material';


@NgModule({
  imports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdDialogModule,
    MdCheckboxModule,
  ],
  exports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdDialogModule,
    MdCheckboxModule,
  ],
})
export class OrgMaterialModule {
}
