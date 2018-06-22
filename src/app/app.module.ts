import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
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
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
   MatDialogModule, MatMenuModule, MatDividerModule, MatListModule, MatGridListModule, MatTableModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AccountService} from './service/account.service';
import { EthService } from './service/eth.service';
import { EosService } from './service/eos.service';
import { WebsocketService } from './service/websocket.service';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { TransferEthDialogComponent } from './components/dialog/transfer-eth-dialog/transfer-eth-dialog.component';
import { AuthGuard } from './utils/AuthGuard';
import { JwtInterceptor } from './utils/jwtInterceptor';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/loginReducer';
import { ethReducer } from './reducers/ethReducer';
import { navigationReducer } from './reducers/navigationReducer';
import { QRCodeModule } from 'angular2-qrcode';
import { AddTokenDialogComponent } from './components/dialog/add-token-dialog/add-token-dialog.component';
import { WalletComponent as EthErc20WalletComponent } from './components/eth/erc20/wallet/wallet.component';
import { MainComponent as EthErc20MainComponent } from './components/eth/erc20/wallet/main/main.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'eth', component: EthWalletComponent, canActivate:[AuthGuard]},
	{ path: 'eth/erc20/:address', component: EthErc20WalletComponent, canActivate:[AuthGuard]},
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
    TransferEthDialogComponent,
    AddTokenDialogComponent,
    EthErc20WalletComponent,
    EthErc20MainComponent,
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
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    QRCodeModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot({ 
      'loginReducer' : loginReducer, 
    'ethReducer' : ethReducer,
    'navigationReducer' : navigationReducer
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
    AlertDialogComponent,
    TransferEthDialogComponent,
    AddTokenDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){

  }
  
}
