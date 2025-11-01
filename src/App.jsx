import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Email,
  Phone,
  GitHub,
  LinkedIn,
  Person,
  Work,
  Code,
  School,
  ContactMail,
  Visibility,
  EmojiEvents,
  Star,
  Menu,
  Close,
} from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";

// --- Mock Data ---
const PERSONAL_INFO = {
  name: "Samyak Jain",
  title: "Full-Stack Developer",
  tagline: "Building scalable solutions with modern technologies.",
  email: "jainsamyak0805@gmail.com",
  phone: "+91 81034 03619",
  photo: "/images/port-pfp.jpg", // Replace with your photo
  socials: {
    github: "https://github.com/hellosamyak",
    linkedin: "https://linkedin.com/in/samyak-jain-sj1208",
    x: "https://x.com/hellosamyak",
  },
};

const ABOUT_DATA = {
  vision:
    "To craft meaningful, user-centric digital experiences that blend creativity with functionality. I aim to grow as a full-stack developer capable of building scalable web solutions that make a real-world impact by simplifying everyday problems, empowering communities, or innovating at the intersection of design and technology.",
  bio: "Passionate about building intuitive, modern web applications. Currently, I’m focusing on frontend development using React and Tailwind CSS while exploring backend technologies to become a full-stack developer. I enjoy turning ideas into clean, efficient code and love collaborating on projects that challenge me to learn, adapt, and grow.",
};

const SKILLS_DATA = [
  { name: "JavaScript (ES6+)", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "React", category: "Frameworks & Libraries" },
  { name: "Node.js", category: "Frameworks & Libraries" },
  { name: "Tailwind CSS", category: "Frameworks & Libraries" },
  { name: "Next.js", category: "Frameworks & Libraries" },
  { name: "Express.js", category: "Frameworks & Libraries" },
  { name: "MongoDB", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "Vercel", category: "DevOps & Deployment" },
  { name: "Netlify", category: "DevOps & Deployment" },
  { name: "GitHub Pages", category: "DevOps & Deployment" },
  { name: "Render", category: "DevOps & Deployment" },
  { name: "Git", category: "Tools & Platforms" },
  { name: "GitHub", category: "Tools & Platforms" },
  { name: "VS Code", category: "Tools & Platforms" },
  { name: "Vite", category: "Tools & Platforms" },
  { name: "AWS", category: "Cloud" },
  { name: "Version Control", category: "Other Skills" },
  { name: "Responsive UI Design", category: "Other Skills" },
  { name: "API Integration", category: "Other Skills" },
];

const EXPERIENCE_DATA = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Jayshree Infrastructures",
    period: "Aug 2025 - October 2025",
    description:
      "Developed a custom website for an infrastructure company with fully responsive and modern Ul using React + Tailwind CSS. Implemented dynamic content management system to efficiently showcase projects, services, and company portfolio. Optimized for fast load times and cross-device compatibility, significantly improving user experience. Integrated contact forms and lead capture features, enabling direct online client inquiries.",
    tags: ["React", "Node.js", "Tailwind CSS"],
  },
  {
    role: "Freelance Software Developer",
    company: "DAY Foundation (NGO)",
    period: "Apr 2025 - Jun 2025",
    description:
      "Designed and developed the official NGO website with 100% responsive Ul and modern React + Tailwind architecture. Optimized website performance achieving 50% faster load times across all devices. Implemented interactive features and dynamic content, increasing user engagement by 40%. Successfully showcased NGO initiatives, team members, and programs through intuitive design.",
    tags: ["React", "Node.js"],
  },
];

const FEATURED_PROJECTS = [
  {
    name: "GaiaOS: The Energy Internet",
    description:
      "GaiaOS is a hackathon-winning project concept designed to revolutionize India's energy sector. The core vision of the platform is to do for energy what the Unified Payments Interface (UPI) did for digital payments. It is designed as a system to make energy visible, tradable, and rewarding for Indian citizens.",
    tags: ["Energy", "Hackathon", "Node.js", "three.js"],
    link: "https://gaia-os-frontend.vercel.app/",
    image: "/images/gaiaos.png",
    featured: true,
  },
  {
    name: "AQ-Pulse",
    description:
      "This project has been deployed in our college. AQ-Pulse is an IoT-driven Air Quality Index (AQI) monitoring system designed to measure real-time environmental parameters like CO₂ levels, temperature, and humidity. The system gathers sensor data and transmits it to an online dashboard for visualization and analysis.",
    tags: ["AQI", "MQTT"],
    link: "https://aq-pulse.vercel.app/",
    image: "/images/aq-pulse.png",
    featured: true,
  },
  {
    name: "Fastype",
    description:
      "FASTYPE is a modern, minimal typing test web application built with pure HTML, Tailwind CSS, and vanilla JavaScript. It’s designed for speed and simplicity — allowing users to test and improve their typing accuracy and words per minute (WPM) in a sleek, responsive interface. The app runs fully client-side and is optimized for performance, accessibility, and a smooth user experience.",
    tags: ["JavaScript", "Typing"],
    link: "https://hellosamyak.github.io/Fastype/",
    image: "/images/fastype.png",
    featured: true,
  },
];

