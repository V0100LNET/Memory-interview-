import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { GameComponent } from './pages/game/game.component';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    GameComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrincipalModule { }
