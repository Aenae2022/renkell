// test.ts
import { decryptExerciseToken, encryptExerciseToken, generateExerciseToken, hashExerciseToken } from "../utils/exerciseAcces";

async function main() {
  console.log('test de generateExerciseToken');
  const token = generateExerciseToken();
  console.log('token généré :', token);
  console.log('-------------------------------');
  console.log('test de hashExerciseToken');
  const tokenHash = hashExerciseToken(token);
  console.log('token hashé :', tokenHash);
  const tokenHash2 = hashExerciseToken(token);
  console.log('token hashé 2 :', tokenHash2);
  console.log('-------------------------------');
  console.log('test de encryptExerciseToken');
  const tokenEncrypted = encryptExerciseToken(token);
  console.log('token encrypté :', tokenEncrypted);
  const tokenEncrypted2 = encryptExerciseToken(token);
  console.log('token encrypté2 :', tokenEncrypted2);
  console.log('-------------------------------');
  console.log('test de decryptExerciseToken');
  const tokenDecrypted = decryptExerciseToken(tokenEncrypted);
  console.log('token décrypté :', tokenDecrypted);
  console.log('token original :', token);
  const tokenDecrypted2 = decryptExerciseToken(tokenEncrypted2);
  console.log('token décrypté2 :', tokenDecrypted2);
  console.log('--------------------------------');
  console.log('test de decryptExerciseToken avec un token encrypté invalide');
  const invalidToken = tokenEncrypted.substring(0, 12) + 'f' + tokenEncrypted.substring(13)
  try{
    const tokenInvalidDecrypted = decryptExerciseToken(invalidToken);
  console.log('token décrypté invalide :', tokenInvalidDecrypted);
  console.log("test réussi : le token invalide a été décrypté sans erreur, ce qui est inattendu.");
  } catch (e) {
    console.log("test réussi : le token invalide a généré une erreur lors du décryptage, comme prévu.");
  }


}

main()


//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
