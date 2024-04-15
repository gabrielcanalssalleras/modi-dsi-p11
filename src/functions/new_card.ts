import fs from "fs";
import { Checker } from "../classes/checker.js";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Crea una nueva carta y la añade a la colección del usuario de forma asíncrona.
 * @param ID - El ID de la carta.
 * @param Name - El nombre de la carta.
 * @param User - El usuario.
 * @param Mana - El mana de la carta.
 * @param Color - El color de la carta.
 * @param Type - El tipo de la carta.
 * @param Rarity - La rareza de la carta.
 * @param Strres - La fuerza y resistencia de la carta.
 * @param Loyalty - La lealtad de la carta.
 * @param Text - El texto de la carta.
 * @param Value - El valor de la carta.
 * @param userCollection - La colección de cartas del usuario.
 * @returns Promise<[string, number]> - Promesa que resuelve con el nombre y el ID de la carta creada o rechaza con un error.
 */
export function newCardAsync(
  ID: number,
  Name: string,
  User: unknown,
  Mana: unknown,
  Color: unknown,
  Type: unknown,
  Rarity: unknown,
  Strres: unknown[],
  Loyalty: unknown,
  Text: unknown,
  Value: unknown,
  userCollection: unknown,
): Promise<[string, number]> {
  // Validaciones
  if (!checker.checkId(ID, userCollection)) {
    return Promise.reject(new Error(`El ID de la carta no es válido.`));
  }
  if (!checker.checkMana(Mana)) {
    return Promise.reject(new Error(`El mana de la carta no es válido.`));
  }
  if (!checker.checkColor(Color)) {
    return Promise.reject(new Error(`El color de la carta no es válido.`));
  }
  if (!checker.checkType(Type)) {
    return Promise.reject(new Error(`El tipo de la carta no es válido.`));
  }
  if (!checker.checkRarity(Rarity)) {
    return Promise.reject(new Error(`La rareza de la carta no es válida.`));
  }
  if (!checker.checkStrRes(Type, Strres[0], Strres[1])) {
    return Promise.reject(
      new Error(`La fuerza y resistencia de la carta no son válidas.`),
    );
  }

  // Escritura del archivo JSON
  return new Promise((resolve, reject) => {
    fs.promises.writeFile(
      `${userCollection}/${ID}.json`,
      JSON.stringify({
        ID,
        Name,
        User,
        Mana,
        Color,
        Type,
        Rarity,
        Strres,
        Loyalty,
        Text,
        Value,
      }),
    )
      .then(() => {
        resolve([Name, ID]);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
