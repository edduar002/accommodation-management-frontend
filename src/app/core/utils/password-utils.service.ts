import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordUtilsService {
  /**
   * Verifica si una contraseña es fuerte
   * Una contraseña fuerte debe cumplir:
   * - Al menos una letra minúscula
   * - Al menos una letra mayúscula
   * - Al menos un número
   * - Al menos un caracter especial
   * - Mínimo 6 caracteres
   * 
   * @param password Contraseña a validar
   * @returns true si la contraseña es fuerte, false en caso contrario
   */
  isStrong(password: string): boolean {
    // Expresión regular para validar fuerza de contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    // Retorna true si la contraseña cumple con todos los criterios, false si no
    return regex.test(password);
  }
}