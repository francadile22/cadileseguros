/**
 * Pipeline semanal: toma los próximos temas en estado "idea" del calendario,
 * genera blog y/o social en borrador y arma un resumen.
 *
 *   npx tsx automation/run-pipeline.ts            # 2 temas (default)
 *   npx tsx automation/run-pipeline.ts --count 3
 *   npx tsx automation/run-pipeline.ts --dry      # sin IA (plantillas)
 *
 * Pensado para correr en GitHub Actions y abrir un PR con los borradores.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { arg, hasFlag } from './lib/util';

interface CalItem {
  id: number;
  tema: string;
  tipo: 'blog' | 'social' | 'ambos';
  keyword: string;
  cobertura: string | null;
  estado: string;
}

function run(script: string, args: string[]) {
  execFileSync('npx', ['tsx', `automation/${script}`, ...args], { stdio: 'inherit' });
}

function main() {
  const count = Number(arg('count') || 2);
  const dry = hasFlag('dry') ? ['--dry'] : [];

  const calPath = path.join(process.cwd(), 'automation', 'content-calendar.json');
  const cal = JSON.parse(fs.readFileSync(calPath, 'utf-8'));
  const pending: CalItem[] = cal.items.filter((i: CalItem) => i.estado === 'idea').slice(0, count);

  if (pending.length === 0) {
    console.log('No hay temas en estado "idea". Agregá temas al calendario.');
    return;
  }

  const summary: string[] = [];
  for (const item of pending) {
    console.log(`\n— Tema #${item.id}: ${item.tema} (${item.tipo})`);
    if (item.tipo === 'blog' || item.tipo === 'ambos') {
      run('generate-post.ts', ['--id', String(item.id), ...dry]);
      summary.push(`📝 Blog: ${item.tema}`);
    }
    if (item.tipo === 'social' || item.tipo === 'ambos') {
      run('generate-social.ts', ['--id', String(item.id), ...dry]);
      summary.push(`🎨 Social: ${item.tema}`);
    }
    // Marca el tema como "borrador" en el calendario.
    item.estado = 'borrador';
  }

  fs.writeFileSync(calPath, JSON.stringify(cal, null, 2) + '\n');

  console.log('\n=== Resumen de borradores generados ===');
  summary.forEach((s) => console.log(' ' + s));
  console.log('\nRevisalos en /studio o en el Pull Request, y aprobá los que te gusten.');
}

main();
