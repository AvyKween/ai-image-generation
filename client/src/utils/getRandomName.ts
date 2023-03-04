import { namesList, surnamesList } from '../constants'

export function getRandomName(name: string): string {

    const randomNameIndex = Math.floor( Math.random() * namesList.length );
    const randomSurnameIndex = Math.floor( Math.random() * surnamesList.length );

    const randomName = namesList[randomNameIndex];
    const randomSurname = surnamesList[randomSurnameIndex];
    
    const randomFullName = `${ randomName } ${ randomSurname }`;

    // Recursive instruction to prevent the repetition of the random generated name even if the probabilities are way too low
    if ( randomFullName === name ) return getRandomName(name);

    return randomFullName;
}