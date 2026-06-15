import {
    ReactOriginal,
    NextjsOriginal,
    TypescriptOriginal,
    VuejsOriginal,
    TailwindcssOriginal,
    DjangorestOriginal,
    NodejsOriginal,
    PythonOriginal,
    DockerOriginal,
    GitOriginal,
    AmazonwebservicesOriginalWordmark,
} from "devicons-react";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "../layout/Section";

type Skill = {
    name: string;
    icon: React.ComponentType<{ size?: number }>;
};

type SkillCategoty = {
    category: string;
    skills: Skill[];
};

const aboutItems: SkillCategoty[] = [
    {
        category: "Frontend",
        skills: [
            {
                name: "React",
                icon: ReactOriginal,
            },
            {
                name: "Next.js",
                icon: NextjsOriginal,
            },
            {
                name: "TypeScript",
                icon: TypescriptOriginal,
            },
            {
                name: "Vue.js",
                icon: VuejsOriginal,
            },
            {
                name: "Tailwind CSS",
                icon: TailwindcssOriginal,
            },
        ],
    },
    {
        category: "Backend",
        skills: [
            {
                name: "Django",
                icon: DjangorestOriginal,
            },
            {
                name: "Node.js",
                icon: NodejsOriginal,
            },
            {
                name: "Python",
                icon: PythonOriginal,
            },
        ],
    },
    {
        category: "DevOps",
        skills: [
            {
                name: "Docker",
                icon: DockerOriginal,
            },
            {
                name: "AWS",
                icon: AmazonwebservicesOriginalWordmark,
            },
            {
                name: "Git",
                icon: GitOriginal,
            },
        ],
    },
];

export default function About() {
    const t = useTranslations("about");
    return (
        <Section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="border rounded-xl p-4 hover:border-teal transition-colors ease-in-out duration-300">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t("title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t("description")}
                </p>
            </div>
            <div className="border rounded-xl p-4 hover:border-teal transition-colors ease-in-out duration-300">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                    {t("skills_title")}
                </h2>
                {aboutItems.map((item) => (
                    <div key={`category-${item.category}`} className="mb-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                            {item.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                                <span
                                    key={`key-${skill.name}`}
                                    className="flex items-center gap-2 px-3 py-1 rounded-full border dark:border-white/10 border-black/10 text-muted-foreground hover:border-teal hover:text-teal transition-colors duration-300 ease-in-out w-fit cursor-default"
                                >
                                    <skill.icon size={18} />
                                    <span className="text-sm">
                                        {skill.name}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
