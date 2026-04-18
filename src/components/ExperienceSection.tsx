'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Company, ProjectDetail, TaskItem } from '@/data/resume';
import { TechTags } from '@/components/TechTags';

type Props = {
  companies: Company[];
};

function renderHighlightedText(text: string) {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);

  return parts.map((part, index) => {
    const isHighlighted = part.startsWith('<strong>') && part.endsWith('</strong>');

    if (!isHighlighted) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <strong
        key={`${part}-${index}`}
        className="rounded-sm bg-accent/15 px-0.5 font-semibold text-foreground"
      >
        {part.slice('<strong>'.length, -'</strong>'.length)}
      </strong>
    );
  });
}

function normalizeLegacyHighlight(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function renderSubItem(sub: string) {
  return normalizeLegacyHighlight(sub).split('\n').map((line, index, arr) => (
    <span key={`${line}-${index}`}>
      {renderHighlightedText(line)}
      {index < arr.length - 1 && '\n'}
    </span>
  ));
}

function getCardHeadline(project: ProjectDetail) {
  return project.cardTitle ?? project.name ?? '주요 업무';
}

function getCardSummary(project: ProjectDetail): string[] {
  if (project.cardSummary?.length) return project.cardSummary;
  if (Array.isArray(project.description) && project.description.length > 0) {
    return project.description.slice(0, 3);
  }
  if (typeof project.description === 'string' && project.description) {
    return [project.description];
  }
  if (project.roles?.length) {
    return project.roles.slice(0, 3);
  }
  return project.tasks.slice(0, 3).map((t) => t.text);
}

/** 카드 하단 기술 태그용 (프로젝트 tech 또는 업무 task에서 수집) */
function getCardTechs(project: ProjectDetail, max = 6): string[] {
  if (project.tech?.length) return project.tech.slice(0, max);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const task of project.tasks) {
    for (const t of task.tech ?? []) {
      if (seen.has(t)) continue;
      seen.add(t);
      out.push(t);
      if (out.length >= max) return out;
    }
  }
  return out;
}

