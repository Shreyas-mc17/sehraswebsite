// Post-build fix for `output: 'export'`: Next writes route-segment prefetch files as nested folders
// (out/services/x/__next.services/$d$slug/__PAGE__.txt) but the client requests the flat dotted name
// (out/services/x/__next.services.$d$slug.__PAGE__.txt). Copy each nested file to the flat name so
// static hosts serve it and client-side navigation stays instant.
import { cpSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
let copied = 0;

function walkSegments(dir, prefix, base) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const flat = `${prefix}.${name}`;
    if (statSync(full).isDirectory()) walkSegments(full, flat, base);
    else { cpSync(full, join(base, flat)); copied++; }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === '_next') continue;
    if (name.startsWith('__next.')) walkSegments(full, name, dir);
    else walk(full);
  }
}

walk(OUT);
console.log(`flatten-segments: wrote ${copied} prefetch file(s)`);
