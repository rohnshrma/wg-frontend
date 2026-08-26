import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import StickyCta from "@/app/(ads)/lp/data-analytics-course/StickyCta";

/**
 * Regression cover for a bug that only ever appeared on phones.
 *
 * StickyCta used to observe `#demo-form`. On desktop the lead form sits beside
 * the hero copy, so it is on screen at scroll 0 and the pill correctly stayed
 * hidden. On a phone the form is stacked *below* the headline, so it is
 * already outside the viewport at scroll 0 — the observer reported "not
 * intersecting" immediately and the pill appeared on top of the hero it was
 * supposed to be waiting for.
 *
 * The fix is to observe the whole `#hero` section. These tests pin that: what
 * gets observed, and that visibility is driven by the hero leaving the
 * viewport rather than by anything inside it.
 */

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

let observed: Element[] = [];
let fire: ObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: ObserverCallback) {
    fire = cb;
  }
  observe(el: Element) {
    observed.push(el);
  }
  disconnect() {}
  unobserve() {}
}

/** Lays out the DOM the way the real page does: hero first, form inside it. */
function mountPageSkeleton() {
  const hero = document.createElement("section");
  hero.id = "hero";
  const form = document.createElement("div");
  form.id = "demo-form";
  hero.appendChild(form);
  document.body.appendChild(hero);
  return { hero, form };
}

/**
 * The pill is hidden by opacity and aria-hidden rather than unmounted, so it
 * has to be queried with `hidden: true` — the default role query drops
 * aria-hidden nodes, which is itself the behaviour we want while it's hidden.
 */
function pill() {
  return screen.getByRole("link", { name: /book my free demo/i, hidden: true });
}

function pillIsVisible() {
  const wrapper = pill().parentElement as HTMLElement;
  return wrapper.className.includes("opacity-100");
}

beforeEach(() => {
  observed = [];
  fire = null;
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("ads landing page sticky CTA", () => {
  it("observes the hero section, not the form nested inside it", () => {
    const { hero, form } = mountPageSkeleton();
    render(<StickyCta />);

    expect(observed).toContain(hero);
    expect(observed).not.toContain(form);
  });

  it("stays hidden while any part of the hero is still on screen", () => {
    mountPageSkeleton();
    render(<StickyCta />);

    act(() => fire?.([{ isIntersecting: true }]));

    expect(pillIsVisible()).toBe(false);
    // Not just faded out — also out of the accessibility tree.
    expect(pill().parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("is hidden before the observer has reported anything", () => {
    mountPageSkeleton();
    render(<StickyCta />);

    // The phone bug surfaced as a flash at scroll 0, so the initial state
    // matters as much as the observed one.
    expect(pillIsVisible()).toBe(false);
  });

  it("appears once the hero has fully scrolled away", () => {
    mountPageSkeleton();
    render(<StickyCta />);

    act(() => fire?.([{ isIntersecting: false }]));

    expect(pillIsVisible()).toBe(true);
  });

  it("hides again if the visitor scrolls back up into the hero", () => {
    mountPageSkeleton();
    render(<StickyCta />);

    act(() => fire?.([{ isIntersecting: false }]));
    expect(pillIsVisible()).toBe(true);

    act(() => fire?.([{ isIntersecting: true }]));
    expect(pillIsVisible()).toBe(false);
  });

  it("keeps the pill out of the tab order while hidden", () => {
    mountPageSkeleton();
    render(<StickyCta />);

    act(() => fire?.([{ isIntersecting: true }]));
    expect(pill()).toHaveAttribute("tabindex", "-1");

    act(() => fire?.([{ isIntersecting: false }]));
    expect(pill()).toHaveAttribute("tabindex", "0");
  });
});
