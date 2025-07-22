"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef } from "react";

const faqs = [
    {
        question: "What is Verbalize?",
        answer:
            "Verbalize is a platform for building, training, and deploying AI-powered chatbots. We provide the tools and infrastructure to create custom chatbots that can be integrated into any application.",
    },
    {
        question: "How do I get started?",
        answer:
            "You can get started by signing up for a free account. Once you've signed up, you can create your first chatbot and start building your conversational AI.",
    },
    {
        question: "Can I customize my chatbot?",
        answer:
            "Yes, you can customize your chatbot's personality, knowledge base, and capabilities to fit your specific needs. You can also create complex workflows and chains of thought for your chatbot to handle intricate tasks and conversations.",
    },
    {
        question: "How do I deploy my chatbot?",
        answer:
            "You can easily deploy your chatbot to your website. We provide an HTML snippet that you can embed in your website to integrate your chatbot.",
    },
];

const FAQ = () => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={targetRef}
            className="py-16 sm:py-24 text-white"
            id="faq"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl font-semibold leading-7 text-orange-400">
                        FAQ
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Frequently Asked Questions
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="cursor-pointer">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
