"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "header";
};

/** Small fade-and-rise when the block scrolls into view. Off for reduced motion. */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <LazyMotion features={domAnimation} strict>
      <Tag
        className={className}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
}
