import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form: FormGroup
  cnpj: string
  result: boolean
  clicked: boolean;

  constructor(private formBuilder: FormBuilder, private httpclient: HttpClient) { }

  onClick(): void {
    if (this.form.invalid) {
      alert('Something went wrong, check your data')
    } else {
      this.clicked = true;
      const headers = {
        name: this.form.get('name').value,
        email: this.form.get('email').value
      }
      this.httpclient.get(`http://localhost:2000/finder/${this.replaceCnpj()}`, { headers: headers }).subscribe(res => {
        this.clicked = false;
        alert('Your consult is done. Check your e-mail after some minutes.')
      }, err => {
        this.clicked = false;
        alert('Something went wrong. Try again later.')
      });
    }
  }

  replaceCnpj(): string {
    this.cnpj = this.form.get('cnpj').value.replace(/[^a-zA-Z0-9 ]/g, "");
    return this.cnpj;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, Validators.minLength(18)]]
    })
  }


}
