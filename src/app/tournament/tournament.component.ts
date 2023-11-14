import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { Tournament } from './../Model/tournament';
import { Component } from '@angular/core';

function prizeMoneyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (isNaN(value) || value < 5000) {
    return { invalidPrizeMoney: true };
  }

  return null;
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent {
  public tournament = new Tournament;
  public editingPrev = false;
  public prevTourn = new Tournament;
  public tournForm = new FormGroup({
    city: new FormControl('', Validators.required),
    prize_money: new FormControl(null, [Validators.required, prizeMoneyValidator]) as FormControl<number | null>,
    description: new FormControl(''),
  });
  public tournaments: Tournament[] = [];

  public onSubmit() {
      if (!this.editingPrev) {
        this.tournament = new Tournament;
      }
      this.tournament.city = this.tournForm.value.city!;
      this.tournament.prize_money = this.tournForm.value.prize_money!;
      this.tournament.description = this.tournForm.value.description!;

      if (!this.editingPrev) {
        this.tournaments.push(this.tournament)
      }
  }

  public shouldShowError(controlName: string) {
    return !this.tournForm.get(controlName)!.valid && this.tournForm.get(controlName)!.touched
  }

  public onClick(targTourn: Tournament) {
    if (!this.editingPrev) {
      this.tournament = targTourn;
      this.editingPrev = true;

      this.tournForm.setValue({
        city: targTourn.city,
        prize_money: targTourn.prize_money,
        description: targTourn.description,
      })
    }
  }

  public onCancel() {
    this.editingPrev = false;

    this.tournForm.setValue({
      city: null,
      prize_money: null,
      description: null,
    })

  }

}
