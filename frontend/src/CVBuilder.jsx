import { useState } from "react";

const EMPTY_EXPERIENCE = () => ({ id: Date.now(), company: "", role: "", period: "", description: "" });
const EMPTY_EDUCATION = () => ({ id: Date.now(), school: "", degree: "", year: "" });
const EMPTY_PROJECT = () => ({ id: Date.now(), name: "", tech: "", description: "" });

const TEMPLATES = {
    blank: {
        name: "", title: "", email: "", phone: "", location: "", linkedin: "", github: "", website: "",
        summary: "", skills: [], experience: [EMPTY_EXPERIENCE()], education: [EMPTY_EDUCATION()], projects: [EMPTY_PROJECT()],
    },
    developer: {
        name: "Alex Johnson", title: "Full-Stack Developer", email: "alex@example.com",
        phone: "+1 (555) 000-1234", location: "San Francisco, CA", linkedin: "linkedin.com/in/alexj",
        github: "github.com/alexj", website: "alexj.dev",
        summary: "Full-stack developer with 3+ years of experience building scalable web applications using React, Node.js and cloud platforms. Passionate about clean code, DevOps practices and AI-powered tooling.",
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "Git", "REST APIs"],
        experience: [
            { id: 1, company: "TechCorp Inc.", role: "Senior Frontend Developer", period: "2022 – Present", description: "Led a team of 4 engineers to rebuild the company's dashboard in React, reducing load time by 60%. Implemented CI/CD pipelines with GitHub Actions." },
            { id: 2, company: "StartupXYZ", role: "Full-Stack Developer", period: "2020 – 2022", description: "Built RESTful APIs with Express.js and designed PostgreSQL schemas. Deployed microservices on AWS ECS." },
        ],
        education: [
            { id: 1, school: "University of California, Berkeley", degree: "B.Sc. Computer Science", year: "2020" },
        ],
        projects: [
            { id: 1, name: "AI Deployment Coach", tech: "React · Node.js · Express", description: "A web app that analyzes your tech stack and provides instant deployment strategy recommendations." },
        ],
    },
};

function Section({ title, icon, children }) {
    return (
        <div className="cv-section-block">
            <div className="cv-section-title">
                <span>{icon}</span> {title}
            </div>
            {children}
        </div>
    );
}

function EntryCard({ children, onRemove, canRemove }) {
    return (
        <div className="cv-entry-card">
            {children}
            {canRemove && (
                <button className="btn-remove-entry" onClick={onRemove} title="Remove">✕</button>
            )}
        </div>
    );
}

