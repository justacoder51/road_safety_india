import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(readFileSync(path.join(root, 'public/data', `${name}.json`), 'utf8'));
const workspaceReport = path.join(root, '../road_safety_report.md');
const bundledReport = path.join(root, 'public/documents/research-report.md');
const reportPath = process.argv.includes('--bundled-report') || !existsSync(workspaceReport) ? bundledReport : workspaceReport;
const bytes = readFileSync(reportPath);
const report = bytes.toString('utf8');
const manifest = read('report-manifest'), stats = read('india-statistics'), users = read('road-user-data'), roads = read('road-type-data'), policies = read('international-policies'), phases = read('action-plan'), sources = read('sources');
const checks = [], ledger = [];
function check(name, fn) { fn(); checks.push({ check: name, status: 'Passed' }); }
function claim(label, value, section, ids, year, unit) {
  const variants = [String(value), new Intl.NumberFormat('en-US').format(value)];
  assert(variants.some(v => report.includes(v)), `${label}: ${value} missing from report`);
  ledger.push({ label, value, year, unit, reportSection: section, sourceIds: ids });
}
check('Report fingerprint matches approved content',()=>assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.sha256));
check('2024 headline values and method',()=>{
  assert.equal(stats.year,2024); assert.equal(stats.method,'MoRTH police-reported');
  assert.deepEqual(stats.kpis.map(i=>i.value),[487707,177175,471441]);
  stats.kpis.forEach(item=>claim(item.label,item.value,item.reportSection,item.sourceIds,2024,'People / reported crashes'));
});
check('Complete reported trend: 2018–2024, with no added year',()=>{
  assert.deepEqual(stats.trend.map(i=>i.year),[2018,2019,2020,2021,2022,2023,2024]);
  assert.deepEqual(stats.trend.map(i=>i.deaths),[157593,158984,138383,153972,168491,172890,177175]);
  stats.trend.forEach(item=>claim(`Reported fatalities ${item.year}`,item.deaths,'2.1',['s1','s8'],item.year,'People killed'));
});
check('Selected road users remain partial and unnormalized',()=>{
  assert.equal(users.partial,true); assert.equal(users.items.length,3);
  assert.deepEqual(users.items.map(i=>i.value),[46.2,20.6,12.4]);
  users.items.forEach(item=>claim(item.name,item.value,users.reportSection,users.sourceIds,2024,'Percent of fatalities'));
});
check('Road classes match report and sum to 2024 deaths',()=>{
  assert.deepEqual(roads.items.map(i=>i.deaths),[64772,39277,73126]);
  assert.equal(roads.items.reduce((sum,i)=>sum+i.deaths,0),stats.kpis.find(i=>i.id==='deaths').value);
  assert.deepEqual(roads.items.map(i=>i.share),[36.6,22.2,41.3]);
  assert.deepEqual(roads.items.map(i=>i.crashes),[150958,103538,233211]);
  roads.items.forEach(item=>{claim(`${item.name} deaths`,item.deaths,'2.3',roads.sourceIds,2024,'People killed');claim(`${item.name} share`,item.share,'2.3',roads.sourceIds,2024,'Percent');claim(`${item.name} crashes`,item.crashes,'2.3',roads.sourceIds,2024,'Reported crashes');});
});
check('WHO estimate, range and rate stay separate in 2021',()=>{
  assert.deepEqual(stats.burden,{year:2021,reported:153972,estimated:216618,lower:193271,upper:239965,estimatedRate:15.4,rateUnit:'deaths per 100,000 people',reportSection:'2.4',sourceIds:['s5','s6']});
  ['reported','estimated','lower','upper','estimatedRate'].forEach(key=>claim(`2021 ${key}`,stats.burden[key],'2.4',['s5','s6'],2021,key==='estimatedRate'?'Deaths per 100,000':'People'));
});
check('Six policies with evidence, caveats and traceable sources',()=>{
  assert.equal(policies.length,6);
  policies.forEach(item=>{for(const key of ['country','description','evidence','limitation','application','reportSection'])assert(item[key]); assert(item.sourceIds.length);});
  assert.deepEqual(policies.filter(i=>i.outcomes.length).map(i=>i.id),['viet-nam','united-kingdom']);
  assert.deepEqual(policies[0].outcomes.map(i=>i.value),['16%','18%']);
  assert.deepEqual(policies[4].outcomes.map(i=>i.value),['36.4%','16%']);
  policies.forEach(item=>item.outcomes.forEach(o=>claim(`${item.country}: ${o.label}`,o.value,item.reportSection,item.sourceIds,item.id==='viet-nam'?'2007–2008 implementation':'2016 study', 'Study percentage')));
});
check('All 13 action recommendations preserve report wording',()=>{
  assert.deepEqual(phases.map(i=>i.horizon),['12–24 months','2–5 years','5–10 years']);
  assert.deepEqual(phases.map(i=>i.items.length),[5,5,3]);
  phases.forEach(phase=>phase.items.forEach(item=>assert(report.includes(item.description),`Action text differs: ${item.title}`)));
});
check('21 unique sources; URLs exist verbatim in report; local documents exist',()=>{
  assert.equal(sources.length,21); assert.equal(new Set(sources.map(i=>i.id)).size,21);
  sources.forEach(source=>{if(source.url){assert(report.includes(source.url));assert.equal(new URL(source.url).protocol,'https:');}if(source.localUrl)assert(existsSync(path.join(root,'public',source.localUrl)));});
  [stats,users,roads,...policies,...read('indian-policies')].forEach(item=>item.sourceIds.forEach(id=>assert(sources.some(source=>source.id===id))));
});
check('Only approved runtime dependencies; production commands exist',()=>{
  const pkg=JSON.parse(readFileSync(path.join(root,'package.json'),'utf8'));
  assert.deepEqual(Object.keys(pkg.dependencies).sort(),['react','react-dom','react-router-dom','recharts','lucide-react'].sort());
  assert(pkg.scripts.dev && pkg.scripts.build && pkg.scripts.preview);
});
const output=path.join(root,'docs/verification');mkdirSync(output,{recursive:true});
writeFileSync(path.join(output,'data-checks.json'),JSON.stringify({date:'27 October 2026',reportSha256:manifest.sha256,checks},null,2)+'\n');
writeFileSync(path.join(output,'claim-ledger.json'),JSON.stringify(ledger,null,2)+'\n');
console.log(`${checks.length} checks passed. ${ledger.length} numerical claims traced to the report. Evidence written to docs/verification/.`);
