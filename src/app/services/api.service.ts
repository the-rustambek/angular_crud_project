import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { } // bu yerda http  deb  yozganimiz hudddi nidejs dagi kabi  tepada req.db=db ni elon qilib pasda faqat db deb ishlatishimizga o'xshab, hammasini http deb elon qilamiz 

  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/productList/", data)
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/")
  }
  putProduct(data: any, id:number){
    return this.http.put<any>("http://localhost:3000/productList/"+id, data)
  }
 deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id)
  }
}
