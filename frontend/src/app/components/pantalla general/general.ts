import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './general.html'
})
export class GeneralComponent {


}