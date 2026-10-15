export type Vec3 = [number, number, number];

/** Converts a latitude and longitude (degrees) to a point on a sphere of the given radius. */
export function latLngToVector3(lat: number, lng: number, radius: number): Vec3 {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lng * Math.PI) / 180;
  return [
    radius * Math.cos(phi) * Math.sin(lambda),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(lambda),
  ];
}

/** Evenly spread points on a sphere (Fibonacci lattice). Returns a flat [x, y, z, x, y, z, ...] array. */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    out[i * 3] = Math.cos(t) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(t) * r * radius;
  }
  return out;
}

/**
 * Generate points along a great-circle arc between two lat/lng positions,
 * lifted above the sphere surface for a 3D arc effect.
 * Returns a Float32Array of [x, y, z, x, y, z, ...] for use as a dotted line.
 */
export function greatCircleArc(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  radius: number,
  segments: number = 50,
  arcHeight: number = 0.25,
): Float32Array {
  const out = new Float32Array(segments * 3);
  const [x1, y1, z1] = latLngToVector3(lat1, lng1, 1);
  const [x2, y2, z2] = latLngToVector3(lat2, lng2, 1);

  const dot = Math.max(-1, Math.min(1, x1 * x2 + y1 * y2 + z1 * z2));
  const omega = Math.acos(dot);

  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    let sx: number, sy: number, sz: number;

    if (omega < 0.001) {
      sx = x1 + (x2 - x1) * t;
      sy = y1 + (y2 - y1) * t;
      sz = z1 + (z2 - z1) * t;
    } else {
      const sinOmega = Math.sin(omega);
      const a = Math.sin((1 - t) * omega) / sinOmega;
      const b = Math.sin(t * omega) / sinOmega;
      sx = a * x1 + b * x2;
      sy = a * y1 + b * y2;
      sz = a * z1 + b * z2;
    }

    const len = Math.hypot(sx, sy, sz) || 1;
    sx /= len;
    sy /= len;
    sz /= len;

    const arcScale = Math.sin(omega / 2);
    const lift = 1 + arcHeight * (4 * t * (1 - t)) * (0.3 + 0.7 * arcScale);
    const r = radius * lift;

    out[i * 3] = sx * r;
    out[i * 3 + 1] = sy * r;
    out[i * 3 + 2] = sz * r;
  }

  return out;
}

/** Sample a single 3D point along a great-circle arc at normalized parameter t in [0, 1]. */
export function getArcPoint(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  radius: number,
  t: number,
  arcHeight: number = 0.25,
): Vec3 {
  const [x1, y1, z1] = latLngToVector3(lat1, lng1, 1);
  const [x2, y2, z2] = latLngToVector3(lat2, lng2, 1);

  const dot = Math.max(-1, Math.min(1, x1 * x2 + y1 * y2 + z1 * z2));
  const omega = Math.acos(dot);

  let sx: number, sy: number, sz: number;
  if (omega < 0.001) {
    sx = x1 + (x2 - x1) * t;
    sy = y1 + (y2 - y1) * t;
    sz = z1 + (z2 - z1) * t;
  } else {
    const sinOmega = Math.sin(omega);
    const a = Math.sin((1 - t) * omega) / sinOmega;
    const b = Math.sin(t * omega) / sinOmega;
    sx = a * x1 + b * x2;
    sy = a * y1 + b * y2;
    sz = a * z1 + b * z2;
  }

  const len = Math.hypot(sx, sy, sz) || 1;
  sx /= len;
  sy /= len;
  sz /= len;

  const arcScale = Math.sin(omega / 2);
  const lift = 1 + arcHeight * (4 * t * (1 - t)) * (0.3 + 0.7 * arcScale);
  const r = radius * lift;

  return [sx * r, sy * r, sz * r];
}

/**
 * Convert an array of [lat, lng] pairs into a flat Float32Array of [x, y, z, ...] positions
 * on the surface of a sphere of the given radius.
 */
export function latLngArrayToPositions(dots: [number, number][], radius: number): Float32Array {
  const out = new Float32Array(dots.length * 3);
  for (let i = 0; i < dots.length; i++) {
    const [lat, lng] = dots[i];
    const pos = latLngToVector3(lat, lng, radius);
    out[i * 3] = pos[0];
    out[i * 3 + 1] = pos[1];
    out[i * 3 + 2] = pos[2];
  }
  return out;
}
