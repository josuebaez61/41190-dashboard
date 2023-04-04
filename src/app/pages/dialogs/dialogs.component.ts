import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosDialogComponent } from './mis-dialogs/usuarios-dialog/usuarios-dialog.component';


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent {

  constructor(
    private dialogService: MatDialog
  ) {}

  abrirDialogoDeUsuarios(): void {
    this.dialogService.open(UsuariosDialogComponent);
  }
}
