import fs from "fs";
import chalk from "chalk";

/**
 * 
 * @param id
 * @param userCollection 
 * @returns 
 */
export function removeCardAsync(
  id: unknown,
  userCollection: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let card;
    fs.promises
      .readdir(userCollection)
      .then((files) => {
        for (const file of files) {
          fs.promises.readFile(`${userCollection}/${file}`).then((data) => {
            card = JSON.parse(data.toString());
            if (card!.ID === id) {
              fs.promises.unlink(`${userCollection}/${file}`).then(() => {
                const user = userCollection.split("/")[1];
                console.log(
                  chalk.green(`Card removed from ${user} collection!`),
                );
                resolve("Card removed!");
                return card!.ID;	
              });
            }
          });
        }
				//reject(`Card not found at ${userCollection} collection!`);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
