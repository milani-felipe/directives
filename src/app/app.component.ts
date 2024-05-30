import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { DecimalDirective } from './shared/decimalDirective';
import { CpfCnpjPipe } from './shared/CpfCnpjPipe';
import { CommonModule, JsonPipe } from '@angular/common';
import { OnlyNumberDirective } from './shared/numberOnly';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrettyPrintPipe } from './shared/JsonPipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    DecimalDirective,
    CpfCnpjPipe,
    PrettyPrintPipe,
    CommonModule,
    OnlyNumberDirective,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'directives';
  cpf = '11122233344';
  json = {
    _id: '6657d05501613b32adb41d20',
    index: 0,
    guid: '8ba60d9d-d0fa-4931-80df-827ca52c7822',
    isActive: false,
    balance: '$1,580.87',
    picture: 'http://placehold.it/32x32',
    age: 31,
    eyeColor: 'blue',
    name: 'Mccullough Madden',
    gender: 'male',
    company: 'GEOFORMA',
    email: 'mcculloughmadden@geoforma.com',
    phone: '+1 (900) 496-3103',
    address: '987 Eastern Parkway, Rosine, South Dakota, 1971',
    about:
      'Laborum reprehenderit nulla excepteur fugiat voluptate minim velit ad nisi officia sunt. Commodo non eu voluptate tempor dolor officia cillum deserunt culpa. Pariatur minim occaecat incididunt veniam occaecat culpa adipisicing quis nisi culpa officia aliqua exercitation. Cupidatat esse eu laboris eiusmod deserunt occaecat sit laborum adipisicing. Anim elit mollit aliqua duis do consequat. Laborum quis enim aute enim adipisicing aliqua consequat enim fugiat in irure labore Lorem. Do do aute nisi elit nisi velit deserunt.\r\n',
    registered: '2017-02-09T02:23:20 +02:00',
    latitude: 61.593682,
    longitude: -10.292864,
    tags: ['anim', 'duis', 'eiusmod', 'nostrud', 'esse', 'mollit', 'laboris'],
    friends: [
      {
        id: 0,
        name: 'Strong Morin',
      },
      {
        id: 1,
        name: 'Beatrice Romero',
      },
      {
        id: 2,
        name: 'Mcleod Rowe',
      },
    ],
    greeting: 'Hello, Mccullough Madden! You have 6 unread messages.',
    favoriteFruit: 'banana',
  };
  allowComma = false;
  allowDots = false;
  constructor() {
    console.log(this.json);
  }
}
