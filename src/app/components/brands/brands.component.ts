import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../brands.service';
import { Brand } from '../../core/Interfaces/iproducts';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService= inject(BrandsService);
  BrandList:Brand[]=[];
  ngOnInit(): void {
    this._BrandsService.GetBrands().subscribe({
      next:(res)=>{
        console.log(res);

        this.BrandList=res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
