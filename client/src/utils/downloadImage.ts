import { saveAs } from 'file-saver';
import { Base64 } from '../interfaces';

export async function downloadImage(_id: string, photo: Base64<'jpg'>) {
    saveAs(photo, `download-${_id}.jpg`);
}