import React from 'react';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';

interface FeatureCardProps {
  name: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ name }) => {
  return (
    <Card
      isFooterBlurred
      className="border-none w-52 h-auto text-left"
      radius="lg"
    >
      <Image
        alt="Feature Image"
        className="object-cover"
        height="auto" // Set height to auto
        src="https://nextui.org/images/hero-card.jpeg"
        width="auto" // Set width to auto
      />
      <CardFooter
        className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <p className="text-tiny text-center text-white/80 text-bold text-newGab">{name}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;