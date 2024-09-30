import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className,
    children,
}: {
    items: {
        title: string;
        description: string;
    }[];
    className?: string;
    children?: React.ReactNode;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 py-10 w-full max-w-7xl mx-auto px-4",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item.title} // Use title as the key instead of link
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        {children}
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </div>
            ))}
        </div>
    );
};

// Card component remains unchanged
export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

// CardTitle and CardDescription remain unchanged
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-sm md:text-lg lg:text-xl xl:text-2xl", className)}>
            {children}
        </h4>
    );
};

export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-4 text-zinc-400 tracking-wide leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
                className
            )}
        >
            {children}
        </p>
    );
};
