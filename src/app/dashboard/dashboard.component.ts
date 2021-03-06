import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../hero';
import {deserializeSummaries} from '@angular/compiler/src/aot/summary_serializer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];


  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  // summary of the method: takes for the hero service the function
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
