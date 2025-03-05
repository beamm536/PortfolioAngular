import { Injectable } from '@angular/core';
import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getDocs, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  user$: Observable<any | null>;

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.user$ = new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => observer.next(user));
    });

    setPersistence(this.auth, browserLocalPersistence).catch((error) =>
      console.error('Error setting persistence:', error)
    );
  }

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

  async loginWithMail(email: string, password: string): Promise<UserCredential | null> {
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


  async crearUsuarioRegistro(nombre: string, apellidos: string, fechaNacimiento: Date, email: string, password: string) {
    try {
      //creamos el usuario
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid; //id del usuer registrado

      //guardamos en nuestra coleccion
      const usuariosRef = collection(this.firestore, 'usuariosAngular');
      await addDoc(usuariosRef, {
        uid: userId,
        nombre,
        apellidos,
        fechaNacimiento,
        email
      });

      console.log("Usuario registrado correctamente con UID:", userId);
      return userCredential;

    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  }
}
