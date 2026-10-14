import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.page.html',
  styleUrls: ['./lineups.page.scss'],
  standalone: false,
})
export class LineupsPage implements OnInit {

  venueLogo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwNWWtJXpfvW1uHr1xkzC5ujW7nd-Af2uz0SdvGZYmIiTFKHkwDgHieG7fJGTfaPZuXdibP7xe5LZRn3zbpFyYVz0jZh30qVuKKotOAn4MY93-eD7iuZtOGFsLjgyf1uu4ImUuOivipz1oGgjbEk7AXJQRTulPgwC5WefaMOK3weFkFkxJ7tAuzLrt4V4SNfUdLt30PSAyMajWXOWI7hkDSNGPZv66Rz6r5pR7aqWgUqgvE0lr6HBs1w';
  userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmh_fSQ0FDr60IXMWZVtjxZ_1IAHGpBrXBWplFTimeYlnsPLe6PDKMJxs31UUgRkF7HyVgcW3YLDv05C9l3f7KnVmSu3G6qrv3sJ3vIdxYSByJoR4Obu2sqIK2rkeXzaH3VYpbiwIxm4KsT-EoszFLEVkMriK2ghOAj8K-uxcljfRDYrtomesfUtX86V_nQ96iI5pzrwGbrPQdP8GnkDV3h30cGwrS0i4w7et-49gdM4rBGz-5vHhnjQ';

  selectedDate = 'today';

  dateFilters = [
    { id: 'today', day: 'WED', date: '14' },
    { id: 'thu', day: 'THU', date: '15' },
    { id: 'fri', day: 'FRI', date: '16' },
    { id: 'sat', day: 'SAT', date: '17' },
    { id: 'sun', day: 'SUN', date: '18' }
  ];

  featuredArtist = {
    name: 'Tiësto & VIP Aerial Dancers',
    venue: 'LIV Nightclub',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoqFfdAE2F7_3acPedV9--v-N8tnA75ok2vSDGMc6d1r5IvSFHTxPF6OneoJnMcXB8AumETO77jzrJsFVF8TLwryNB0iWo4Ddw_dlHJT4HlPk0IWykdpk9AQ2lJxKUrb7GuUHHxbqS6JgRA8DVCOBEu6XcXIqN89nyvS6HdUGNcCnbrnhxQaHuMUHOr8l5F13f0zsKtl6_Trceiaxb_8C-zC_2WGCd-VTsJ-SGxi3yr6vMa3T0sP2zgQ'
  };

  lineupEvents = [
    {
      title: 'E11EVEN Rooftop Sunrise Sessions',
      description: 'Open format deep house with international guest DJs',
      location: 'Downtown Miami',
      time: '1:00 AM',
      headster: 'Kygo (Late Set)',
      headliner: 'Kygo (Late Set)',
      capacity: 'VIP Tables Open',
      price: 850,
      originalPrice: 1200,
      offer: '25% Flash Drop',
      tag: 'Sunrise Party',
      statusText: '95% Full',
      urgency: 'High',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUeql742eevS9gNJ_1MZcrMxAFT90U2ITb_9CEMM9z5I25vFndGbq3hrFVqxpDexOFs0OE2TAsiXt76BwVddgPK71FSTIsHOkXlkXJaW_rtD77iUCTIF0gvJAfJOLIUeTXN0MkENZ8Q5wzlAmSICNhV4exSBgSOvqLobHpMngocsdzAvi-13kSz5pEU22Y6WxPZ8pQ9kHyqDJ3C1baUqeYu2Oj33peZ5XRi_Fl9QxGAibzlv2qhO_WFQ',
      badgeColor: 'bg-surface-container-highest'
    },
    {
      title: 'SET Miami Hip-Hop Takeover',
      description: 'Exclusive celebrity lounge experience and craft cocktails',
      location: 'South Beach',
      time: '11:30 PM',
      headliner: 'DJ Khaled & Friends',
      capacity: 'Tables & High-Tops',
      price: 600,
      originalPrice: 850,
      offer: 'VIP Access',
      tag: 'Hip-Hop / R&B',
      statusText: 'Only 3 Tables Left',
      urgency: 'High',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWccUk7pbVFHI2jdJnhEEpD5OHgX26BzYB37ByGYPo4rluT9uVYwAXG9mOz7qIj71FHvbgdYhG1gw2chdHLz02Na-QeM-7yDtq8rk4O_1y2mybJo4BZSxKCG0qJmPWwDl3gAzx0Phwkil6ju0d2XS3YZ2DPppCh4PSCmSSHAFg-bI4RO-WqjtX5UyEoqCjd3fpZg6FxF6Y5jtB5mmkX3F_dU6_Hj-5p0eYzEtYud9esTGsHXraA7vt-g',
      badgeColor: 'bg-surface-container-highest'
    },
    {
      title: 'STORY Nightclub Main Stage',
      description: 'Pounding bass, immersive lasers, and world-class production',
      location: 'South Beach',
      time: '11:00 PM',
      headliner: 'Steve Aoki',
      capacity: 'Dance Floor & Mezz',
      price: 1350,
      originalPrice: 1700,
      offer: '20% Off',
      tag: 'EDM Arena',
      statusText: 'Selling Fast',
      urgency: 'Normal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8DcEITdjQ47_IWT58MUVsqUJ3URYrsWRymhYQwu7YiAwEGWcc2bukUhxgk47heZVGGLFerfYE77Lq75B3dv-xaIFCRvGO0e7SwCrYoRRjEjs1pLg9CVs609gaCyowTnwZvT04JbRSNaFzBLFAke6dEUKZFxls4AwG0LUvieU3uA4HXSDnGYmxC_9ZRCczShLq06XMP3TZTY7H7yhePE6yVYXEmnMJXFD9Fpo2dUyR_AKBwXb0NFlhTg',
      badgeColor: 'bg-surface-container-highest'
    }
  ];

  constructor() {}

  ngOnInit() {}

  selectDate(dateId: string) {
    this.selectedDate = dateId;
  }

  goBack() {
    window.history.back();
  }

  openLocationSelector() {}
  openEventDetail(event: any) {
    console.log('Selected event:', event.title);
  }
}
