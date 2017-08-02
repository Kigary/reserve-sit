import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sit } from '../../defines/sit';
import { SitsService } from '../../services/sits/sits.service';

@Component({
  selector: 'app-sits',
  templateUrl: './sits.component.html',
  styleUrls: ['./sits.component.css']
})
export class SitsComponent implements OnInit {
  sits: Sit[];
  selectedSit: Sit;

  constructor(
    private sitService: SitsService,
    private router: Router) { }

  getAllSits(): void {
    this.sitService
      .getAllSits()
      .subscribe(sits => this.sits = sits);
  }

  add(...fields: string[]): void {
    if (!fields[0]) { return; }
    this.sitService.create(...fields)
      .subscribe(sit => {
        this.sits.push(sit);
        this.selectedSit = null;
      });
  }

  delete(sit: Sit): void {
    this.sitService
      .delete(sit.sitID)
      .subscribe(() => {
        this.sits = this.sits.filter(s => s !== sit);
        if (this.selectedSit === sit) { this.selectedSit = null; }
      });
  }

  ngOnInit(): void {
    this.getAllSits();
  }

  onSelect(sit: Sit): void {
    this.selectedSit = sit;
  }

  /*gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedSit.sitID]);
  }*/
}
