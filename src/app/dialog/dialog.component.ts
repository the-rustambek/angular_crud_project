import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  conditionProduct: string[] = ["New", "Second","B/Y"]


  productForm!: FormGroup
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>,

    @Inject(MAT_DIALOG_DATA) public editData: any
    ){ }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      category: ["",  Validators.required],
      condition: ["",  Validators.required],
      price: ["",  Validators.required],
      comment: ["",  Validators.required],
      date: ["",  Validators.required],
    })
    if(this.editData){
      this.actionBtn = "Update",
      this.productForm.controls["productName"].setValue(this.editData.productName);
      this.productForm.controls["category"].setValue(this.editData.category);
      this.productForm.controls["condition"].setValue(this.editData.condition);
      this.productForm.controls["price"].setValue(this.editData.price);
      this.productForm.controls["comment"].setValue(this.editData.comment);
      this.productForm.controls["date"].setValue(this.editData.date);
    }
  }


  addProduct(){
    // console.log(this.productForm.value)
    // valid ichida hamma narsa to'lidirilgan bo'lsa degani
    // subscribe bu 2 ta narsani qabul qiladi, yani 1-si hamma narsa muvaffaqqiyatli o'tgan bo'lsa, 2-si esa error qaytaradi 
    
   

    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next:() =>{
              alert("Product was added succesfully")
              this.productForm.reset();
              this.dialogRef.close("save");
            },
            error: ()=>{
              alert("Something went wrong while adding")
            }
          })
      }
    }
    else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated successfully");
          this.productForm.reset();
          this.dialogRef.close("update");
          
        },
        error:() =>{
          alert("Something went wrong while updating")
        }
      })
  }

}
