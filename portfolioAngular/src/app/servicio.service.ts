import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private firestore: Firestore) {}

  async crearProyecto(titulo: string, descripcion: string, tecnologias: string, participantes: string) {
    const proyectosRef = collection(this.firestore, 'proyectos'); // ✅ Corregido
    const docRef = await addDoc(proyectosRef, {
      titulo,
      descripcion,
      tecnologias,
      participantes
    });
    console.log("Proyecto creado con ID: ", docRef.id);
  }

  async getProyectos() {
    const proyectosRef = collection(this.firestore, 'proyectos');
    const querySnapshot = await getDocs(proyectosRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Obtener un proyecto por su ID
  async getProyectoById(id: string): Promise<any> {
  const proyectoRef = doc(this.firestore, 'proyectos', id);
  const proyectoSnap = await getDoc(proyectoRef);

  if (proyectoSnap.exists()) {
    return { id: proyectoSnap.id, ...(proyectoSnap.data() as any) }; // Asegura que los datos se expandan correctamente
  } else {
    throw new Error('Proyecto no encontrado');
  }
}


  async updateProyectos(id: string, titulo: string, descripcion: string, tecnologias: string, participantes: string) {
    const proyectoRef = doc(this.firestore, 'proyectos', id);
    return await updateDoc(proyectoRef, {
      titulo,
      descripcion,
      tecnologias,
      participantes
    });
  }
}
