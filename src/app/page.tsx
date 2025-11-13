'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart, Bot, Map, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuraTwinLogo } from '@/components/icons';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Real-Time Analytics',
    description: 'Visualize energy production and consumption with dynamic, real-time dashboards.',
    image: PlaceHolderImages.find(img => img.id === 'feature-1'),
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Solar Potential Mapping',
    description: 'Leverage Google Solar API to assess and cache solar potential for any location.',
    image: PlaceHolderImages.find(img => img.id === 'feature-2'),
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Privacy-First by Design',
    description: 'Aggregate and anonymize data using advanced AI to protect user privacy.',
    image: PlaceHolderImages.find(img => img.id === 'feature-3'),
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AuraTwinLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">AuraTwin</span>
          </Link>
          <Button asChild>
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-12 text-center md:grid-cols-2 md:py-24 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Your Digital Twin for a Greener Future
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:mx-0">
              AuraTwin is a revolutionary platform that models and visualizes renewable energy adoption, providing homeowners and policymakers with actionable insights for a sustainable tomorrow.
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Explore the Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-auto md:aspect-[4/3]">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="rounded-xl object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </section>

        <section id="features" className="w-full bg-secondary py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Powered by Cutting-Edge Technology
              </h2>
              <p className="text-muted-foreground md:text-xl">
                We use a scalable, secure architecture to join relational user data with real-time energy metrics.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader className="items-center text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {year || '...'} AuraTwin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
