import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getDocs, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private firestore: Firestore, 
    private auth:Auth
  ) {}

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

  /* en la funcion lo que estamos haciendo con el PROMISE -> es que
  nos devuelva un resultado en el futuro, que no lo haga en el momento, 
  y el tipo de dato que nos devolverá será del usuario que se ha logueado.
  POR DEFECTO LAS FUNCIONES DE FIREBASE-AUTH --> no devuelven un resultado
  inmediato, por lo que la respuesta es asíncrona y necesitamos las PROMESAS */

  async loginWithMail(email: string, password: string): Promise<UserCredential | null >{
    /* try{ 
      return signInWithEmailAndPassword(this.auth, email, password);
      console.log("se ha iniciado sesion correctamente");
    /* }catch(error){
      alert("no se ha podido hacer el login " + error)
      return null;
    } */
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        console.log("Login exitoso", userCredential);
        return userCredential;
    } catch (error) {
        console.error("Error en login:", error);
        //alert("No se ha podido hacer el login: " + error.message);
        return null;
    }
    
  }
}
