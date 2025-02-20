import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(public firestore:Firestore) { }


  //METODO PARA CREAR UN PROYECTO
  async crearProyecto(titulo: string, descripcion: string, tecnologias: string, participantes: string){
    //docRef --> hace referencia al uid unico de cada objeto
    const docRef = await addDoc(collection(this.firestore, 'proyectos'), {
      titulo: titulo,
      descripcion: descripcion,
      tecnologias: tecnologias,
      participantes: participantes
    });
    console.log("Document written with ID: ", docRef.id);
  }


  async getProyectos(){
    return(
      await getDocs(query(collection(this.firestore, 'proyectos')))
    ).docs.map((proyectos) => proyectos.data());
  }

}


