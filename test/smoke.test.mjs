import assert from 'node:assert/strict';
import { test } from 'node:test';

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

async function graphql(query) {
  const response = await fetch(new URL('/graphql', baseUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  return result.data;
}

test('serves Apollo Sandbox and reports database readiness', async () => {
  const root = await fetch(new URL('/', baseUrl), { redirect: 'manual' });
  assert.equal(root.status, 302);
  assert.equal(root.headers.get('location'), '/graphql');

  const sandbox = await fetch(new URL('/graphql', baseUrl), { headers: { accept: 'text/html' } });
  assert.equal(sandbox.status, 200);
  const html = await sandbox.text();
  assert.match(html, /EmbeddedSandbox/);
  assert.match(html, /query DeveloperCard/);

  const health = await fetch(new URL('/health', baseUrl));
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });
});

test('exposes the seeded profile with all relations and stable order', async () => {
  const { profile } = await graphql(`{
    profile {
      name
      description
      links { label url }
      skills { name }
      experience { company position startedAt endedAt achievements }
      projects { name url description }
    }
  }`);

  assert.equal(profile.name, 'Юрий Пак');
  assert.ok(profile.description);
  assert.ok(profile.links.length);
  assert.equal(profile.skills[0].name, 'TypeScript');
  assert.equal(profile.experience[0].company, 'Obmen21');
  assert.ok(profile.projects.length);
  assert.deepEqual(
    profile.experience.map(({ startedAt }) => startedAt),
    profile.experience.map(({ startedAt }) => startedAt).sort().reverse(),
  );
  for (const entry of profile.experience) {
    assert.match(entry.startedAt, /^\d{4}-(0[1-9]|1[0-2])$/);
    assert.ok(entry.endedAt === null || entry.endedAt >= entry.startedAt);
    assert.ok(entry.achievements.length);
  }
  for (const { url } of [...profile.links, ...profile.projects]) {
    assert.equal(new URL(url).protocol, 'https:');
  }
});

test('resolves aliased relations and exposes a read-only schema', async () => {
  const { first, second, __schema } = await graphql(`{
    first: profile { skills { name } }
    second: profile { ...Skills }
    __schema { mutationType { name } }
  }
  fragment Skills on Profile {
    stack: skills { name }
  }
  `);
  assert.ok(first.skills.length);
  assert.deepEqual(first.skills, second.stack);
  assert.equal(__schema.mutationType, null);
});
