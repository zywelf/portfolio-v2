import { Technology } from "@/types";
import Section from "../layout/Section";
import {
    Css3Original,
    Html5Original,
    JavascriptOriginal,
    NextjsOriginal,
    ReactOriginal,
    TailwindcssOriginal,
    TypescriptOriginal,
    FlutterOriginal,
    DartOriginal,
} from "devicons-react";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { useTranslations } from "next-intl";
import TechBadge from "../ui/TechBadge";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type Project = {
    title: string;
    description: string;
    technologies: Technology[];
    githubUrl: string;
};

const itemProject: Project[] = [
    {
        title: "Porfolio v2",
        description: "portfolio_v2_description",
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
                name: "Tailwind CSS",
                icon: TailwindcssOriginal,
            },
        ],
        githubUrl: "https://github.com/zywelf/portfolio-v2",
    },
    {
        title: "Porfolio v1",
        description: "portfolio_v1_description",
        technologies: [
            {
                name: "HTML",
                icon: Html5Original,
            },
            {
                name: "CSS",
                icon: Css3Original,
            },
            {
                name: "JavaScript",
                icon: JavascriptOriginal,
            },
        ],
        githubUrl: "https://github.com/zywelf/Portfolio",
    },
    {
        title: "myBlivion",
        description: "flutter_description",
        technologies: [
            {
                name: "Flutter",
                icon: FlutterOriginal,
            },
            {
                name: "Dart",
                icon: DartOriginal,
            },
        ],
        githubUrl: "https://github.com/zywelf/myblivion_application",
    },
];

export default function Projects() {
    const t = useTranslations("projects");
    return (
        <Section id="projects">
            <SectionTitle>{t("title")}</SectionTitle>
            <div className="flex flex-col gap-6">
                {itemProject.map((item, index) => (
                    <Card key={`project-${index}`}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-foreground">
                                {item.title}
                            </h3>
                            <Link
                                href={item.githubUrl}
                                target="_blank"
                                className="text-muted-foreground hover:text-teal-light transition-colors"
                            >
                                <FaGithub size={24} />
                            </Link>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-2">{t(item.description)}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {item.technologies.map((bullet, index) => (
                                <TechBadge
                                    key={`tech-${index}`}
                                    name={bullet.name}
                                    icon={bullet.icon}
                                />
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
