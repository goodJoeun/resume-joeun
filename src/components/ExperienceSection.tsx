import type { Company, ProjectDetail, TaskItem } from '@/data/resume';
import { TechTags } from '@/components/TechTags';

type Props = {
  companies: Company[];
};

export function ExperienceSection({ companies }: Props) {
  return (
    <div className="space-y-20">
      {companies.map((company) => (
        <CompanyBlock key={company.name} company={company} />
      ))}
    </div>
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <article>
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <h3 className="text-xl font-bold">{company.name}</h3>
        <span className="text-sm text-muted">{company.period}</span>
      </div>

      {company.roles.map((role) => (
        <div key={`${role.title}-${role.period}`} className="mt-3 mb-8">
          <h4 className="text-base font-semibold text-foreground/90">{role.title}</h4>
          <p className="mt-0.5 text-sm text-muted">{role.period}</p>
        </div>
      ))}

      <div className="space-y-14">
        {company.projects.map((project) => (
          <ProjectBlock key={project.name} project={project} />
        ))}
      </div>
    </article>
  );
}

function ProjectBlock({ project }: { project: ProjectDetail }) {
  return (
    <div className="border-l-2 border-border pl-6 sm:pl-8">
      <h4 className="text-lg font-semibold">{project.name}</h4>

      {project.period && <p className="mt-1 text-sm text-muted">{project.period}</p>}

      {project.link && (
        <p className="mt-1 text-sm">
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            {project.link.label}
          </a>
        </p>
      )}

      {project.description && (
        <div className="mt-5">
          <h5 className="mb-2 text-base font-semibold text-muted">설명</h5>
          {Array.isArray(project.description) ? (
            <div className="space-y-1.5 text-sm leading-relaxed text-foreground/85">
              {project.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-foreground/85">{project.description}</p>
          )}
        </div>
      )}

      {project.roles && project.roles.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-2 text-base font-semibold text-muted">역할</h5>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
            {project.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {project.tasks.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-2 text-base font-semibold text-muted">업무</h5>
          <ul className="list-disc space-y-6 pl-5 text-sm leading-relaxed text-foreground/85">
            {project.tasks.map((task) => (
              <TaskItemBlock key={task.text} task={task} />
            ))}
          </ul>
        </div>
      )}

      {project.tech && project.tech.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-2 text-base font-semibold text-muted">사용 기술</h5>
          <TechTags items={project.tech} />
        </div>
      )}
    </div>
  );
}

function TaskItemBlock({ task }: { task: TaskItem }) {
  return (
    <li>
      <p>{task.text}</p>
      {task.tech && task.tech.length > 0 && (
        <div className="mt-2">
          <TechTags items={task.tech} />
        </div>
      )}
      {task.subItems && task.subItems.length > 0 && (
        <ul className="mt-1.5 list-[circle] space-y-1 pl-5 text-foreground/75">
          {task.subItems.map((sub) => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
