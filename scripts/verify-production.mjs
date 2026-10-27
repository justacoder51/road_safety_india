import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
const base=(process.argv[2] || 'http://127.0.0.1:4173').replace(/\/$/,'');
const checks=[];
for(const route of ['/']){
  const response=await fetch(base+route);
  assert.equal(response.status,200);
  const html=await response.text();
  assert(html.includes('id="root"')&&html.includes('/assets/'));
  checks.push({check:`Production index served at deployment base: ${base}/`,status:'Passed'});
  for(const assetPath of [...html.matchAll(/(?:src|href)="([^"]+\/assets\/[^\"]+)"/g)].map(match=>match[1])){
    const assetResponse=await fetch(new URL(assetPath,base));assert.equal(assetResponse.status,200);
    checks.push({check:`Entry asset served: ${assetPath}`,status:'Passed'});
  }
}
for(const name of ['india-statistics','road-user-data','road-type-data','international-policies','indian-policies','action-plan','sources','definitions','report-manifest']){
  const response=await fetch(`${base}/data/${name}.json`); assert.equal(response.status,200);
  assert.deepEqual(await response.json(),JSON.parse(readFileSync(`public/data/${name}.json`,'utf8')));
  checks.push({check:`Production JSON matches approved local file: ${name}`,status:'Passed'});
}
const sources=JSON.parse(readFileSync('public/data/sources.json','utf8'));
for(const source of sources.filter(x=>x.localUrl)){
  const response=await fetch(base+source.localUrl,{method:'HEAD'}); assert.equal(response.status,200);
  if(source.localUrl.endsWith('.pdf'))assert(response.headers.get('content-type')?.includes('application/pdf'));
  checks.push({check:`Supplied document served: ${source.localUrl}`,status:'Passed'});
}
const report=await fetch(`${base}/documents/research-report.md`);assert.equal(report.status,200);
assert.equal(await report.text(),readFileSync('public/documents/research-report.md','utf8'));
checks.push({check:'Downloadable report matches bundled source',status:'Passed'});
writeFileSync('docs/verification/production-checks.json',JSON.stringify({date:'27 October 2026',base,checks},null,2)+'\n');
console.log(`${checks.length} production checks passed. External citation websites were not retrieved.`);
