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
    JavascriptOriginal,
    Html5Original,
    Css3Original,
    MysqlOriginal,
} from "devicons-react";
import { MapPin, Wifi } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "../layout/Section";
import Link from "next/link";
import TechBadge from "../ui/TechBadge";
import Card from "../ui/Card";

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
                name: "JavaScript",
                icon: JavascriptOriginal,
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
            {
                name: "HTML",
                icon: Html5Original,
            },
            {
                name: "CSS",
                icon: Css3Original,
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
            {
                name: "MySQL",
                icon: MysqlOriginal,
            }
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
            <Card>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t("title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    {t("description")}
                </p>
                <div className="flex flex-col gap-3 mt-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} className="text-teal-light" />
                        <span>{t("location")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wifi size={16} className="text-teal-light" />
                        <span>{t("availability")}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Link
                            href="https://github.com/zywelf"
                            target="_blank"
                            className="text-muted-foreground hover:text-teal-light transition-colors ease-in-out duration-300"
                        >
                            <FaGithub size={30} />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/zywel-fankam"
                            target="_blank"
                            className="text-muted-foreground hover:text-teal-light transition-colors ease-in-out duration-300"
                        >
                            <FaLinkedin size={30} />
                        </Link>
                    </div>
                </div>
            </Card>
            <Card>
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
                                <TechBadge
                                    key={`key-${skill.name}`}
                                    icon={skill.icon}
                                    name={skill.name}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </Card>
        </Section>
    );
}
