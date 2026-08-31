/**
 * Trava de publicação para dados pendentes.
 *
 * Sem variável de ambiente: apenas lista o que falta e sai com 0, para não
 * atrapalhar o desenvolvimento.
 * Com VELMONT_REQUIRE_COMPLETE_CONTENT=1: sai com 1 se houver pendência
 * bloqueante — é assim que a publicação fica travada enquanto houver
 * placeholder.
 */
import { pendingRegistry } from '../lib/content/institutional';
import { type PendingValue, type Sourced } from '../lib/content/pending';

const strict = process.env.VELMONT_REQUIRE_COMPLETE_CONTENT === '1';

const groups = Object.entries(pendingRegistry) as [
  string,
  readonly Sourced<unknown>[] | Sourced<unknown>,
][];

const blocking: { group: string; entry: PendingValue }[] = [];
const nonBlocking: { group: string; entry: PendingValue }[] = [];

for (const [group, value] of groups) {
  const entries = Array.isArray(value) ? value : [value as Sourced<unknown>];
  for (const entry of entries as readonly Sourced<unknown>[]) {
    if (entry.status !== 'pending') continue;
    (entry.blocksLaunch ? blocking : nonBlocking).push({ group, entry });
  }
}

const total = blocking.length + nonBlocking.length;

if (total === 0) {
  console.log('✓ Nenhum dado institucional pendente.');
  process.exit(0);
}

console.log(`\nDados institucionais pendentes: ${total}\n`);

for (const { group, entry } of [...blocking, ...nonBlocking]) {
  const flag = entry.blocksLaunch ? 'BLOQUEIA LANÇAMENTO' : 'não bloqueante';
  console.log(`  [${group}] ${entry.label}`);
  console.log(`      responsável: ${entry.owner} — ${flag}\n`);
}

if (strict && blocking.length > 0) {
  console.error(
    `✗ ${blocking.length} pendência(s) bloqueiam o lançamento. ` +
      'Confirme os dados em lib/content/institutional.ts antes de publicar.\n',
  );
  process.exit(1);
}

console.log(
  strict
    ? '✓ Nenhuma pendência bloqueante.\n'
    : 'Nenhuma pendência bloqueia o build de desenvolvimento. ' +
        'Para checar antes de publicar: VELMONT_REQUIRE_COMPLETE_CONTENT=1 npm run check:content\n',
);
