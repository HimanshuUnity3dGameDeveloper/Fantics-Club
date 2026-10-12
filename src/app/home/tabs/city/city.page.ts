import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
  standalone: false,
})
export class CityPage implements OnInit {

  selectedCard: string = "mumbai";

  selectedTag: string = '⍟ All Vibes';
  tags: string[] = [
    '⍟ All Vibes',
    '🔥 High Energy',
    '🍸 Rooftops',
    '🎷 Intimate & Supper'
  ];
  constructor() { }

  ngOnInit() {
  }

  selectTag(tag: string) {
    this.selectedTag = tag; 
  }

  onclickSelectCard(card: string){
    this.selectedCard = card
  }
}
