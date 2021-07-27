import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomInputComponent } from './components/customInput/customInput.component';
import { FormsModule } from '@angular/forms';
import { CustomOptionComponent } from './components/customOption/customOption.component';
import { AutoCompleteComponent } from './components/autocomplete/autocomplete.component';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputComponent,
    CustomOptionComponent,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