const PROJECTS_DATA = [
  {
    name: "NextGen IDE",
    description:
      "NextGen IDE compiles and executes code in 40+ languages on the web, no local setup required",
    tags: ["React", "Code Editor", "IDE"],
    link: "https://next-gen-ide.vercel.app/",
  },
  {
    name: "Currency Converter",
    description:
      "A simplified & easy to use React app to convert currency. Currency exchanges are updated every 24 hours.",
    tags: ["Exchange API", "Currency"],
    link: "https://currency-converter-nine-henna.vercel.app/",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Srijan 2025 Runner-Up",
    description: (
      <>
        Named Runners Up for the{" "}
        <a
          href="https://gaia-os-frontend.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GaiaOS
        </a>{" "}
        project, a platform designed to make energy tradable and rewarding. I
        was responsible for the full-stack development, building the user-facing
        frontend and the core backend API.
      </>
    ),
    image: "/images/port-win.jpg",
    date: "2025",
    place: "Indian Institute of Forest Management, Bhopal",
  },
];

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution:
      "Gyan Ganga Institute of Technology & Sciences, Jabalpur (M.P.)",
    period: "2023 - Present",
    description:
      "Throughout my coursework, I’ve built a solid foundation in computer science fundamentals, including object-oriented-programming, operating systems, computer networks, and database management systems. Hands-on projects have strengthened my understanding of web technologies, software development practices, and problem-solving using JavaScript. I’ve also learned the importance of collaboration, version control (Git/GitHub), and developing software that’s both efficient and user-focused.",
  },
];

// --- Helper Hooks ---
const useSearchFilter = (items, searchTerm) => {
  return useMemo(() => {
    if (!searchTerm.trim()) return items;
    const lowerCaseSearch = searchTerm.toLowerCase();

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerCaseSearch);
        }
        if (Array.isArray(value)) {
          return value.some((tag) =>
            String(tag).toLowerCase().includes(lowerCaseSearch)
          );
        }
        return false;
      });
    });
  }, [items, searchTerm]);
};

// --- Components ---
const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-20 scroll-mt-24">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Hero = () => (
  <header className="mb-20 relative">
    <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"></div>

    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
        <img
          src={PERSONAL_INFO.photo}
          alt={PERSONAL_INFO.name}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-2">
          {PERSONAL_INFO.title}
        </p>
        <p className="text-lg text-gray-400 mb-6">{PERSONAL_INFO.tagline}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-purple-500"
          >
            <Email className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">{PERSONAL_INFO.email}</span>
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-pink-500"
          >
            <Phone className="w-5 h-5 text-pink-400" />
            <span className="text-gray-300">{PERSONAL_INFO.phone}</span>
          </a>
        </div>

        <div className="flex justify-center md:justify-start gap-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-purple-500 hover:scale-110"
          >
            <GitHub className="w-6 h-6 text-gray-300" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-blue-500 hover:scale-110"
          >
            <LinkedIn className="w-6 h-6 text-gray-300" />
          </a>
          <a
            href={PERSONAL_INFO.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all backdrop-blur-sm border border-gray-700 hover:border-blue-500 hover:scale-110"
          >
            <XIcon className="w-6 h-6 text-gray-300" />
          </a>
        </div>
      </div>
    </div>
  </header>
);

const About = () => (
  <Section id="about" title="About" icon={Person}>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Visibility className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-200">My Vision</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{ABOUT_DATA.vision}</p>
      </div>

      <div className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/50 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Person className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-semibold text-gray-200">Personal Bio</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{ABOUT_DATA.bio}</p>
      </div>
    </div>
  </Section>
);

