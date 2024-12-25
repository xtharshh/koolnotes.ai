import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import React from "react";

const FeatureCard = React.memo(() => {
  return (
    <Card 
      isFooterBlurred 
      className="border-none w-52 h-auto text-left"
      radius="lg"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="https://nextui.org/images/hero-card.jpeg"
        width="100%" // Set width to 100% to match the card's width
      />
      <CardFooter 
        className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <p className="text-tiny text-cen text-white/80">Available soon.</p>
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

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;