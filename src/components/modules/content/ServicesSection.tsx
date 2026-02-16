"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

export function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <section>
        <h2 className="mb-6 text-xl font-semibold border-b border-border pb-2">
          Mes Services
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors bg-card/30"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{service.title}</h3>
                  {service.price && (
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {service.price}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
