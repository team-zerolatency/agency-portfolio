import { fibonacciSphere, latLngToVector3 } from "./globe";

describe("latLngToVector3", () => {
  it("puts the north pole on the +Y axis", () => {
    const [x, y, z] = latLngToVector3(90, 0, 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(2);
    expect(z).toBeCloseTo(0);
  });

  it("puts the south pole on the -Y axis", () => {
    const [, y] = latLngToVector3(-90, 45, 2);
    expect(y).toBeCloseTo(-2);
  });

  it("always returns a point exactly `radius` from the origin", () => {
    for (const [lat, lng] of [
      [40.7, -74],
      [-33.9, 151.2],
      [1.35, 103.8],
      [0, 0],
    ]) {
      const [x, y, z] = latLngToVector3(lat, lng, 2);
      expect(Math.hypot(x, y, z)).toBeCloseTo(2, 6);
    }
  });

  it("gives different points for different longitudes", () => {
    const a = latLngToVector3(0, 0, 2);
    const b = latLngToVector3(0, 90, 2);
    expect(a).not.toEqual(b);
  });
});

describe("fibonacciSphere", () => {
  it("returns three numbers per point", () => {
    expect(fibonacciSphere(100, 2)).toHaveLength(300);
  });

  it("returns an empty array for zero points", () => {
    expect(fibonacciSphere(0, 2)).toHaveLength(0);
  });

  it("keeps every point on the sphere surface", () => {
    const pts = fibonacciSphere(200, 2);
    for (let i = 0; i < pts.length; i += 3) {
      expect(Math.hypot(pts[i], pts[i + 1], pts[i + 2])).toBeCloseTo(2, 4);
    }
  });
});
