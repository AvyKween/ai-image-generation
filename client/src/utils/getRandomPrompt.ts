import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt: string): string {
    const randomIndex = Math.floor( Math.random() * surpriseMePrompts.length );
    const randomPrompt = surpriseMePrompts[randomIndex]    

    // Prevent same random prompts multiple times in a row
    if ( randomPrompt === prompt ) return getRandomPrompt(prompt)

    return randomPrompt;
}