const Skills = ({ searchTerm }) => {
  const filteredSkills = useSearchFilter(SKILLS_DATA, searchTerm);

  const skillsByCategory = useMemo(() => {
    return filteredSkills.reduce((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }, [filteredSkills]);

  return (
    <Section id="skills" title="Skills" icon={Code}>
      {Object.keys(skillsByCategory).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-4 py-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-gray-200 font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all hover:scale-105"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No skills match your search.</p>
      )}
    </Section>
  );
};

const Experience = ({ searchTerm }) => {
  const filteredExperience = useSearchFilter(EXPERIENCE_DATA, searchTerm);

  return (
    <Section id="experience" title="Experience" icon={Work}>
      {filteredExperience.length > 0 ? (
        <div className="space-y-6">
          {filteredExperience.map((job, index) => (
            <div
              key={index}
              className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-1">
                {job.role}
              </h3>
              <p className="text-xl font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {job.company}
              </p>
              <p className="text-sm text-gray-400 mb-4">{job.period}</p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No experience matches your search.</p>
      )}
    </Section>
  );
};

const FeaturedProjects = () => (
  <Section id="featured-projects" title="Featured Projects" icon={Star}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURED_PROJECTS.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  </Section>
);

const Projects = ({ searchTerm }) => {
  const filteredProjects = useSearchFilter(PROJECTS_DATA, searchTerm);

  return (
    <Section id="projects" title="Other Projects" icon={Code}>
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/50 transition-all hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold text-gray-200 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No projects match your search.</p>
      )}
    </Section>
  );
};

const Achievements = () => (
  <Section id="achievements" title="Achievements" icon={EmojiEvents}>
    <div className="grid md:grid-cols-2 gap-6">
      {ACHIEVEMENTS.map((achievement, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-yellow-500/50 transition-all hover:scale-[1.02]"
        >
          {achievement.image ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-linear-to-br from-purple-500/20 to-pink-500/20">
              {achievement.icon}
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <EmojiEvents className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-gray-200">
                {achievement.title}
              </h3>
            </div>
            <p className="text-gray-400 mb-2 leading-relaxed">
              {achievement.description}
            </p>
            <p className="text-sm text-gray-500">{achievement.place}</p>
            <p className="text-sm text-gray-500">{achievement.date}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Education = ({ searchTerm }) => {
  const filteredEducation = useSearchFilter(EDUCATION_DATA, searchTerm);

  return (
    <Section id="education" title="Education" icon={School}>
      {filteredEducation.length > 0 ? (
        <div className="space-y-6">
          {filteredEducation.map((edu, index) => (
            <div
              key={index}
              className="p-6 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-1">
                {edu.degree}
              </h3>
              <p className="text-xl font-semibold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {edu.institution}
              </p>
              <p className="text-sm text-gray-400 mb-3">{edu.period}</p>
              <p className="text-gray-300 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          No education history matches your search.
        </p>
      )}
    </Section>
  );
};

const Contact = () => (
  <Section id="contact" title="Get In Touch" icon={ContactMail}>
    <div className="p-8 bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your vision. Feel free to reach out via
        email or connect with me on social media.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="flex-1 text-center bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-4 rounded-xl font-semibold text-lg text-white transition-all shadow-lg hover:shadow-purple-500/50 hover:scale-105"
        >
          <Email className="w-6 h-6 inline-block mr-2" />
          Email Me
        </a>
        <a
          href={PERSONAL_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-xl font-semibold text-lg text-white transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
        >
          <LinkedIn className="w-6 h-6 inline-block mr-2" />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="text-center py-12 border-t border-gray-800">
    <p className="text-gray-400">
      &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
      reserved.
    </p>
    <p className="text-gray-500 text-sm mt-2">
      Built with React, Tailwind CSS & Material UI
    </p>
  </footer>
);

// --- Navigation ---
const SECTIONS = [
  { id: "about", title: "About", icon: Person },
  { id: "skills", title: "Skills", icon: Code },
  { id: "experience", title: "Experience", icon: Work },
  { id: "featured-projects", title: "Featured", icon: Star },
  { id: "achievements", title: "Achievements", icon: EmojiEvents },
  { id: "education", title: "Education", icon: School },
  { id: "contact", title: "Contact", icon: ContactMail },
];

const SearchInput = ({ searchTerm, onSearchChange }) => (
  <div className="relative">
    <input
      type="search"
      placeholder="Search portfolio..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
    />
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
  </div>
);

const TableOfContents = ({ activeSection, searchTerm, onSearchChange }) => (
  <nav className="w-full space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Search
      </h3>
      <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Navigation
      </h3>
      <ul className="space-y-2">
        {SECTIONS.map((section) => {
          const IconComponent = section.icon;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  activeSection === section.id
                    ? "bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
);

const MobileMenu = ({
  isOpen,
  onClose,
  activeSection,
  searchTerm,
  onSearchChange,
}) => (
  <div
    className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    ></div>
    <div
      className={`absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
      >
        <Close className="w-6 h-6" />
      </button>
      <div className="mt-12">
        <TableOfContents
          activeSection={activeSection}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  </div>
);

const MobileHeader = ({ onMenuOpen }) => (
  <header className="sticky top-0 z-40 p-4 bg-gray-900/80 backdrop-blur-md shadow-lg lg:hidden border-b border-gray-800">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {PERSONAL_INFO.name}
      </h2>
      <button
        onClick={onMenuOpen}
        className="p-2 text-gray-400 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </header>
);

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Scroll-spy effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        sectionRefs.current[section.id] = el;
        observer.observe(el);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scrolling
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          setMobileMenuOpen(false);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Mobile Header */}
      <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto no-scrollbar container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 py-12 lg:py-20">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <TableOfContents
                activeSection={activeSection}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Hero />
            <About />
            <Skills searchTerm={searchTerm} />
            <Experience searchTerm={searchTerm} />
            <FeaturedProjects />
            <Achievements />
            <Projects searchTerm={searchTerm} />
            <Education searchTerm={searchTerm} />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
