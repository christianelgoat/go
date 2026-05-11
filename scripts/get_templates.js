import fs from 'fs';
import https from 'https';

https.get('https://api.memegen.link/templates', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const templates = JSON.parse(data);
    const ids = templates.map(t => t.id);
    fs.writeFileSync('templates.json', JSON.stringify(ids, null, 2));
  });
});
