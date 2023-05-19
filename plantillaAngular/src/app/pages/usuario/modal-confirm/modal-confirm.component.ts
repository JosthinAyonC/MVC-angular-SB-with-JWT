import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {
  
  @Input() idUsuarioAEliminar!: Usuario;
  @Output() eliminarUsuario = new EventEmitter<number>();

  eliminarUsuarioConfirmado() {
    this.eliminarUsuario.emit(this.idUsuarioAEliminar.id);    
  }
}
