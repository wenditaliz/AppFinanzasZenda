import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselZenda() {
  const images = [
    "/img/FinanzasPersonales.jpg",
    "/img/FinanzasGrafica.avif",
    "/img/FinanzasEducacion.webp",
    "/img/FinanzasAhorro.webp",
    "/img/Finanzas2.jpg",
  ];

  return (
    <div className="py-16 bg-background">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Inspírate con ZENDA
      </h2>

      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="-ml-2">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card className="bg-accent/40 border border-primary/20 shadow-md rounded-2xl overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0">
                    <img
                      src={src}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-60 object-cover rounded-2xl hover:opacity-90 transition"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-primary text-primary-foreground hover:bg-primary/90 transition rounded-full" />
        <CarouselNext className="bg-primary text-primary-foreground hover:bg-primary/90 transition rounded-full" />
      </Carousel>
    </div>
  );
}
