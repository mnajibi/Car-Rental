import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { randomInt } from 'crypto';
import Reservation from '../models/Reservation';
@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.page.html',
  styleUrls: ['./second-page.page.scss'],
})
export class SecondPagePage implements OnInit {
// class properties

reservation : Reservation = {} as Reservation
YesOrNo : string = ""
//----------------------------
reservationID: number = Math.floor(1000 + Math.random() * 9000);
Subtotal : number = 0
SalesTax: number = 0
total: number = 0;
sedanFlatRate : number = 70;
suvFlatRate : number = 100;
sedanHourlyRate : number = 7;
suvHourlyRate : number = 12;
carSeatHorlyFlatRate : number = 1;
carSeatDailyFlatRate : number = 10;
hours : number = 0;
days : number = 0;

  constructor(private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params =>
      {

        if("reservation" in params)
        {
          let reservationFromPrevScreen:Reservation = JSON.parse(params["reservation"])
          this.reservation = reservationFromPrevScreen;
        }





        //----------------
       
            if(this.reservation.numOfDays%24 > 5)
            {
              this.hours = this.reservation.numOfDays%24;
              this.days= ((this.reservation.numOfDays - this.hours) / 24) + 1;
              this.hours = 0;
            }
            else
            {
              this.hours = this.reservation.numOfDays%24;
              this.days = (this.reservation.numOfDays - this.hours) / 24;
            }
          
            if(this.reservation.carSeat)
            {
              this.YesOrNo = "Yes";
            }
            else if (!this.reservation.carSeat)
            {
              this.YesOrNo = "No";

            }
          



          if(this.reservation.carSeat)
            {
              if(this.reservation.typeCar == "Sedan")
              {
                this.Subtotal = (this.sedanHourlyRate * this.hours) + (this.sedanFlatRate * this.days) + (this.carSeatHorlyFlatRate * this.hours) + (this.carSeatDailyFlatRate * this.days);
                this.SalesTax = this.Subtotal * 13 / 100;
                this.total = this.Subtotal + this.SalesTax;
              }
              if(this.reservation.typeCar == "SUV")
              {
                this.Subtotal = (this.suvHourlyRate * this.hours) + (this.suvFlatRate * this.days)+ (this.carSeatHorlyFlatRate * this.hours) + (this.carSeatDailyFlatRate * this.days);
                this.SalesTax = this.Subtotal * 13 / 100;
                this.total = this.Subtotal + this.SalesTax;
              }
            }
            else if (!this.reservation.carSeat)
            {
              if(this.reservation.typeCar == "Sedan")
           {
             this.Subtotal = (this.sedanHourlyRate * this.hours) + (this.sedanFlatRate * this.days);
             this.SalesTax = this.Subtotal * 13 / 100;
             this.total = this.Subtotal + this.SalesTax;
           }
           if(this.reservation.typeCar == "SUV")
           {
             this.Subtotal = (this.suvHourlyRate * this.hours) + (this.suvFlatRate * this.days);
             this.SalesTax = this.Subtotal * 13 / 100;
             this.total = this.Subtotal + this.SalesTax;
           }

           

            }



           
   
        
      })
  }


  ngOnInit() {
  }

}
