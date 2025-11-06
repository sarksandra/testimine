async function getUser(id, fetchImpl = fetch) {
  const res = await fetchImpl(`https://api.example.com/users/${id}`, { method:'GET' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data || typeof data.id !== 'number' || typeof data.name !== 'string') throw new Error('Bad shape');
  return data;
}
module.exports = { getUser };