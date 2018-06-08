import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WalletComponent } from './components/eth/wallet/wallet.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransactionHistoryComponent } from './components/eos/transaction-history/transaction-history.component';
import { SecretPadComponent } from './components/secret-pad/secret-pad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WalletComponent,
    NavigationComponent,
    FooterComponent,
    TransactionHistoryComponent,
    SecretPadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
