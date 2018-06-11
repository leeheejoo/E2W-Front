import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WalletComponent } from './components/eth/wallet/wallet.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/eth/wallet/main/main.component';
import { TransactionHistoryComponent } from './components/eth/wallet/transaction-history/transaction-history.component';
import { SecretPadComponent } from './components/secret-pad/secret-pad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WalletComponent,
    NavigationComponent,
    FooterComponent,
    TransactionHistoryComponent,
    SecretPadComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
