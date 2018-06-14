import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { WalletComponent as EthWalletComponent} from './components/eth/wallet/wallet.component';
import { MainComponent as EthMainComponent} from './components/eth/wallet/main/main.component';
import { TransactionHistoryComponent as EthTransactionHistoryComponent } from './components/eth/wallet/transaction-history/transaction-history.component';
import { WalletComponent as EOSWalletComponent} from './components/eos/wallet/wallet.component';
import { MainComponent as EOSMainComponent} from './components/eos/wallet/main/main.component';
import { TransactionHistoryComponent as EOSTransactionHistoryComponent } from './components/eos/wallet/transaction-history/transaction-history.component';
import { SecretPadComponent } from './components/secret-pad/secret-pad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AccountService} from './service/account.service';
import { EthService } from './service/eth.service';
import { EosService } from './service/eos.service';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { AuthGuard } from './utils/AuthGuard';
import { JwtInterceptor } from './utils/jwtInterceptor';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/loginReducer';
import { ethReducer } from './reducers/ethReducer';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'eth', component: EthWalletComponent, canActivate:[AuthGuard]},
  { path: 'eos', component: EOSWalletComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full'  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EthWalletComponent,
    EthMainComponent,
    EthTransactionHistoryComponent,
    EOSWalletComponent,
    EOSMainComponent,
    EOSTransactionHistoryComponent,
    NavigationComponent,
    FooterComponent,
    SecretPadComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot({ 
      'loginReducer' : loginReducer, 
      'ethReducer' : ethReducer
   })
  ],
  providers: [
    AccountService,
    EthService,
    EosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AlertDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
