"use client";

import { Bot, BrainCircuit, Cloud, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    name: "Customizable Agents",
    description:
      "Create and customize AI agents to fit your specific needs. Define their personality, knowledge base, and capabilities.",
    icon: Bot,
  },
  {
    name: "Powerful Workflows",
    description:
      "Build complex workflows and chains of thought for your agents to handle intricate tasks and conversations.",
    icon: BrainCircuit,
  },
  {
    name: "Seamless Integration",
    description:
      "Easily deploy your chatbots to any platform with our robust and scalable cloud infrastructure.",
    icon: Cloud,
  },
  {
    name: "Fast and Reliable",
    description:
      "Our platform is built for speed and reliability, ensuring your chatbots are always available and responsive.",
    icon: Zap,
  },
];

const Features = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={targetRef} id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold leading-7 text-orange-400">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to deploy your chatbot
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            We provide the tools and infrastructure to build, train, and deploy
            AI-powered chatbots that can be integrated into any application.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
