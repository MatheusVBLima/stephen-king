"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Expand, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export interface ExpandableGalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ExpandableImageGalleryProps {
  images: ExpandableGalleryImage[];
  className?: string;
}

export function ExpandableImageGallery({
  images,
  className,
}: ExpandableImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<ExpandableGalleryImage | null>(null);
  const id = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    const previousOverflow = document.body.style.overflow;

    if (activeImage) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  useOutsideClick(dialogRef, () => setActiveImage(null));

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3", className)}>
        {images.map((image, index) => (
          <motion.button
            key={`${image.src}-${index}`}
            type="button"
            layoutId={`gallery-card-${id}-${image.src}`}
            onClick={() => setActiveImage(image)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-muted/20 text-left"
            aria-label={`Expandir imagem ${index + 1}`}
          >
            <motion.div
              layoutId={`gallery-image-${id}-${image.src}`}
              className="relative h-full w-full"
            >
              <Image
                src={image.src}
                alt={image.alt || image.title || `Imagem ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 18vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {image.title || image.alt || `Imagem ${index + 1}`}
                </p>
              </div>
              <span className="rounded-full border border-border/70 bg-background/85 p-2 text-foreground shadow-sm">
                <Expand className="size-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-[100] overflow-y-auto px-4 py-24 sm:px-6 sm:py-28">
              <motion.div
                layoutId={`gallery-card-${id}-${activeImage.src}`}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={activeImage.title || activeImage.alt || "Imagem expandida"}
                className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-2xl"
              >
                <div className="absolute right-4 top-4 z-10">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => setActiveImage(null)}
                  >
                    <X data-icon="inline-start" />
                    <span className="sr-only">Fechar imagem</span>
                  </Button>
                </div>

                <motion.div
                  layoutId={`gallery-image-${id}-${activeImage.src}`}
                  className="relative h-[60vh] min-h-[320px] max-h-[720px] w-full bg-muted/20 sm:h-[68vh]"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt || activeImage.title || "Imagem expandida"}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>

                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <p className="text-lg font-semibold text-foreground">
                    {activeImage.title || activeImage.alt || "Imagem do artigo"}
                  </p>
                  {activeImage.description && (
                    <p className="text-sm leading-7 text-muted-foreground">
                      {activeImage.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default ExpandableImageGallery;
