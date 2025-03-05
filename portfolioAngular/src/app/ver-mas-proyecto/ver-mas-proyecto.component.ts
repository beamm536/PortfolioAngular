import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-ver-mas-proyecto',
  templateUrl: './ver-mas-proyecto.component.html',
  styleUrls: ['./ver-mas-proyecto.component.css']
})
export class VerMasProyectoComponent implements OnInit {
  proyecto: any = {};

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, 'proyectos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.proyecto = docSnap.data();
      }
    }
  }

  mostrarModal = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
