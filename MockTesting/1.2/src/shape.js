function normalizeUser(raw){
  return {
    id: Number(raw.id),
    name: String(raw.name).trim(),
    tags: Array.isArray(raw.tags) ? raw.tags.slice() : []
  };
}
module.exports = { normalizeUser };