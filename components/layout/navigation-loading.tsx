"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const MIN_VISIBLE_MS = 180;
const MAX_VISIBLE_MS = 6000;

export function NavigationLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const previousRoute = useRef(routeKey);
  const startedAt = useRef(0);
  const clearTimer = useRef<number | null>(null);
  const [isPending, setIsPending] = useState(false);

  const beginLoading = useCallback(() => {
    if (clearTimer.current) {
      window.clearTimeout(clearTimer.current);
      clearTimer.current = null;
    }

    startedAt.current = Date.now();
    setIsPending(true);
  }, []);

  const finishLoading = useCallback(() => {
    const elapsed = Date.now() - startedAt.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => {
      setIsPending(false);
      clearTimer.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    if (previousRoute.current === routeKey) return;
    previousRoute.current = routeKey;
    finishLoading();
  }, [finishLoading, routeKey]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      try {
        const destination = new URL(anchor.href, window.location.href);
        const current = new URL(window.location.href);

        if (destination.origin !== current.origin) return;
        if (destination.href === current.href) return;
        if (
          destination.pathname === current.pathname &&
          destination.search === current.search &&
          destination.hash
        ) {
          return;
        }

        beginLoading();
      } catch {
        // Abaikan tautan non-URL yang tidak dapat dinavigasi oleh router.
      }
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", beginLoading);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", beginLoading);
    };
  }, [beginLoading]);

  useEffect(() => {
    if (!isPending) return;

    const safetyTimer = window.setTimeout(
      () => setIsPending(false),
      MAX_VISIBLE_MS,
    );

    return () => window.clearTimeout(safetyTimer);
  }, [isPending]);

  useEffect(
    () => () => {
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    },
    [],
  );

  if (!isPending) return null;

  return (
    <div
      className="route-loading-overlay fixed inset-0 z-[150] overflow-hidden bg-white"
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
    >
      <span className="sr-only">Memuat halaman</span>

      <div className="h-[68px] border-b border-[#ececec]">
        <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-32 rounded-md" />
          <div className="hidden items-center gap-8 md:flex">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <Skeleton className="h-10 w-56 max-w-[70vw] rounded-lg" />

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-[42px] flex-1 rounded-xl" />
          <Skeleton className="h-[42px] w-full rounded-xl sm:w-56" />
          <Skeleton className="h-[42px] w-full rounded-xl sm:w-44" />
        </div>

        <Skeleton className="mt-7 h-4 w-32 rounded" />

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="min-h-60 rounded-2xl border border-[#ececec] p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <Skeleton className="mt-7 h-6 w-4/5 rounded" />
              <Skeleton className="mt-4 h-4 w-full rounded" />
              <Skeleton className="mt-2 h-4 w-3/4 rounded" />
              <div className="mt-12 flex gap-3">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
