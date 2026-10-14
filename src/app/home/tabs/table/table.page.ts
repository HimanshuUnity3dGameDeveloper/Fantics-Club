import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
  standalone: false,
})
export class TablePage implements OnInit {

  venueLogo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwNWWtJXpfvW1uHr1xkzC5ujW7nd-Af2uz0SdvGZYmIiTFKHkwDgHieG7fJGTfaPZuXdibP7xe5LZRn3zbpFyYVz0jZh30qVuKKotOAn4MY93-eD7iuZtOGFsLjgyf1uu4ImUuOivipz1oGgjbEk7AXJQRTulPgwC5WefaMOK3weFkFkxJ7tAuzLrt4V4SNfUdLt30PSAyMajWXOWI7hkDSNGPZv66Rz6r5pR7aqWgUqgvE0lr6HBs1w';
  userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmh_fSQ0FDr60IXMWZVtjxZ_1IAHGpBrXBWplFTimeYlnsPLe6PDKMJxs31UUgRkF7HyVgcW3YLDv05C9l3f7KnVmSu3G6qrv3sJ3vIdxYSByJoR4Obu2sqIK2rkeXzaH3VYpbiwIxm4KsT-EoszFLEVkMriK2ghOAj8K-uxcljfRDYrtomesfUtX86V_nQ96iI5pzrwGbrPQdP8GnkDV3h30cGwrS0i4w7et-49gdM4rBGz-5vHhnjQ';
  venueHeroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoqFfdAE2F7_3acPedV9--v-N8tnA75ok2vSDGMc6d1r5IvSFHTxPF6OneoJnMcXB8AumETO77jzrJsFVF8TLwryNB0iWo4Ddw_dlHJT4HlPk0IWykdpk9AQ2lJxKUrb7GuUHHxbqS6JgRA8DVCOBEu6XcXIqN89nyvS6HdUGNcCnbrnhxQaHuMUHOr8l5F13f0zsKtl6_Trceiaxb_8C-zC_2WGCd-VTsJ-SGxi3yr6vMa3T0sP2zgQ';
  mezzanineImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWccUk7pbVFHI2jdJnhEEpD5OHgX26BzYB37ByGYPo4rluT9uVYwAXG9mOz7qIj71FHvbgdYhG1gw2chdHLz02Na-QeM-7yDtq8rk4O_1y2mybJo4BZSxKCG0qJmPWwDl3gAzx0Phwkil6ju0d2XS3YZ2DPppCh4PSCmSSHAFg-bI4RO-WqjtX5UyEoqCjd3fpZg6FxF6Y5jtB5mmkX3F_dU6_Hj-5p0eYzEtYud9esTGsHXraA7vt-g';
  stageImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8DcEITdjQ47_IWT58MUVsqUJ3URYrsWRymhYQwu7YiAwEGWcc2bukUhxgk47heZVGGLFerfYE77Lq75B3dv-xaIFCRvGO0e7SwCrYoRRjEjs1pLg9CVs609gaCyowTnwZvT04JbRSNaFzBLFAke6dEUKZFxls4AwG0LUvieU3uA4HXSDnGYmxC_9ZRCczShLq06XMP3TZTY7H7yhePE6yVYXEmnMJXFD9Fpo2dUyR_AKBwXb0NFlhTg';
  terraceImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUeql742eevS9gNJ_1MZcrMxAFT90U2ITb_9CEMM9z5I25vFndGbq3hrFVqxpDexOFs0OE2TAsiXt76BwVddgPK71FSTIsHOkXlkXJaW_rtD77iUCTIF0gvJAfJOLIUeTXN0MkENZ8Q5wzlAmSICNhV4exSBgSOvqLobHpMngocsdzAvi-13kSz5pEU22Y6WxPZ8pQ9kHyqDJ3C1baUqeYu2Oj33peZ5XRi_Fl9QxGAibzlv2qhO_WFQ';

  currentTier = 'mezzanine';
  selectedZone = 'mezzanine';
  currentBaseCost = 1100;
  currentOriginalCost = 1400;
  currentTitle = 'Prime Center Mezzanine VIP';
  currentTable = '#M-04';
  isVipMember = false;
  vipPriceNote = 'Save to $935';
  showToast = false;

  basePrices = {
    mezzanine: 1100,
    stage: 1750,
    terrace: 650,
    bar: 320
  };

  displayPrices = { ...this.basePrices };

  constructor() {}

  ngOnInit() {}

  selectTier(tierId: string, cost: number, original: number, title: string, tableNum: string) {
    this.currentTier = tierId;
    this.currentBaseCost = cost;
    this.currentOriginalCost = original;
    this.currentTitle = title;
    this.currentTable = tableNum;
    this.updatePricingUI();
  }

  selectZone(zone: string) {
    this.selectedZone = zone === 'front-stage' ? 'front' : zone;
    const zoneMap: { [key: string]: () => void } = {
      'mezzanine': () => this.selectTier('mezzanine', 1100, 1400, 'Prime Center Mezzanine VIP', '#M-04'),
      'front-stage': () => this.selectTier('stage', 1750, 2200, 'Dance Floor Front Stage Booth', '#S-01'),
      'terrace': () => this.selectTier('terrace', 650, 850, 'Rooftop Terrace Banquette', '#T-12'),
      'solo-bar': () => this.selectTier('bar', 320, 450, 'VIP Bar High-Top Duo', '#B-07')
    };
    if (zoneMap[zone]) zoneMap[zone]();
  }

  toggleVipDiscount() {
    this.vipPriceNote = this.isVipMember ? 'Active: -15% VIP Applied' : 'Save to $935';
    this.updatePricingUI();
  }

  updatePricingUI() {
    const multiplier = this.isVipMember ? 0.85 : 1;
    this.displayPrices = {
      mezzanine: Math.round(this.basePrices.mezzanine * multiplier),
      stage: Math.round(this.basePrices.stage * multiplier),
      terrace: Math.round(this.basePrices.terrace * multiplier),
      bar: Math.round(this.basePrices.bar * multiplier)
    };
    this.currentBaseCost = this.displayPrices[this.currentTier as keyof typeof this.displayPrices];
  }

  lockTable() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3800);
  }

  goBack() {
    window.history.back();
  }

  openLocationSelector() {}
  toggleFavorite() {}
  shareExperience() {}

}
