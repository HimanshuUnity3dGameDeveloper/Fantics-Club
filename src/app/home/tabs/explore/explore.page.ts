import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false,
})
export class ExplorePage implements OnInit {

  selectedCard: string = "club";

  selectedTag: string = '⍟ All Vibes';
  tags: string[] = [
    '⍟ All Vibes',
    '🔥 High Energy',
    '🍸 Rooftops',
    '🎷 Intimate & Supper'
  ];

  // cardList: any[]=[
  //   {url:'assets/Clubs/Lounge.jpg', title:'Trending Tonight', 
  //     catories: {top:'SkyLine Panoramas & cocktails', bottom:'Clubbing'}, 
  //     price:{label:'From Door/Tables', amount:'$60 / $1,500'},
  //     venue:{quantity:46, status: 'active'},
  //     topic:'Top DJs & Pyro service',
  //     descrip:{content:'Featuring headline residencies at <strong>LIV</strong>, <strong>E11EVEN</strong>, <strong>Club Space</strong> with fast-track entry and hosted VIP table pods.'}
  //   }
  // ];

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
