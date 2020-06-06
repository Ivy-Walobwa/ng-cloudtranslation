import { Component, OnInit } from '@angular/core';
import { SolutionService } from './services/solution.service';
import { Solution, GoogleObj } from './models/solution';
import { GoogletranslateService } from './services/googletranslate.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lang = new FormControl('');
 
  data: Solution = {
    title: '',
    description: '',
    detail: ''
  };

  private translateBtn: any;

  constructor( private solution: SolutionService,private google: GoogletranslateService) {
  }

  ngOnInit() {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
  }

   send() {
    const googleObj: GoogleObj = {
      q: [this.data.title, this.data.description, this.data.detail],
      target: this.lang.value,
      format: 'text'
    };

    this.translateBtn.disabled = true;

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          title: res.data.translations[0].translatedText,
          description: res.data.translations[1].translatedText,
          detail: res.data.translations[2].translatedText
        };
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }


}
