import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecondPagePage } from '../second-page/second-page.page';
import { Router , NavigationExtras} from '@angular/router';
import Reservation from '../models/Reservation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // class properties
  typeCar:string='Sedan'
  resDate!: Date;
  currentDate: Date = new Date();
  numOfDays!: number; 
  carSeat:boolean = false;
  constructor(private router:Router) {}


  //methods

  resetPressed()
  {
    this.resDate = new Date();
    this.numOfDays = 1;
    this.carSeat = false;
   
  }

  reservePressed()
  {

let ReservationToSend: Reservation = 
{
  typeCar: this.typeCar,
  resDate: this.resDate,
  numOfDays: this.numOfDays,
  carSeat: this.carSeat
}


  
    if(this.typeCar != '' && this.resDate < this.currentDate && this.numOfDays > 0 && this.numOfDays < 97)
    {
      let navigationExtras: NavigationExtras = {
        queryParams:
        {
          reservation : JSON.stringify(ReservationToSend)
        }
      }
      this.router.navigate(["/second-page"], navigationExtras)
      console.log(` First page : ${ this.carSeat } `);
    }
  }
   
}
