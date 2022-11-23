import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecondPagePage } from '../second-page/second-page.page';
import { Router , NavigationExtras} from '@angular/router';
import { format, parseISO } from 'date-fns';
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
  date: string = '';
  error: boolean = false;
  dateError: boolean = false;
  carError: boolean = false;
  constructor(private router:Router) {}


  //methods

  resetPressed()
  {
    this.resDate = new Date();
    this.numOfDays = 1;
    this.carSeat = false;
   this.typeCar ='';
   this.error = false;
   this.dateError = false;
  }


  reservePressed()
  {

    if(this.typeCar == '')
    {
      this.typeCar = 'S';
    }

    if(this.typeCar == 'SUV' || this.typeCar == 'Sedan')
    {
      this.carError = true;
    }
let ReservationToSend: Reservation = 
{
  typeCar: this.typeCar,
  resDate: this.resDate,
  numOfDays: this.numOfDays,
  carSeat: this.carSeat
}
if((this.numOfDays < 1 || this.numOfDays > 96 )|| !this.numOfDays)
{
  this.error = true;
}
else
{
  this.error = false;
}
let now = new Date() 
if(!this.resDate)
{
  this.dateError = true;
}
else
{
this.dateError = false;
}
if(this.resDate < now)
{
  this.dateError = true;
}
else
{
  
}


  
    if(this.carError == true && this.dateError == false && this.error == false)
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
