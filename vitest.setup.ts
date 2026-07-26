import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// The 3D hero decoration (@react-three/fiber/Three.js) needs a real WebGL
// canvas + ResizeObserver that jsdom doesn't provide. It's purely decorative
// chrome unrelated to the data-rendering logic these tests cover, so it's
// stubbed out globally rather than fighting jsdom to make WebGL work.
vi.mock("@/components/three/Hero3DBackground", () => ({
  default: () => null,
}));

// jsdom doesn't implement matchMedia or IntersectionObserver, both used by
// Hero3DBackground (reduced-motion check) and framer-motion's whileInView.
window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;
