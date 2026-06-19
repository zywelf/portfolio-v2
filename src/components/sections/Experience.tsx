import React from "react";
import Section from "../layout/Section";
import {
    AmazonwebservicesOriginalWordmark,
    DjangorestOriginal,
    DockerOriginal,
    GitOriginal,
    NextjsOriginal,
    PythonOriginal,
    ReactOriginal,
    TailwindcssOriginal,
    TypescriptOriginal,
    VuejsOriginal,
    JavascriptOriginal,
    Html5Original,
    Css3Original,
    MysqlOriginal,
} from "devicons-react";
import { useTranslations } from "next-intl";
import TechBadge from "../ui/TechBadge";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { Technology } from "@/types";

type Experience = {
    company: string;
    role: string;
    duration: string;
    description: string;
    technologies: Technology[];
};

const listExperience: Experience[] = [
    {
        company: "Metriks.ai",
        role: "Full Stack Developer",
        duration: "03/2025 - 02/2026",
        description: "metriks_bullets",
        technologies: [
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
                name: "JavaScript",
                icon: JavascriptOriginal,
            },
            {
                name: "HTML",
                icon: Html5Original,
            },
            {
                name: "CSS",
                icon: Css3Original,
            },
            {
                name: "Vue.js",
                icon: VuejsOriginal,
            },
            {
                name: "Tailwind CSS",
                icon: TailwindcssOriginal,
            },
            {
                name: "Django",
                icon: DjangorestOriginal,
            },
            {
                name: "Python",
                icon: PythonOriginal,
            },
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
    {
        company: "GiaoGiao",
        role: "Frontend Developer",
        duration: "01/2022 - 02/2023",
        description: "giaogiao_bullets",
        technologies: [
            {
                name: "Vue.js",
                icon: VuejsOriginal,
            },
            {
                name: "JavaScript",
                icon: JavascriptOriginal,
            },
            {
                name: "HTML",
                icon: Html5Original,
            },
            {
                name: "CSS",
                icon: Css3Original,
            },
            {
                name: "Python",
                icon: PythonOriginal,
            },
            {
                name: "MySQL",
                icon: MysqlOriginal,
            },
            {
                name: "Git",
                icon: GitOriginal,
            },
        ],
    },
];

export default function Experience() {
    const t = useTranslations("experience");

    return (
        <Section id="experience">
            <SectionTitle>
                {t("title")}
            </SectionTitle>
            <div className="flex flex-col gap-6">
                {listExperience.map((job) => (
                    <Card key={`job-${job.company}`}>
                        {/* Header — ruolo, azienda, periodo */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {job.role}
                                </h3>
                                <span className="text-teal text-sm">
                                    {job.company}
                                </span>
                            </div>
                            <span className="text-muted-foreground md:text-sm text-xs whitespace-nowrap">
                                {job.duration}
                            </span>
                        </div>

                        {/* Bullet points */}
                        <ul className="flex flex-col gap-2">
                            {(t.raw(job.description) as string[]).map(
                                (bullet) => (
                                    <li
                                        key={bullet}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        <span className="text-teal mt-1 shrink-0">
                                            ▹
                                        </span>
                                        <span className="flex-1">{bullet}</span>
                                    </li>
                                ),
                            )}
                        </ul>

                        {/* Tecnologie */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {job.technologies.map((item) => (
                                <TechBadge
                                    key={item.name}
                                    icon={item.icon}
                                    name={item.name}
                                    size={20}
                                />
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
