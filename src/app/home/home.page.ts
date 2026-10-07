import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/nav-controller';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  activeTab: string = "explore";
  showTabs = true;

  constructor(
    private readonly navCtrl: NavController
  ) {}

  onChangeMode(tab: string){
    this.activeTab = tab;
    this.navCtrl.navigateRoot(['home', tab], {animated: false})
  }
}
