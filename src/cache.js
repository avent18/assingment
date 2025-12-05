

const cache = new Map();

function setCache(key, value, ttlMs = 5*60*1000) { // default TTL is 5 minutes
  cache.set(key,{
    value,
    expiry: Date.now() + ttlMs
  });
}   

function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;
  if(Date.now()>cached.expiry){
    cache.delete(key);
    return null;
  }
  return cached.value;
}

export { setCache, getCache };