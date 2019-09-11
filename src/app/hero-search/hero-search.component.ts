import { HeroService } from './../hero.service';
import { Hero } from './../hero';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  // what the reader is going to write
  private searchTerms = new Subject<string>();
  

  constructor(
    private heroService: HeroService 
  ) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void  {
    this.heroes$ = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),


    );
  }

}
