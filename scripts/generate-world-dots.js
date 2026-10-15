/**
 * Script to generate world-map dot positions from Natural Earth GeoJSON.
 * Run with: node generate-world-dots.mjs
 * Output: world-dots.json with accurate lat/lng pairs for every land cell.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const GEOJSON_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJSON(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
      res.on('error', reject);
    });
  });
}

/** Ray-casting point-in-polygon test (works for simple + multi polygons). */
function pointInPolygon(px, py, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointInMultiPolygon(px, py, coordinates) {
  for (const polygon of coordinates) {
    // polygon[0] is exterior ring, polygon[1..n] are holes
    if (pointInPolygon(px, py, polygon[0])) {
      let inHole = false;
      for (let h = 1; h < polygon.length; h++) {
        if (pointInPolygon(px, py, polygon[h])) { inHole = true; break; }
      }
      if (!inHole) return true;
    }
  }
  return false;
}

async function main() {
  console.log('Fetching Natural Earth 110m land GeoJSON...');
  const geojson = await fetchJSON(GEOJSON_URL);
  console.log(`Got ${geojson.features.length} features.`);

  // Build a list of all multipolygon coordinate sets
  const allPolygons = [];
  for (const feature of geojson.features) {
    const g = feature.geometry;
    if (g.type === 'Polygon') {
      allPolygons.push([g.coordinates]); // wrap as multi
    } else if (g.type === 'MultiPolygon') {
      allPolygons.push(g.coordinates);
    }
  }

  const STEP = 1.6; // degrees – gives ~7,500 dots for good density
  const dots = [];

  for (let lat = 84; lat >= -84; lat -= STEP) {
    for (let lng = -180; lng < 180; lng += STEP) {
      for (const coords of allPolygons) {
        if (pointInMultiPolygon(lng, lat, coords)) {
          dots.push([Math.round(lat * 100) / 100, Math.round(lng * 100) / 100]);
          break;
        }
      }
    }
  }

  console.log(`Generated ${dots.length} land dots.`);

  // Write as JSON
  const outPath = path.join(__dirname, 'world-dots.json');
  fs.writeFileSync(outPath, JSON.stringify(dots));
  console.log(`Written to ${outPath}`);

  // Also write as a TypeScript module
  const tsPath = path.join(__dirname, '..', 'src', 'lib', 'world-map-data.ts');
  const tsContent = `/**
 * World map dot positions as [lat, lng] pairs.
 * Auto-generated from Natural Earth 110m land boundaries.
 * Total dots: ${dots.length}
 */
export const worldMapDots: [number, number][] = ${JSON.stringify(dots)};
`;
  fs.writeFileSync(tsPath, tsContent);
  console.log(`Written TypeScript module to ${tsPath}`);
}

main().catch(console.error);