function FormField({ label, value, onChange, placeholder, type = "text", half }) {
    return (
        <div className={`cv-field${half ? " cv-field-half" : ""}`}>
            <label className="cv-label">{label}</label>
            <input
                type={type}
                className="cv-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

function SkillTag({ skill, onRemove }) {
    return (
        <div className="skill-tag-item">
            {skill}
            <button className="skill-tag-remove" onClick={onRemove}>×</button>
        </div>
    );
}

// ─── Live CV Preview ────────────────────────────────────────────────────────
function CVPreview({ data }) {
    const hasContent = data.name || data.title;
    if (!hasContent) {
        return (
            <div className="cv-preview-empty">
                <div className="cv-preview-empty-icon">📄</div>
                <p>Start filling in the form to see your CV preview here</p>
            </div>
        );
    }

    return (
        <div className="cv-preview-doc" id="cv-preview-doc">
            {/* Header */}
            <div className="cvp-header">
                {data.name && <h1 className="cvp-name">{data.name}</h1>}
                {data.title && <div className="cvp-title">{data.title}</div>}
                <div className="cvp-contacts">
                    {data.email && <span>✉ {data.email}</span>}
                    {data.phone && <span>📞 {data.phone}</span>}
                    {data.location && <span>📍 {data.location}</span>}
                    {data.linkedin && <span>🔗 {data.linkedin}</span>}
                    {data.github && <span>⌨ {data.github}</span>}
                    {data.website && <span>🌐 {data.website}</span>}
                </div>
            </div>

            {/* Summary */}
            {data.summary && (
                <div className="cvp-block">
                    <div className="cvp-section-title">Professional Summary</div>
                    <p className="cvp-text">{data.summary}</p>
                </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <div className="cvp-block">
                    <div className="cvp-section-title">Skills</div>
                    <div className="cvp-skills">
                        {data.skills.map((s, i) => <span key={i} className="cvp-skill">{s}</span>)}
                    </div>
                </div>
            )}

            {/* Experience */}
            {data.experience.some(e => e.company || e.role) && (
                <div className="cvp-block">
                    <div className="cvp-section-title">Work Experience</div>
                    {data.experience.filter(e => e.company || e.role).map((exp) => (
                        <div key={exp.id} className="cvp-entry">
                            <div className="cvp-entry-header">
                                <div>
                                    {exp.role && <div className="cvp-entry-role">{exp.role}</div>}
                                    {exp.company && <div className="cvp-entry-company">{exp.company}</div>}
                                </div>
                                {exp.period && <div className="cvp-entry-period">{exp.period}</div>}
                            </div>
                            {exp.description && <p className="cvp-text">{exp.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {data.education.some(e => e.school || e.degree) && (
                <div className="cvp-block">
                    <div className="cvp-section-title">Education</div>
                    {data.education.filter(e => e.school || e.degree).map((edu) => (
                        <div key={edu.id} className="cvp-entry">
                            <div className="cvp-entry-header">
                                <div>
                                    {edu.degree && <div className="cvp-entry-role">{edu.degree}</div>}
                                    {edu.school && <div className="cvp-entry-company">{edu.school}</div>}
                                </div>
                                {edu.year && <div className="cvp-entry-period">{edu.year}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {data.projects.some(p => p.name) && (
                <div className="cvp-block">
                    <div className="cvp-section-title">Projects</div>
                    {data.projects.filter(p => p.name).map((proj) => (
                        <div key={proj.id} className="cvp-entry">
                            <div className="cvp-entry-header">
                                <div className="cvp-entry-role">{proj.name}</div>
                                {proj.tech && <div className="cvp-entry-period" style={{ fontSize: "10px" }}>{proj.tech}</div>}
                            </div>
                            {proj.description && <p className="cvp-text">{proj.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main CV Builder Component ───────────────────────────────────────────────
export default function CVBuilder() {
    const [data, setData] = useState(TEMPLATES.blank);
    const [skillInput, setSkillInput] = useState("");
    const [activeTemplate, setActiveTemplate] = useState("blank");

    const update = (field, value) => setData(d => ({ ...d, [field]: value }));

    // Experience
    const updateExp = (id, field, val) =>
        setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, [field]: val } : e) }));
    const addExp = () => setData(d => ({ ...d, experience: [...d.experience, EMPTY_EXPERIENCE()] }));
    const removeExp = (id) => setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) }));

    // Education
    const updateEdu = (id, field, val) =>
        setData(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [field]: val } : e) }));
    const addEdu = () => setData(d => ({ ...d, education: [...d.education, EMPTY_EDUCATION()] }));
    const removeEdu = (id) => setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) }));

    // Projects
    const updateProj = (id, field, val) =>
        setData(d => ({ ...d, projects: d.projects.map(p => p.id === id ? { ...p, [field]: val } : p) }));
    const addProj = () => setData(d => ({ ...d, projects: [...d.projects, EMPTY_PROJECT()] }));
    const removeProj = (id) => setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id) }));

    // Skills
    const addSkill = (e) => {
        if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
            e.preventDefault();
            if (!data.skills.includes(skillInput.trim())) {
                setData(d => ({ ...d, skills: [...d.skills, skillInput.trim()] }));
            }
            setSkillInput("");
        }
    };
    const removeSkill = (s) => setData(d => ({ ...d, skills: d.skills.filter(sk => sk !== s) }));

    const loadTemplate = (key) => {
        setActiveTemplate(key);
        setData({ ...TEMPLATES[key] });
    };

    const handlePrint = () => window.print();

    const handleReset = () => {
        if (window.confirm("Reset all CV data?")) {
            setData(TEMPLATES.blank);
            setActiveTemplate("blank");
        }
    };

    return (
        <div className="cv-builder">
            {/* CV Builder Header */}
            <div className="cv-builder-header">
                <div>
                    <h2 className="cv-builder-title">📄 CV Builder</h2>
                    <p className="cv-builder-sub">Fill in the form · see preview · download as PDF</p>
                </div>
                <div className="cv-builder-actions">
                    <div className="cv-template-row">
                        <span className="cv-template-label">Template:</span>
                        {Object.keys(TEMPLATES).map(k => (
                            <button
                                key={k}
                                className={`chip${activeTemplate === k ? " chip-active" : ""}`}
                                onClick={() => loadTemplate(k)}
                            >
                                {k === "blank" ? "✨ Blank" : "👨‍💻 Developer"}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn-cv-reset" onClick={handleReset}>🗑 Reset</button>
                        <button className="btn-cv-download" id="cv-download-btn" onClick={handlePrint}>
                            ⬇ Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Split Panel */}
            <div className="cv-split">
                {/* ── LEFT: Form ── */}
                <div className="cv-form-panel">

                    <Section title="Personal Info" icon="👤">
                        <div className="cv-fields-grid">
                            <FormField label="Full Name" value={data.name} onChange={v => update("name", v)} placeholder="e.g. Jane Doe" half />
                            <FormField label="Job Title" value={data.title} onChange={v => update("title", v)} placeholder="e.g. Software Engineer" half />
                            <FormField label="Email" value={data.email} onChange={v => update("email", v)} placeholder="jane@email.com" half />
                            <FormField label="Phone" value={data.phone} onChange={v => update("phone", v)} placeholder="+1 555 000 0000" half />
                            <FormField label="Location" value={data.location} onChange={v => update("location", v)} placeholder="City, Country" half />
                            <FormField label="Website" value={data.website} onChange={v => update("website", v)} placeholder="yoursite.com" half />
                            <FormField label="LinkedIn" value={data.linkedin} onChange={v => update("linkedin", v)} placeholder="linkedin.com/in/..." half />
                            <FormField label="GitHub" value={data.github} onChange={v => update("github", v)} placeholder="github.com/..." half />
                        </div>
                    </Section>

                    <Section title="Professional Summary" icon="📝">
                        <textarea
                            className="cv-textarea"
                            rows={4}
                            placeholder="A short paragraph about who you are and what you bring to the table..."
                            value={data.summary}
                            onChange={(e) => update("summary", e.target.value)}
                        />
                    </Section>

                    <Section title="Skills" icon="🛠">
                        <div className="cv-skills-input-row">
                            <input
                                className="cv-input"
                                placeholder="Type a skill and press Enter or comma..."
                                value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={addSkill}
                            />
                        </div>
                        <div className="skill-tags-row">
                            {data.skills.map(s => <SkillTag key={s} skill={s} onRemove={() => removeSkill(s)} />)}
                            {data.skills.length === 0 && <span className="cv-hint">No skills added yet</span>}
                        </div>
                    </Section>

                    <Section title="Work Experience" icon="💼">
                        {data.experience.map((exp) => (
                            <EntryCard key={exp.id} canRemove={data.experience.length > 1} onRemove={() => removeExp(exp.id)}>
                                <div className="cv-fields-grid">
                                    <FormField label="Company" value={exp.company} onChange={v => updateExp(exp.id, "company", v)} placeholder="Company Name" half />
                                    <FormField label="Job Title" value={exp.role} onChange={v => updateExp(exp.id, "role", v)} placeholder="Your Role" half />
                                    <FormField label="Period" value={exp.period} onChange={v => updateExp(exp.id, "period", v)} placeholder="2022 – Present" half />
                                </div>
                                <div className="cv-field">
                                    <label className="cv-label">Description</label>
                                    <textarea
                                        className="cv-textarea"
                                        rows={3}
                                        placeholder="Key achievements and responsibilities..."
                                        value={exp.description}
                                        onChange={(e) => updateExp(exp.id, "description", e.target.value)}
                                    />
                                </div>
                            </EntryCard>
                        ))}
                        <button className="btn-add-entry" onClick={addExp}>+ Add Experience</button>
                    </Section>

                    <Section title="Education" icon="🎓">
                        {data.education.map((edu) => (
                            <EntryCard key={edu.id} canRemove={data.education.length > 1} onRemove={() => removeEdu(edu.id)}>
                                <div className="cv-fields-grid">
                                    <FormField label="School / University" value={edu.school} onChange={v => updateEdu(edu.id, "school", v)} placeholder="University Name" half />
                                    <FormField label="Degree / Major" value={edu.degree} onChange={v => updateEdu(edu.id, "degree", v)} placeholder="B.Sc. Computer Science" half />
                                    <FormField label="Graduation Year" value={edu.year} onChange={v => updateEdu(edu.id, "year", v)} placeholder="2024" half />
                                </div>
                            </EntryCard>
                        ))}
                        <button className="btn-add-entry" onClick={addEdu}>+ Add Education</button>
                    </Section>

                    <Section title="Projects" icon="🚀">
                        {data.projects.map((proj) => (
                            <EntryCard key={proj.id} canRemove={data.projects.length > 1} onRemove={() => removeProj(proj.id)}>
                                <div className="cv-fields-grid">
                                    <FormField label="Project Name" value={proj.name} onChange={v => updateProj(proj.id, "name", v)} placeholder="My Awesome App" half />
                                    <FormField label="Technologies" value={proj.tech} onChange={v => updateProj(proj.id, "tech", v)} placeholder="React · Node.js · MongoDB" half />
                                </div>
                                <div className="cv-field">
                                    <label className="cv-label">Description</label>
                                    <textarea
                                        className="cv-textarea"
                                        rows={2}
                                        placeholder="What does it do? What was your impact?"
                                        value={proj.description}
                                        onChange={(e) => updateProj(proj.id, "description", e.target.value)}
                                    />
                                </div>
                            </EntryCard>
                        ))}
                        <button className="btn-add-entry" onClick={addProj}>+ Add Project</button>
                    </Section>
                </div>

                {/* ── RIGHT: Preview ── */}
                <div className="cv-preview-panel">
                    <div className="cv-preview-sticky">
                        <div className="cv-preview-label">Live Preview</div>
                        <CVPreview data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
