import { Component } from '@angular/core';
import { TennisPlayer } from '../Model/tennis-player';

@Component({
  selector: 'app-tennis-player',
  templateUrl: './tennis-player.component.html',
  styleUrls: ['./tennis-player.component.scss']
})
export class TennisPlayerComponent {
  public player = new TennisPlayer;
  public players: TennisPlayer[] = [];

  

  public onClick() {
    this.players.push(this.player);
    this.player = new TennisPlayer;
  }
}
