import { importProvidersFrom } from "@angular/core";

import { provideHttpClient, withXhr, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppComponent } from "./app/app.component";


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatDialogModule, MatSnackBarModule),
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
