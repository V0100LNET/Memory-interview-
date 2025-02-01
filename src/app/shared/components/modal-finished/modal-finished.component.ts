import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScorePlayer } from '../../interfaces/game.interface';

@Component({
  selector: 'app-modal-finished',
  templateUrl: './modal-finished.component.html',
  styleUrls: ['./modal-finished.component.css']
})
export class ModalFinishedComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ScorePlayer,
    private dialogRef: MatDialogRef<string>
  ) {}

  ngOnInit(): void {
    this.replaySound();
    document.body.style.overflow = "hidden";
  }

  get getNamePlayer(): string {
    return localStorage.getItem("playerName") ?? "Jugador";
  }

  get getScoreBad(): number | string{
    return (this.dialogData.scoreBad == 0) ? "- - -" : this.dialogData.scoreBad;
  }

  get getScoreGood(): number | string {
    return (this.dialogData.scoreGood == 0) ? "- - -" : this.dialogData.scoreGood;
  }

  replaySound(): void {
    const audio: HTMLAudioElement = new Audio("assets/audios/congrats.mp3")
    audio.play();
  }

  restartGame(): void {
    this.dialogRef.close("restart");
  }

  backHome(): void {
    this.dialogRef.close("back");
  }
}
