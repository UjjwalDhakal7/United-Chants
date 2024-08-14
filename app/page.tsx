import { ExpandableCardDemo } from './components/Cards';
import fs from 'fs';
import path from 'path';

export default function HomePage() {
  const filePath = path.join(process.cwd(), 'public', 'chants.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const chants = JSON.parse(fileContents);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-600 to-black text-white p-8">
      <h1 className="text-6xl text-gray-50 font-sans font-bold mb-8 text-center">Manchester United Chants</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        <ExpandableCardDemo />
      </div>
    </div>
  );
}