export function ExperienceSection({ companies }: Props) {
  const [active, setActive] = useState<{ company: Company; project: ProjectDetail } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (active) {
      el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [active]);

  return (
    <>
      <div className="space-y-14 sm:space-y-16">
        {companies.map((company) => (
          <CompanyBlock
            key={company.name}
            company={company}
            onSelectProject={(project) => setActive({ company, project })}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed left-1/2 top-1/2 z-50 w-[min(100%,42rem)] max-h-[min(90vh,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/45 open:flex open:flex-col [&::backdrop]:bg-black/45"
        onClose={() => setActive(null)}
      >
        {active && (
          <div className="flex max-h-[min(90vh,52rem)] flex-col">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/70 px-5 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">업무 경력</p>
                <p id={titleId} className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {getCardHeadline(active.project)}
                </p>
                <p className="mt-1 text-sm text-muted">{active.company.name}</p>
                <p className="text-xs text-muted">{active.company.period}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full border border-border/80 px-3 py-1.5 text-sm text-muted transition-colors hover:bg-section-bg hover:text-foreground"
                onClick={() => dialogRef.current?.close()}
              >
                닫기
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <ProjectBlock project={active.project} showProjectTitle={false} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function CompanyBlock({
  company,
  onSelectProject,
}: {
  company: Company;
  onSelectProject: (project: ProjectDetail) => void;
}) {
  return (
    <article>
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{company.name}</h3>
        <span className="text-sm text-muted">{company.period}</span>
      </div>

      {company.roles.map((role) => (
        <div key={`${role.title}-${role.period}`} className="mt-2 mb-6">
          <h4 className="text-[15px] font-medium text-foreground">{role.title}</h4>
          <p className="mt-0.5 text-sm text-muted">{role.period}</p>
        </div>
      ))}

      <ul className="cards grid list-none grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 md:gap-10 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        {company.projects.map((project, projectIndex) => (
          <li
            key={`${company.name}-${project.name ?? 'project'}-${project.period ?? projectIndex}`}
            className="min-h-0 min-w-0"
          >
            <ProjectCard
              companyName={company.name}
              project={project}
              onOpen={() => onSelectProject(project)}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectCard({
  companyName,
  project,
  onOpen,
}: {
  companyName: string;
  project: ProjectDetail;
  onOpen: () => void;
}) {
  const bullets = getCardSummary(project).slice(0, 3);
  const headline = getCardHeadline(project);
  const techs = getCardTechs(project);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${companyName} ${headline} 상세 보기`}
      className="group relative flex aspect-square w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-6 lg:p-7 dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
    >
      <span className="line-clamp-2 text-left text-[15px] font-semibold leading-snug tracking-tight text-foreground group-hover:text-accent md:text-base">
        {headline}
      </span>
      {project.period && (
        <span className="mt-1.5 shrink-0 text-[11px] tabular-nums text-muted">{project.period}</span>
      )}
      <ul className="mt-3 min-h-0 flex-1 list-disc space-y-1.5 overflow-hidden pl-3.5 text-left text-[13px] leading-snug text-muted marker:text-accent/45 md:text-sm">
        {bullets.map((line, i) => (
          <li key={`${line}-${i}`} className="line-clamp-2 break-keep">
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-auto shrink-0 space-y-3 pt-3">
        {techs.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-hidden>
            {techs.map((t) => (
              <li
                key={t}
                className="rounded border border-border/70 bg-tag-bg/80 px-2 py-0.5 text-[10px] font-medium text-tag-text md:text-[11px]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        <span className="block text-sm font-medium text-accent underline-offset-4 transition-colors group-hover:text-foreground group-hover:underline">
          주요 업무 내용 보기
        </span>
      </div>
    </button>
  );
}

function sectionLabel(text: string) {
  return (
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{text}</h4>
  );
}

function ProjectBlock({
  project,
  showProjectTitle = true,
}: {
  project: ProjectDetail;
  showProjectTitle?: boolean;
}) {
  return (
    <div className="border-l-2 border-accent/35 pl-5 sm:pl-7">
      {showProjectTitle && project.name && (
        <h4 className="text-lg font-semibold tracking-tight text-foreground">{project.name}</h4>
      )}

      {project.period && <p className="mt-1 text-sm text-muted">{project.period}</p>}

      {project.link && (
        <p className="mt-1 text-sm">
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {project.link.label} →
          </a>
        </p>
      )}

      {project.description && (
        <div className="mt-6">
          {sectionLabel('설명')}
          {Array.isArray(project.description) ? (
            <div className="space-y-2 text-sm leading-relaxed text-muted">
              {project.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          )}
        </div>
      )}

      {project.roles && project.roles.length > 0 && (
        <div className="mt-6">
          {sectionLabel('역할')}
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent/50">
            {project.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {project.tasks.length > 0 && (
        <div className="mt-6">
          {sectionLabel('업무')}
          <ul className="list-disc space-y-6 pl-5 text-sm leading-relaxed text-muted marker:text-accent/50">
            {project.tasks.map((task, taskIndex) => (
              <TaskItemBlock key={`${task.text}-${taskIndex}`} task={task} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TaskItemBlock({ task }: { task: TaskItem }) {
  return (
    <li>
      <p className="break-keep text-[15px] font-medium text-foreground">{task.text}</p>
      {task.tech && task.tech.length > 0 && (
        <div className="mt-2">
          <TechTags items={task.tech} />
        </div>
      )}
      {task.subItems && task.subItems.length > 0 && (
        <ul className="mt-2 list-[circle] space-y-1.5 pl-5 break-keep text-muted">
          {task.subItems.map((sub) => (
            <li key={sub} className="whitespace-pre-line">
              {renderSubItem(sub)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
