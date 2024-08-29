//async await
import fs from 'fs/promises';
import { DemoTextPath } from '../util/static';

export const asyncExample = async () => {
  try{
    const data = await fs.readFile(DemoTextPath, 'utf-8')
    return data
  }catch(err){
    if (err instanceof Error) {
      throw new Error(`Error reading file: ${err.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}