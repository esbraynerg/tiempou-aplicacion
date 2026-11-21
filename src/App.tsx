import { useState, useEffect, useRef, type FormEvent, type ReactNode } from "react";

type SectionId =
  | "inicio"
  | "actividades"
  | "materias"
  | "planificacion"
  | "disponibilidad"
  | "notificaciones"
  | "perfil";

type IconName =
  | SectionId
  | "plus"
  | "arrow-left"
  | "arrow-right"
  | "clock"
  | "calendar"
  | "book"
  | "check"
  | "more"
  | "close"
  | "trash"
  | "edit"
  | "chevron-down"
  | "sun"
  | "moon";

const navItems: { id: SectionId; label: string; icon: IconName }[] = [
  { id: "inicio", label: "Inicio", icon: "inicio" },
  { id: "actividades", label: "Actividades", icon: "actividades" },
  { id: "materias", label: "Materias", icon: "materias" },
  { id: "planificacion", label: "Planificación", icon: "planificacion" },
  { id: "disponibilidad", label: "Disponibilidad", icon: "disponibilidad" },
  { id: "notificaciones", label: "Notificaciones", icon: "notificaciones" },
  { id: "perfil", label: "Perfil", icon: "perfil" },
];

const mobileItems = navItems.slice(0, 4);
const moreItems = navItems.slice(4);

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, ReactNode> = {
    inicio: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5.5 9.5V21h13V9.5M9 21v-6h6v6" />
      </>
    ),
    actividades: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="m8 9 1.4 1.4L12 7.8M14 9h2.5M8 15h8.5" />
      </>
    ),
    materias: (
      <>
        <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12v16H7a2.5 2.5 0 0 0-2.5 2.5z" />
        <path d="M4.5 5.5v16M8.5 7H15" />
      </>
    ),
    planificacion: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
      </>
    ),
    disponibilidad: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2M18.4 5.6l1.2-1.2" />
      </>
    ),
    notificaciones: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    perfil: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    "arrow-right": <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    book: (
      <>
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22zM20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22z" />
      </>
    ),
    check: <path d="m5 12.5 4.2 4L19 7" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6.5 7l1 14h9l1-14M10 11v6M14 11v6" />
      </>
    ),
    edit: (
      <>
        <path d="m14.5 5.5 4 4L9 19H5v-4zM13 7l4 4" />
      </>
    ),
    "chevron-down": <path d="m7 10 5 5 5-5" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    moon: <path d="M20 15.4A8 8 0 0 1 8.6 4 8 8 0 1 0 20 15.4Z" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function PrimaryButton({
  children,
  icon,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className="btn btn-primary" onClick={onClick}>
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      {children}
    </button>
  );
}

function IconButton({
  icon,
  label,
  danger = false,
  onClick,
}: {
  icon: IconName;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`icon-button ${danger ? "icon-button-danger" : ""}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon name={icon} size={17} />
    </button>
  );
}

function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "blue" | "red" | "amber" | "green" | "neutral";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action && <div className="page-action">{action}</div>}
    </header>
  );
}

type GradingMode = "points" | "average";
type SubjectStatus = "active" | "completed";

type Subject = {
  id: string;
  name: string;
  gradingMode: GradingMode;
  maxGrade: number;
  passingGrade: number;
  status: SubjectStatus;
  color: string;
};

type Activity = {
  id: string;
  title: string;
  subjectId: string;

  // Fecha y hora límite de entrega
  dueDate: string;
  dueTime: string;

  // Valor académico de la actividad
  weight: number;

  // Identifica si la actividad otorga puntos extra
  isExtraCredit: boolean;

  // Esfuerzo estimado en horas
  effortHours: number;

  // Número de sesiones elegidas (null = automático)
  sessionCount: number | null;
  
  // Datos de presentación
  color: string;

  // Estado de la actividad
  result: "pending" | "submitted" | "graded" | "not-submitted";

  // Calificación obtenida
  grade?: number;
};

type ActivityFormValues = {
  title: string;
  subjectId: string;
  dueDate: string;
  dueTime: string;
  weight: number;
  isExtraCredit: boolean
  effortHours: number;
  sessionCount: number | null;
};

//Intervalos

type AvailabilityInterval = {
  id: string;
  day: number;
  start: string;
  end: string;
};

type StudySession = {
  id: string;
  activityId: string;
  subjectId: string;
  date: string;
  time: string;
  detail: string;
  className: string;
};

//Implementar Urgencia (U)

function calculateUrgency(dueDate: string, dueTime: string): number {
  const now = new Date();
  const deadline = new Date(`${dueDate}T${dueTime}:00`);

  const remainingHours =
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

  // Una actividad vencida sigue siendo urgente.
  if (remainingHours <= 24) return 100;
  if (remainingHours <= 72) return 80;
  if (remainingHours <= 168) return 60;
  if (remainingHours <= 336) return 35;

  return 15;
}

//Implementar Peso Academico (P)

function calculateAcademicWeight(
  activity: Activity,
  subject: Subject,
  activities: Activity[],
): number {
  if (subject.gradingMode === "points") {
    if (subject.maxGrade <= 0) return 0;

    return Math.min(
      (activity.weight / subject.maxGrade) * 100,
      100,
    );
  }

  const totalWeight = activities
    .filter((item) => item.subjectId === subject.id)
    .reduce((total, item) => total + item.weight, 0);

  if (totalWeight <= 0) return 0;

  return Math.min(
    (activity.weight / totalWeight) * 100,
    100,
  );
}

//Implementar PResion del Esfuerzo (R)

function calculateEffortPressure(
  effortHours: number,
  availableHours: number,
): number {
  if (availableHours <= 0) return 100;

  return Math.min(
    (effortHours / availableHours) * 100,
    100,
  );
}

//Calcular horas disponibles

function calculateAvailableHours(
  activity: Activity,
  availability: AvailabilityInterval[],
): number {
  const now = new Date();
  const deadline = new Date(
    `${activity.dueDate}T${activity.dueTime}:00`,
  );

  if (deadline <= now) return 0;

  let totalHours = 0;
  const currentDay = new Date(now);
  currentDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(deadline);
  lastDay.setHours(0, 0, 0, 0);

  while (currentDay <= lastDay) {
    const day = currentDay.getDay();

    availability
      .filter((interval) => interval.day === day)
      .forEach((interval) => {
        const [startHour, startMinute] = interval.start
          .split(":")
          .map(Number);

        const [endHour, endMinute] = interval.end
          .split(":")
          .map(Number);

        const intervalStart = new Date(currentDay);
        intervalStart.setHours(startHour, startMinute, 0, 0);

        const intervalEnd = new Date(currentDay);
        intervalEnd.setHours(endHour, endMinute, 0, 0);

        const effectiveStart = new Date(
          Math.max(intervalStart.getTime(), now.getTime()),
        );

        const effectiveEnd = new Date(
          Math.min(intervalEnd.getTime(), deadline.getTime()),
        );

        if (effectiveEnd > effectiveStart) {
          totalHours +=
            (effectiveEnd.getTime() - effectiveStart.getTime()) /
            (1000 * 60 * 60);
        }
      });

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return totalHours;
}

//Construir sesiones de una actividad

type SessionPlan = {
  sessions: StudySession[];
  plannedHours: number;
};

function generateActivitySessions(
  activity: Activity,
  availability: AvailabilityInterval[],
  blockedSessions: StudySession[],
): SessionPlan {
  const now = new Date();
  const deadline = new Date(
    `${activity.dueDate}T${activity.dueTime}:00`,
  );

  if (deadline <= now || activity.effortHours <= 0) {
    return { sessions: [], plannedHours: 0 };
  }

  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const toTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      remainingMinutes,
    ).padStart(2, "0")}`;
  };

  const toDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const manualCount = activity.sessionCount;
  const isManual = manualCount !== null && manualCount > 0;
  const daySlots: {
    date: string;
    start: number;
    capacity: number;
  }[] = [];

  const currentDay = new Date(now);
  currentDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(deadline);
  lastDay.setHours(0, 0, 0, 0);

  while (currentDay <= lastDay) {
    const dateString = toDateString(currentDay);
    const dayOfWeek = currentDay.getDay();

    const dayAvailability = availability.filter(
      (interval) => interval.day === dayOfWeek,
    );

    const dayBlockedSessions = blockedSessions
      .filter((session) => session.date === dateString)
      .map((session) => {
        const [start, end] = session.time
          .split("–")
          .map((value) => toMinutes(value.trim()));

        return { start, end };
      })
      .sort((a, b) => a.start - b.start);

    const freeSegments: { start: number; end: number }[] = [];

    dayAvailability.forEach((interval) => {
      const start = Math.max(
        toMinutes(interval.start),
        currentDay.getTime() ===
          new Date(now).setHours(0, 0, 0, 0)
          ? now.getHours() * 60 + now.getMinutes()
          : 0,
      );

      const end = Math.min(
        toMinutes(interval.end),
        currentDay.getTime() === lastDay.getTime()
          ? toMinutes(activity.dueTime)
          : 24 * 60,
      );

      let cursor = start;

      dayBlockedSessions.forEach((blocked) => {
        if (blocked.end <= cursor || blocked.start >= end) {
          return;
        }

        if (blocked.start > cursor) {
          freeSegments.push({
            start: cursor,
            end: Math.min(blocked.start, end),
          });
        }

        cursor = Math.max(cursor, blocked.end);
      });

      if (cursor < end) {
        freeSegments.push({ start: cursor, end });
      }
    });

    const bestSegment = freeSegments
      .filter((segment) => segment.end > segment.start)
      .sort((a, b) => b.end - b.start)[0];

    if (bestSegment) {
      daySlots.push({
        date: dateString,
        start: bestSegment.start,
        capacity: bestSegment.end - bestSegment.start,
      });
    }

    currentDay.setDate(currentDay.getDate() + 1);
  }

  const selectedSlots = isManual
    ? daySlots.slice(0, manualCount)
    : daySlots;

  let remainingMinutes = activity.effortHours * 60;
  let plannedHours = 0;

  const sessions: StudySession[] = [];

  selectedSlots.forEach((slot) => {
    if (remainingMinutes <= 0) return;

    const remainingSlots = selectedSlots.length - sessions.length;

    const desiredDuration = isManual
      ? Math.ceil(remainingMinutes / remainingSlots)
      : 60;

    const duration = Math.min(
      desiredDuration,
      slot.capacity,
      remainingMinutes,
    );

    if (duration <= 0) return;

    const end = slot.start + duration;

    sessions.push({
      id: `session-${activity.id}-${slot.date}`,
      activityId: activity.id,
      subjectId: activity.subjectId,
      date: slot.date,
      time: `${toTime(slot.start)} – ${toTime(end)}`,
      detail: activity.title,
      className: `block-${["one", "two", "three"][sessions.length % 3]}`,
    });

    remainingMinutes -= duration;
    plannedHours += duration / 60;
  });

  return { sessions, plannedHours };
}

//Implementar formula general IPA

function calculateIPA(
  activity: Activity,
  subject: Subject,
  activities: Activity[],
  availability: AvailabilityInterval[],
): number {
  const urgency = calculateUrgency(
    activity.dueDate,
    activity.dueTime,
  );

  const academicWeight = calculateAcademicWeight(
    activity,
    subject,
    activities,
  );

  const availableHours = calculateAvailableHours(
    activity,
    availability,
  );

  const effortPressure = calculateEffortPressure(
    activity.effortHours,
    availableHours,
  );

  const ipa =
    0.35 * urgency +
    0.20 * academicWeight +
    0.45 * effortPressure;

  return Math.min(Math.max(ipa, 0), 100);
}

//Ordenamiento

function sortActivitiesByPriority(
  activities: Activity[],
  subjects: Subject[],
  availability: AvailabilityInterval[],
): Activity[] {
  const sortedActivities = activities.map((activity, index) => {
    const subject = subjects.find(
      (item) => item.id === activity.subjectId,
    );

    const deadline = new Date(
      `${activity.dueDate}T${activity.dueTime}:00`,
    ).getTime();

    const ipa = subject
  ? calculateIPA(activity, subject, activities, availability)
  : 0;

    return {
      activity,
      originalIndex: index,
      deadline,
      ipa,
    };
  });

  // Primero se ordenan por fecha, hora y orden de registro
  sortedActivities.sort(
    (a, b) =>
      a.deadline - b.deadline ||
      a.originalIndex - b.originalIndex,
  );

  // Se forman grupos protegidos por urgencia
  const groups: typeof sortedActivities[] = [];

  for (const item of sortedActivities) {
    const currentGroup = groups[groups.length - 1];

    if (!currentGroup) {
      groups.push([item]);
      continue;
    }

    const previousItem = currentGroup[currentGroup.length - 1];

    const differenceInDays =
      (item.deadline - previousItem.deadline) /
      (1000 * 60 * 60 * 24);

    if (differenceInDays < 3) {
      currentGroup.push(item);
    } else {
      groups.push([item]);
    }
  }

  // Se calcula el IPA promedio de cada grupo
  const groupsWithAverage = groups.map((group) => ({
    activities: group,
    averageIPA:
      group.reduce((total, item) => total + item.ipa, 0) /
      group.length,
    firstDeadline: group[0].deadline,
    firstIndex: group[0].originalIndex,
  }));

  // Los grupos con mayor IPA promedio aparecen primero
  groupsWithAverage.sort(
    (a, b) =>
      b.averageIPA - a.averageIPA ||
      a.firstDeadline - b.firstDeadline ||
      a.firstIndex - b.firstIndex,
  );

  // Se conserva el orden cronológico dentro de cada grupo
  return groupsWithAverage.flatMap((group) =>
    group.activities.map((item) => item.activity),
  );
}

//Mostrar IPA en tarjetas

function getActivityIPA(
  activity: Activity,
  activities: Activity[],
  subjects: Subject[],
  availability: AvailabilityInterval[],
): number {
  const subject = subjects.find(
    (item) => item.id === activity.subjectId,
  );

  if (!subject) return 0;

  return calculateIPA(
    activity,
    subject,
    activities,
    availability,
  );
}

const initialSubjects: Subject[] = [
  {
    id: "calculo-ii",
    name: "Cálculo II",
    gradingMode: "points",
    maxGrade: 100,
    passingGrade: 60,
    status: "active",
    color: "#3478f6",
  },
  {
    id: "metodologia",
    name: "Metodología de la investigación",
    gradingMode: "average",
    maxGrade: 10,
    passingGrade: 6,
    status: "active",
    color: "#7967d8",
  },
  {
    id: "fundamentos",
    name: "Fundamentos de programación",
    gradingMode: "average",
    maxGrade: 10,
    passingGrade: 6,
    status: "active",
    color: "#20a27a",
  },
  {
    id: "estadistica",
    name: "Estadística aplicada",
    gradingMode: "points",
    maxGrade: 100,
    passingGrade: 60,
    status: "active",
    color: "#d4772c",
  },
  {
    id: "bases-datos",
    name: "Bases de datos",
    gradingMode: "average",
    maxGrade: 10,
    passingGrade: 6,
    status: "completed",
    color: "#48647f",
  },
];

const initialActivities: Activity[] = [
  {
    id: "ensayo-investigacion",
    title: "Entregar ensayo de investigación",
    subjectId: "metodologia",
    dueDate: "2026-11-30",
    dueTime: "23:59",
    weight: 3,
    isExtraCredit: false,
    color: "#ef6b62",
    effortHours: 2.5,
    sessionCount: null,
    result: "pending",
  },
  {
    id: "ejercicios-capitulo-4",
    title: "Resolver ejercicios del capítulo 4",
    subjectId: "calculo-ii",
    dueDate: "2026-11-26",
    dueTime: "18:00",
    weight: 20,
    isExtraCredit: false,
    color: "#f1a33c",
    effortHours: 1.25,
    sessionCount: null,
    result: "pending",
  },
  {
    id: "lectura-seminario",
    title: "Preparar lectura para seminario",
    subjectId: "fundamentos",
    dueDate: "2026-11-23",
    dueTime: "10:00",
    weight: 2,
    isExtraCredit: false,
    color: "#4b8ff7",
    effortHours: 0.75,
    sessionCount: null,
    result: "pending",
  },
  {
    id: "examen-intro",
    title: "Examen final",
    subjectId: "bases-datos",
    dueDate: "2026-11-10",
    dueTime: "23:59",
    weight: 4,
    isExtraCredit: false,
    color: "#48647f",
    effortHours: 2,
    result: "graded",
    sessionCount: null,
    grade: 8.5,
  },
];

function gradingModeLabel(mode: GradingMode) {
  return mode === "points" ? "Puntos acumulados" : "Promedio simple";
}

function activityHasFinalResult(activity: Activity) {
  if (activity.result === "graded") {
    return typeof activity.grade === "number";
  }

  if (activity.result === "not-submitted") {
    return true;
  }

  return false;
}

function ActivityCard({
  activity,
  subjectName,
  onEdit,
  onDelete,
  onChangeResult,
  onSaveGrade,
  onOpenDetails,
  subjectMaxGrade,
  sessionCount,
  ipa,
  compact = false,
  highlighted = false,
}: {
  activity: Activity;
  subjectName: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeResult?: (result: Activity["result"]) => void;
  onSaveGrade?: (grade: number) => void;
  onOpenDetails?: () => void;
  subjectMaxGrade: number;
  sessionCount: number;
  ipa: number;
  compact?: boolean;
  highlighted?: boolean;
}) {
  const tone = "blue";
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [gradeInput, setGradeInput] = useState("");

  const statusSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusSelectorRef.current &&
        !statusSelectorRef.current.contains(event.target as Node)
      ) {
        setShowStatusOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <article
    className={`activity-card ${compact ? "activity-card-compact" : ""} ${highlighted ? "activity-card-highlighted" : ""}`}
    >
      <div className="activity-priority-index">
        <span style={{ background: activity.color }} />
        {activity.result === "pending"
          ? "Pendiente"
          : activity.result === "submitted"
            ? "Entregada"
            : activity.result === "graded"
              ? "Calificada"
              : "No entregada"}
      </div>

      <div
      className="activity-content"
      onClick={onOpenDetails}
      style={{ cursor: onOpenDetails ? "pointer" : "default" }}
      >
        <div className="activity-title-row">
          <h3>{activity.title}</h3>
        </div>

        <div className="activity-meta">
          <span>
            <span className="meta-label">Materia</span>
            {subjectName}
          </span>
          <span>
            <span className="meta-label">Entrega</span>
            {`${activity.dueDate} ${activity.dueTime}`}
          </span>
          <span>
            <span className="meta-label">Esfuerzo</span>
            {activity.effortHours} h
          </span>
          <span>
            <span className="meta-label">Prioridad (IPA)</span>
            {ipa.toFixed(1)} / 100
          </span>
          <span>
            <span className="meta-label">Sesiones</span>
            {sessionCount} {sessionCount === 1 ? "sesión" : "sesiones"}
          </span>
        </div>
      </div>

      {activity.result === "pending" ? (
        <div className="status-selector" ref={statusSelectorRef}>
          <div onClick={() => setShowStatusOptions((current) => !current)}>
            <StatusBadge tone={tone}>
              Pendiente {showStatusOptions ? "▲" : "▼"}
            </StatusBadge>
          </div>

          {showStatusOptions && (
            <div className="status-options">
              <button
                type="button"
                onClick={() => {
                  onChangeResult?.("submitted");
                  setShowStatusOptions(false);
                }}
              >
                Entregada
              </button>

              <button
                type="button"
                onClick={() => {
                  onChangeResult?.("not-submitted");
                  setShowStatusOptions(false);
                }}
              >
                No entregada
              </button>
            </div>
          )}
        </div>
      ) : (
        <StatusBadge tone={tone}>
          {activity.result === "submitted"
            ? "Entregada"
            : activity.result === "graded"
              ? "Calificada"
              : "No entregada"}
        </StatusBadge>
      )}

      {!compact && activity.result === "submitted" && (
        <div className="grade-entry">
          <p>Pendiente de calificación</p>
          <input
            type="number"
            min={0}
            max={subjectMaxGrade}
            step={0.1}
            value={gradeInput}
            onChange={(event) => setGradeInput(event.target.value)}
            placeholder={`Nota (máximo ${subjectMaxGrade})`}
          />
          <button
            type="button"
            onClick={() => {
              const grade = Number(gradeInput);

              if (
                gradeInput.trim() !== "" &&
                Number.isFinite(grade) &&
                grade >= 0 &&
                grade <= subjectMaxGrade
              ) {
                onSaveGrade?.(grade);
                setGradeInput("");
              }
            }}
          >
            Guardar nota
          </button>
        </div>
      )}

      {!compact && activity.result === "graded" && (
        <div className="grade-entry">
          <p>Nota obtenida: {activity.grade}</p>
        </div>
      )}

      {!compact && activity.result === "not-submitted" && (
        <div className="grade-entry">
          <p>Nota obtenida: 0</p>
        </div>
      )}

      {!compact && (
        <div className="card-actions">
          <IconButton
            icon="edit"
            label="Editar actividad"
            onClick={onEdit ?? (() => {})}
          />

          {activity.result !== "pending" && (
            <IconButton
              icon="check"
              label="Reactivar actividad"
              onClick={() => onChangeResult?.("pending")}
            />
          )}

          <IconButton
            icon="trash"
            label="Eliminar actividad"
            danger
            onClick={onDelete ?? (() => {})}
          />
        </div>
      )}
    </article>
  );
}

//Detalle actividades

function ActivityDetailModal({
  activity,
  subject,
  onClose,
}: {
  activity: Activity;
  subject: Subject | undefined;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="eyebrow">Detalle de actividad</span>
            <h2>{activity.title}</h2>
          </div>

          <IconButton
            icon="close"
            label="Cerrar detalle"
            onClick={onClose}
          />
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label>Materia</label>
            <p>{subject?.name ?? "Materia no disponible"}</p>
          </div>

          <div className="form-field">
            <label>Fecha de entrega</label>
            <p>{activity.dueDate} · {activity.dueTime}</p>
          </div>

          <div className="form-field">
            <label>Valor académico</label>
            <p>{activity.weight}</p>
          </div>

          <div className="form-field">
            <label>Esfuerzo estimado</label>
            <p>{activity.effortHours} horas</p>
          </div>

          <div className="form-field">
            <label>Estado</label>
            <p>
              {activity.result === "pending"
                ? "Pendiente"
                : activity.result === "submitted"
                  ? "Entregada · Pendiente de calificación"
                  : activity.result === "graded"
                    ? "Calificada"
                    : "No entregada"}
            </p>
          </div>

          {activity.result === "graded" && (
            <div className="form-field">
              <label>Calificación</label>
              <p>{activity.grade}</p>
            </div>
          )}

          {activity.result === "not-submitted" && (
            <div className="form-field">
              <label>Calificación</label>
              <p>0</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </section>
    </div>
  );
}

function SubjectCard({
  subject,
  activities,
  onOpen,
  onEdit,
  onFinalize,
  onReactivate,
  onDelete,
}: {
  subject: Subject;
  activities: Activity[];
  onOpen: () => void;
  onEdit?: () => void;
  onFinalize?: () => void;
  onReactivate?: () => void;
  onDelete: () => void;
}) {
  const incomplete = activities.filter((activity) => !activityHasFinalResult(activity)).length;

const resolved = activities.filter(activityHasFinalResult);

const graded = activities.filter(
  (activity): activity is Activity & { grade: number } =>
    typeof activity.grade === "number" && !activity.isExtraCredit,
);

const extraCreditGraded = activities.filter(
  (activity): activity is Activity & { grade: number } =>
    typeof activity.grade === "number" && activity.isExtraCredit,
);

const extraCreditPoints = extraCreditGraded.reduce(
  (sum, activity) => sum + activity.grade,
  0,
);

const ordinaryResult =
  subject.gradingMode === "points"
    ? graded.reduce((sum, activity) => sum + activity.grade, 0)
    : graded.length
      ? graded.reduce((sum, activity) => sum + activity.grade, 0) / graded.length
      : 0;

const total = activities.length;

const currentResult =
  subject.gradingMode === "points"
    ? ordinaryResult + extraCreditPoints
    : ordinaryResult;

const progress =
  subject.maxGrade > 0
    ? Math.min(100, Math.max(0, Math.round((ordinaryResult / subject.maxGrade) * 100)))
    : 0;

const canFinalize = incomplete === 0;

const isPassed = canFinalize && currentResult >= subject.passingGrade;

  return (
    <article className="subject-card">
      <div className="subject-color" style={{ background: subject.color }} />
      <div className="subject-card-top">
        <div
          className="subject-icon"
          style={{ color: subject.color, background: `${subject.color}18` }}
        >
          <Icon name="book" size={21} />
        </div>
        <StatusBadge
        tone={
        subject.status === "active"
        ? "blue"
        : isPassed
        ? "green"
        : "blue"
        }
        >
        {subject.status === "active"
        ? "En curso"
        : isPassed
        ? "Aprobada"
        : "Reprobada"}
        </StatusBadge>
      </div>
      <button className="subject-title-button" onClick={onOpen}>
        <p className="subject-code">{gradingModeLabel(subject.gradingMode)}</p>
        <h3>{subject.name}</h3>
      </button>
      <div className="subject-grade-data">
        <span>
          Nota máxima <strong>{subject.maxGrade}</strong>
        </span>
        <span>
          Mínimo <strong>{subject.passingGrade}</strong>
        </span>
      </div>
      <div className="subject-progress" aria-label={`${progress}% de actividades resueltas`}>
        <div>
          <span>Progreso registrado</span>
          <strong>{total ? `${resolved.length}/${total}` : "Sin actividades"}</strong>
        </div>
        <span className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </span>
        </div>
      {extraCreditPoints > 0 && (
        <p className="extra-credit-card-text">
          Puntos extra acumulados: +{Number(extraCreditPoints.toFixed(2))}
        </p>
      )}
            
      <div className="subject-actions">
        <button className="compact-action" onClick={onOpen}>
          Ver detalle
        </button>
        {onEdit && (
          <button className="compact-action" onClick={onEdit}>
            Editar
          </button>
        )}
        {onFinalize && (
          <button
            className="compact-action"
            onClick={onFinalize}
            disabled={!canFinalize}
            title={
              canFinalize
                ? "Finalizar materia"
                : `Falta completar ${incomplete} ${incomplete === 1 ? "resultado" : "resultados"}`
            }
          >
            Finalizar
          </button>
        )}
        {onReactivate && (
          <button className="compact-action" onClick={onReactivate}>
            Reactivar
          </button>
        )}
        <button className="compact-action danger" onClick={onDelete}>
          Eliminar
        </button>
      </div>
      {!canFinalize && subject.status === "active" && (
        <p className="finalize-reason">
          {incomplete}{" "}
          {incomplete === 1 ? "resultado pendiente impide" : "resultados pendientes impiden"}{" "}
          finalizar.
        </p>
      )}
    </article>
  );
}

function EmptyPlaceholder({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="empty-placeholder">
      <div className="empty-icon">
        <Icon name={icon} size={23} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function HomePage({
  navigate,
  activities,
  subjects,
  availability,
  sessions,
  onOpenActivity,
}: {
  navigate: (section: SectionId) => void;
  activities: Activity[];
  subjects: Subject[];
  availability: AvailabilityInterval[];
  sessions: StudySession[];
  onOpenActivity: (activity: Activity) => void;
}) {

//Calculo fecha actual inicio

  const today = new Date();

  const currentDay = today.getDate();

  const currentMonth = today
    .toLocaleDateString("es-CO", { month: "long" })
    .toUpperCase();

  const currentYear = today.getFullYear();

  const currentWeekday = today
    .toLocaleDateString("es-CO", { weekday: "long" })
    .toUpperCase();

  const getISOWeek = (date: Date) => {
    const currentDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const day = currentDate.getUTCDay() || 7;
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - day);

    const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));

    return Math.ceil(
      ((currentDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
  };

  const currentWeek = getISOWeek(today);

  const pendingActivities = sortActivitiesByPriority(
  activities.filter((activity) => activity.result === "pending"),
  subjects,
  availability,
);

  const getSessionDuration = (time: string) => {
  const [start, end] = time
    .split("–")
    .map((value) => value.trim());

  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const duration = (toMinutes(end) - toMinutes(start)) / 60;

  return Number.isInteger(duration)
    ? `${duration} h`
    : `${duration.toFixed(2).replace(".", ",")} h`;
};
  
  const subjectName = (subjectId: string) =>
    subjects.find((subject) => subject.id === subjectId)?.name ?? "Materia eliminada";

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="date-signature">
        <span className="date-day">{currentDay}</span>
        <div>
        <strong>{currentMonth} / {currentYear}</strong>
        <span>{currentWeekday} · SEMANA {currentWeek}</span>
        </div>
        </div>
        <div className="home-intro">
          <p>Buenos días, Brayner.</p>
          <h1>
            Tu agenda académica,
            <br />
            <span>bajo control.</span>
          </h1>
        </div>
      </header>

      <section className="academic-brief">
        <div className="brief-number">
          <span>{String(pendingActivities.length).padStart(2, "0")}</span>
          <p>pendientes</p>
        </div>
        <div className="brief-copy">
          <span className="section-kicker">Situación de hoy</span>
          <h2>
            {pendingActivities.length
              ? `${pendingActivities.length} ${pendingActivities.length === 1 ? "entrega requiere" : "entregas requieren"} tu atención.`
              : "No hay entregas pendientes por resolver."}
          </h2>
          <p>
            {pendingActivities.length
              ? `Tu siguiente prioridad corresponde a ${subjectName(pendingActivities[0].subjectId)}.`
              : "Tu agenda académica está al día."}
          </p>
        </div>
        <button className="brief-link" onClick={() => navigate("planificacion")}>
          Abrir agenda <Icon name="arrow-right" size={17} />
        </button>
      </section>

      <section className="activity-ledger">
        <div className="ledger-heading">
          <div>
            <span className="section-kicker">Prioridad académica</span>
            <h2>Próximas actividades</h2>
          </div>
          <button className="text-button" onClick={() => navigate("actividades")}>
            Consultar todas <Icon name="arrow-right" size={16} />
          </button>
        </div>
        <div className="ledger-columns" aria-hidden="true">
          <span>Prioridad</span>
          <span>Actividad</span>
          <span>Contexto</span>
          <span>Estado</span>
        </div>
        <div className="activity-list">
          {pendingActivities.slice(0, 3).map((activity) => (
            <ActivityCard
  key={activity.id}
  activity={activity}
  onOpenDetails={() => onOpenActivity(activity)}
  subjectName={subjectName(activity.subjectId)}
  subjectMaxGrade={
  subjects.find((subject) => subject.id === activity.subjectId)?.maxGrade ?? 0
  }
  sessionCount={
    sessions.filter(
      (session) => session.activityId === activity.id,
    ).length
  }
  ipa={getActivityIPA(
    activity,
    activities,
    subjects,
    availability,
  )}
  compact
/>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActivitiesPage({
  openModal,
  onEdit,
  onDelete,
  onChangeResult,
  onSaveGrade,
  onOpenActivity,
  selectedActivityId,
  activities,
  subjects,
  availability,
  sessions,
  }: {
  openModal: () => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  onChangeResult: (
  activity: Activity,
  result: Activity["result"],
  ) => void;
  onSaveGrade: (
  activity: Activity,
  grade: number,
  ) => void;
  onOpenActivity: (activity: Activity) => void;
  selectedActivityId: string | null;
  activities: Activity[];
  subjects: Subject[];
  availability: AvailabilityInterval[];
  sessions: StudySession[];
  }) {
  const [tab, setTab] = useState<"Pendientes" | "Historial">("Pendientes");
  const [highlightedActivityId, setHighlightedActivityId] = useState<string | null>(null);
  useEffect(() => {
  if (!selectedActivityId) return;

  const activity = activities.find(
    (item) => item.id === selectedActivityId
  );

  if (!activity) return;

  setTab(
    activity.result === "pending" ? "Pendientes" : "Historial"
  );

  setHighlightedActivityId(activity.id);
}, [selectedActivityId, activities]);
  const visibleActivities =
  tab === "Pendientes"
    ? sortActivitiesByPriority(
        activities.filter((activity) => activity.result === "pending"),
        subjects,
        availability,
      )
    : activities.filter((activity) => activity.result !== "pending");
  const subjectName = (subjectId: string) =>
    subjects.find((subject) => subject.id === subjectId)?.name ?? "Materia eliminada";

  return (
    <>
      <PageHeader
        title="Actividades"
        description="Revisa y organiza tus próximas entregas."
        action={
          <PrimaryButton icon="plus" onClick={openModal}>
            Añadir actividad
          </PrimaryButton>
        }
      />
      <Tabs
        items={["Pendientes", "Historial"]}
        active={tab}
        onChange={(value) => setTab(value as typeof tab)}
      />
      <section className="content-section section-spaced">
        <div className="section-heading">
          <div>
            <h2>{tab}</h2>
            <p>
              {tab === "Pendientes"
                ? `${visibleActivities.length} actividades por completar`
                : `${visibleActivities.length} actividades con resultado`}
            </p>
          </div>
        </div>
        {visibleActivities.length ? (
          <div className="activity-list">
{visibleActivities.map((activity) => (
  <ActivityCard
  key={activity.id}
  activity={activity}
  subjectName={subjectName(activity.subjectId)}
  onSaveGrade={(grade) => onSaveGrade(activity, grade)}
  subjectMaxGrade={
  subjects.find((subject) => subject.id === activity.subjectId)?.maxGrade ?? 0
  }
  onEdit={() => onEdit(activity)}
  onOpenDetails={() => onOpenActivity(activity)}
  highlighted={activity.id === highlightedActivityId}
  onChangeResult={(result) => onChangeResult(activity, result)}
  onDelete={() => {
  const confirmed = window.confirm(
    `¿Estás seguro de eliminar la actividad "${activity.title}"? También se eliminarán sus sesiones de planificación.`
  );

  if (confirmed) {
    onDelete(activity);
  }
  }}
  sessionCount={
    sessions.filter(
      (session) => session.activityId === activity.id,
    ).length
  }
  ipa={getActivityIPA(
    activity,
    activities,
    subjects,
    availability,
  )}
/>
))}
          </div>
        ) : (
          <EmptyPlaceholder
            icon="check"
            title={
              tab === "Pendientes"
                ? "No tienes actividades pendientes"
                : "Tu historial aparecerá aquí"
            }
            text={
              tab === "Pendientes"
                ? "Las nuevas actividades se mostrarán en este espacio."
                : "Las actividades que completes se mostrarán en este espacio."
            }
          />
        )}
      </section>
    </>
  );
}

function Tabs({
  items,
  active,
  onChange,
}: {
  items: string[];
  active: string;
  onChange: (item: string) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) =>
        (() => {
          const isActive = item === active || item.startsWith(`${active} ·`);
          return (
            <button
              key={item}
              role="tab"
              aria-selected={isActive}
              className={isActive ? "active" : ""}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          );
        })(),
      )}
    </div>
  );
}

type SubjectTab = "En curso" | "Finalizadas";

function SubjectDetail({
  subject,
  activities,
  onBack,
}: {
  subject: Subject;
  activities: Activity[];
  onBack: () => void;
}) {
  const resolved = activities.filter(activityHasFinalResult);
 const graded = activities.filter(
  (activity): activity is Activity & { grade: number } =>
    typeof activity.grade === "number" && !activity.isExtraCredit,
);

const extraCreditGraded = activities.filter(
  (activity): activity is Activity & { grade: number } =>
    typeof activity.grade === "number" && activity.isExtraCredit,
);

const extraCreditPoints = extraCreditGraded.reduce(
  (sum, activity) => sum + activity.grade,
  0,
);

  const ordinaryResult =
  subject.gradingMode === "points"
    ? graded.reduce((sum, activity) => sum + activity.grade, 0)
    : graded.length
      ? graded.reduce((sum, activity) => sum + activity.grade, 0) / graded.length
      : null;
  
  const currentResult =
  subject.gradingMode === "points"
    ? graded.reduce((sum, activity) => sum + activity.grade, 0) +
      extraCreditPoints
    : graded.length
      ? graded.reduce((sum, activity) => sum + activity.grade, 0) / graded.length
      : null;

  const lostPoints =
  subject.gradingMode === "points"
    ? graded.reduce(
        (sum, activity) =>
          sum + Math.max(0, activity.weight - activity.grade),
        0,
      )
    : 0;

    const remainingPoints =
    subject.gradingMode === "points"
    ? Math.max(0, subject.passingGrade - (currentResult ?? 0))
    : 0;

    const progress =
    subject.maxGrade > 0 && ordinaryResult !== null
    ? Math.min(
        100,
        Math.max(0, Math.round((ordinaryResult / subject.maxGrade) * 100)),
      )
    : 0;

  const isPassed =
  subject.status === "completed" &&
  currentResult !== null &&
  currentResult >= subject.passingGrade;

  return (
    <>
      <button className="back-link" onClick={onBack}>
        <Icon name="arrow-left" size={16} /> Volver a materias
      </button>
      <PageHeader
        eyebrow={subject.status === "active" ? "Materia en curso" : "Materia finalizada"}
        title={subject.name}
        description="Información académica y registros vinculados a esta materia."
      />
      <section className="subject-detail-summary">
        <div>
          <span>Estado</span>
          <StatusBadge
          tone={
          subject.status === "active"
          ? "blue"
          : isPassed
          ? "green"
          : "blue"
          }
          >
          {subject.status === "active"
          ? "En curso"
          : isPassed
          ? "Aprobada"
          : "Reprobada"}
          </StatusBadge>
        </div>
        <div>
          <span>Modalidad</span>
          <strong>{gradingModeLabel(subject.gradingMode)}</strong>
        </div>
        <div>
          <span>Nota máxima</span>
          <strong>{subject.maxGrade}</strong>
        </div>
        <div>
          <span>Mínimo para aprobar</span>
          <strong>{subject.passingGrade}</strong>
        </div>
      </section>
      <section className="detail-progress-panel">
        <div>
          <span className="section-kicker">Progreso académico</span>
          <h2>
            {currentResult === null
              ? "Sin calificaciones registradas"
              : ordinaryResult === null
              ? "Sin calificaciones ordinarias"
              : `${Number(ordinaryResult.toFixed(2))} / ${subject.maxGrade}`}
          </h2>
          <p>
            {subject.gradingMode === "points"
              ? "Suma de los puntos registrados. No incluye actividades pendientes."
              : "Promedio simple de las calificaciones registradas. No incluye actividades pendientes."}
          </p>
          
          {extraCreditPoints > 0 && (
          <p className="extra-credit-summary">
          Puntos extra acumulados: +{Number(extraCreditPoints.toFixed(2))}
          </p>
          )}

<div className="subject-progress">
  <div>
    <span>Avance académico</span>
    <strong>{progress}%</strong>
  </div>
  <span className="progress-track">
    <span style={{ width: `${progress}%` }} />
  </span>
</div>
          
{subject.gradingMode === "points" && (
  <>
    <p>
      Puntos obtenidos: {Number(ordinaryResult?.toFixed(2) ?? 0)}
    </p>
    <p>
      Puntos perdidos: {Number(lostPoints.toFixed(2))}
    </p>
    <p>
      Puntos faltantes para aprobar: {Number(remainingPoints.toFixed(2))}
    </p>
  </>
)}
          
        </div>
        <strong>
          {resolved.length}/{activities.length} actividades resueltas
        </strong>
      </section>
      <section className="detail-activities">
        <div className="section-heading">
          <div>
            <h2>Actividades relacionadas</h2>
            <p>Consulta de registros; su gestión estará disponible en la siguiente etapa.</p>
          </div>
        </div>
        {activities.length ? (
          <div className="related-activity-list">
            {activities.map((activity) => (
              <article key={activity.id}>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{`${activity.dueDate} ${activity.dueTime}`}</p>
                </div>
                <div>
                  <span>
                    {!activityHasFinalResult(activity)
                      ? "Pendiente de calificación"
                      : activity.result === "not-submitted"
                        ? "No entregada · 0"
                        : `Calificación: ${activity.grade}`}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder
            icon="actividades"
            title="Sin actividades relacionadas"
            text="Esta materia todavía no tiene actividades registradas."
          />
        )}
      </section>
    </>
  );
}

function SubjectsPage({
  subjects,
  activities,
  tab,
  onTabChange,
  selectedId,
  onSelect,
  onAdd,
  onEdit,
  onFinalize,
  onReactivate,
  onDelete,
}: {
  subjects: Subject[];
  activities: Activity[];
  tab: SubjectTab;
  onTabChange: (tab: SubjectTab) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAdd: () => void;
  onEdit: (subject: Subject) => void;
  onFinalize: (subject: Subject) => void;
  onReactivate: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
}) {
  const selected = subjects.find((subject) => subject.id === selectedId);
  if (selected) {
    return (
      <SubjectDetail
        subject={selected}
        activities={activities.filter((activity) => activity.subjectId === selected.id)}
        onBack={() => onSelect(null)}
      />
    );
  }

  const activeCount = subjects.filter((subject) => subject.status === "active").length;
  const completedCount = subjects.length - activeCount;
  const visibleSubjects = subjects.filter(
    (subject) => subject.status === (tab === "En curso" ? "active" : "completed"),
  );

  return (
    <>
      <PageHeader
        title="Materias"
        description="Mantén tus asignaturas ordenadas en un solo lugar."
        action={
          <PrimaryButton icon="plus" onClick={onAdd}>
            Añadir materia
          </PrimaryButton>
        }
      />
      <Tabs
        items={[`En curso · ${activeCount}`, `Finalizadas · ${completedCount}`]}
        active={tab}
        onChange={(value) => onTabChange(value.startsWith("En curso") ? "En curso" : "Finalizadas")}
      />
      <section className="content-section section-spaced">
        {visibleSubjects.length ? (
          <div className="subject-grid">
            {visibleSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                activities={activities.filter((activity) => activity.subjectId === subject.id)}
                onOpen={() => onSelect(subject.id)}
                onEdit={subject.status === "active" ? () => onEdit(subject) : undefined}
                onFinalize={subject.status === "active" ? () => onFinalize(subject) : undefined}
                onReactivate={
                  subject.status === "completed" ? () => onReactivate(subject) : undefined
                }
                onDelete={() => onDelete(subject)}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder
            icon="materias"
            title={
              tab === "En curso" ? "No hay materias en curso" : "Aún no hay materias finalizadas"
            }
            text={
              tab === "En curso"
                ? "Añade una materia o reactiva una finalizada para comenzar."
                : "Cuando finalices una materia podrás consultarla desde aquí."
            }
          />
        )}
      </section>
    </>
  );
}

function PlanningPage({
  sessions,
  subjects,
  onOpenActivity,
  }: {
  sessions: StudySession[];
  subjects: Subject[];
  onOpenActivity: (activityId: string) => void;
  }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();

  const weekStart = new Date(today);
  weekStart.setHours(0, 0, 0, 0);

  weekStart.setDate(
  today.getDate() - today.getDay() + weekOffset * 7
  );
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const weekLabel = `${weekStart.getDate()} – ${weekEnd.getDate()} ${weekEnd.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  })}`;

  const weekDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(weekStart);
  date.setDate(weekStart.getDate() + index);

  return {
    day: date.toLocaleDateString("es-CO", { weekday: "short" }),
    date: String(date.getDate()),
    current: date.toDateString() === new Date().toDateString(),
  };
});

  const subjectName = (subjectId: string) =>
    subjects.find((subject) => subject.id === subjectId)?.name ?? "";

  const visibleSessions = sessions.filter((session) => {
    const date = new Date(`${session.date}T12:00:00`);
    return date >= weekStart && date <= new Date(
      weekEnd.getFullYear(),
      weekEnd.getMonth(),
      weekEnd.getDate(),
      23, 59, 59
    );
  });

  const getSessionDuration = (time: string) => {
  const [start, end] = time
    .split("–")
    .map((value) => value.trim());

  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const duration = (toMinutes(end) - toMinutes(start)) / 60;

  return Number.isInteger(duration)
    ? `${duration} h`
    : `${duration.toFixed(2).replace(".", ",")} h`;
  };
  
  const getSessionPosition = (session: StudySession) => {
  const sessionDate = new Date(`${session.date}T12:00:00`);
  const dayIndex = sessionDate.getDay();
  
  const [startTime, endTime] = session.time.split("–").map((value) => value.trim());

  const startMinutes =
    Number(startTime.split(":")[0]) * 60 +
    Number(startTime.split(":")[1]);

  const endMinutes =
    Number(endTime.split(":")[0]) * 60 +
    Number(endTime.split(":")[1]);

  const top = ((startMinutes - 8 * 60) / 60) * 45;
  const height = ((endMinutes - startMinutes) / 60) * 45;

  return {
    top: `${top}px`,
    left: `calc(65px + (100% - 65px) / 7 * ${dayIndex} + 5px)`,
    width: "calc((100% - 65px) / 7 - 10px)",
    height: `${height}px`,
  };
};

  return (
    <>
      <PageHeader
        title="Planificación"
        description="Consulta tus sesiones de estudio para esta semana."
        action={
          <div className="week-controls">
            <IconButton
  icon="arrow-left"
  label="Semana anterior"
  onClick={() => setWeekOffset((current) => current - 1)}
/>
<span>{weekLabel}</span>
<IconButton
  icon="arrow-right"
  label="Semana siguiente"
  onClick={() => setWeekOffset((current) => current + 1)}
/>
          </div>
        }
      />
      <section className="calendar-card">
        <div className="calendar-head">
          <div className="time-spacer" />
          {weekDays.map((item) => (
            <div className={item.current ? "current" : ""} key={item.day}>
              <span>{item.day}</span>
              <strong>{item.date}</strong>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time) => (
  <div className="time-row" key={time}>
    <span>{time}</span>
    <div /><div /><div /><div /><div /><div /><div />
  </div>
))}
          {visibleSessions.map((session) => (
          <div
          className={`study-block ${session.className}`}
          key={session.id}
          style={{
          ...getSessionPosition(session),
          cursor: "pointer",
          }}
          onClick={() => onOpenActivity(session.activityId)}
          >
        <strong>{subjectName(session.subjectId)}</strong>
        <span>
        {session.detail} · {session.time}
        ({getSessionDuration(session.time)})
        </span>
        </div>
        ))}
        </div>
      </section>
      <section className="mobile-schedule">
        {visibleSessions.map((session) => (
      <article
        key={session.id}
        onClick={() => onOpenActivity(session.activityId)}
        style={{ cursor: "pointer" }}
        >
            <p>
  {new Date(`${session.date}T12:00:00`).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })}
</p>
            <div>
              <span className="schedule-dot" />
              <div>
                <h3>{subjectName(session.subjectId)}</h3>
                <span>
                {session.time} · {getSessionDuration(session.time)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function AvailabilityPage({
  availability,
  onSave,
}: {
  availability: AvailabilityInterval[];
  onSave: (updatedAvailability: AvailabilityInterval[]) => void;
}) {
  const [draftAvailability, setDraftAvailability] =
  useState<AvailabilityInterval[]>(availability);

  const [showIntervalForm, setShowIntervalForm] = useState(false);
  const [editingInterval, setEditingInterval] =
  useState<AvailabilityInterval | null>(null);

  const [selectedDay, setSelectedDay] = useState("1");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");

  //Crear o editar intervalos

  const handleSaveInterval = () => {
  if (startTime >= endTime) {
    alert("La hora de inicio debe ser anterior a la hora de finalización.");
    return;
  }

  const hasOverlap = draftAvailability.some((interval) => {
    if (interval.day !== Number(selectedDay)) return false;

    // Al editar, no comparar el intervalo consigo mismo.
    if (editingInterval && interval.id === editingInterval.id) {
      return false;
    }

    // Detectar horarios que se cruzan.
    return startTime < interval.end && endTime > interval.start;
  });

  if (hasOverlap) {
    alert("Este horario se cruza con otro intervalo del mismo día.");
    return;
  }

  if (editingInterval) {
    setDraftAvailability((current) =>
      current.map((interval) =>
        interval.id === editingInterval.id
          ? {
              ...interval,
              day: Number(selectedDay),
              start: startTime,
              end: endTime,
            }
          : interval,
      ),
    );
  } else {
    const newInterval: AvailabilityInterval = {
      id: `availability-${Date.now()}`,
      day: Number(selectedDay),
      start: startTime,
      end: endTime,
    };

    setDraftAvailability((current) => [...current, newInterval]);
  }

  setShowIntervalForm(false);
  setEditingInterval(null);
};
  
  const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

  const intervals = dayNames.map((day, index) => ({
  day,
  items: draftAvailability.filter(
    (interval) => interval.day === index,
  ),
  }));

  return (
    <>
      <PageHeader
        title="Disponibilidad"
        description="Organiza los intervalos que tienes libres para estudiar."
        action={
  <PrimaryButton
    icon="plus"
    onClick={() => {
      setEditingInterval(null);
      setShowIntervalForm(true);
    }}
  >
    Añadir intervalo
  </PrimaryButton>
}
      />
      {showIntervalForm && (
        <div className="modal-backdrop">
          <section className="modal" role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Disponibilidad</p>
                <h2>
                  {editingInterval ? "Editar intervalo" : "Añadir intervalo"}
                </h2>
              </div>
              <IconButton
                icon="close"
                label="Cerrar ventana"
                onClick={() => setShowIntervalForm(false)}
              />
            </div>

            <div className="modal-body">
              <label className="field">
                <span>Día de la semana</span>
                <select
                  value={selectedDay}
                  onChange={(event) => setSelectedDay(event.target.value)}
                >
                  {dayNames.map((day, index) => (
                    <option key={day} value={String(index)}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field-row">
                <label className="field">
                  <span>Hora de inicio</span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                  />
                </label>

                <label className="field">
                  <span>Hora de finalización</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <SecondaryButton
                onClick={() => setShowIntervalForm(false)}
              >
                Cancelar
              </SecondaryButton>
              <PrimaryButton onClick={handleSaveInterval}>
                Guardar intervalo
              </PrimaryButton>
            </div>
          </section>
        </div>
      )}
      <section className="availability-card">
        <div className="info-banner">
          <Icon name="clock" size={20} />
          <p>Estos horarios servirán como base para organizar tus futuras sesiones de estudio.</p>
        </div>

        <div className="interval-list">
  {intervals.map(({ day, items }) => (
    <div className="interval-row" key={day}>
      <strong>{day}</strong>

      <div className="intervals">
        {items.map((interval) => (
          <div key={interval.id}>
            <span>
              {interval.start} – {interval.end}
            </span>

            <div className="card-actions">
              <IconButton
                icon="edit"
                label={`Editar ${day}`}
                onClick={() => {
                  setEditingInterval(interval);
                  setSelectedDay(String(interval.day));
                  setStartTime(interval.start);
                  setEndTime(interval.end);
                  setShowIntervalForm(true);
                }}
              />

              <IconButton
                icon="trash"
                label={`Eliminar ${day}`}
                danger
                onClick={() => {
                  setDraftAvailability((current) =>
                    current.filter((item) => item.id !== interval.id),
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

        <div className="modal-footer">
          
          <SecondaryButton
            onClick={() => {
            setDraftAvailability(availability);
            setShowIntervalForm(false);
            setEditingInterval(null);
            }}
            >
            Descartar cambios
          </SecondaryButton>

          <PrimaryButton
  onClick={() => {
    onSave(draftAvailability);
    setShowIntervalForm(false);
    setEditingInterval(null);
  }}
>
  Guardar disponibilidad
</PrimaryButton>
          
        </div>
        
      </section>
    </>
  );
}

function NotificationsPage({
  subjects,
  activities,
  sessions,
}: {
  subjects: Subject[];
  activities: Activity[];
  sessions: StudySession[];
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  // Próxima actividad pendiente
  const nextActivity = activities
    .filter((activity) => activity.result === "pending")
    .map((activity) => ({
      activity,
      timestamp: new Date(
        `${activity.dueDate}T${activity.dueTime}:00`,
      ).getTime(),
    }))
    .filter(
      (item) =>
        Number.isFinite(item.timestamp) &&
        item.timestamp > now.getTime(),
    )
    .sort((a, b) => a.timestamp - b.timestamp)[0];

  // Próxima sesión de estudio
  const nextSession = sessions
    .map((session) => {
      const startTime = session.time.split(/[–—-]/)[0].trim();

      return {
        session,
        timestamp: new Date(
          `${session.date}T${startTime}:00`,
        ).getTime(),
      };
    })
    .filter(
      (item) =>
        Number.isFinite(item.timestamp) &&
        item.timestamp > now.getTime(),
    )
    .sort((a, b) => a.timestamp - b.timestamp)[0];

  // Construir las tarjetas dinámicas
  const upcomingItems = [
    ...(nextActivity
      ? [{
          timestamp: nextActivity.timestamp,
          title: "Entrega próxima",
          text: `${nextActivity.activity.title} vence el ${new Date(nextActivity.timestamp).toLocaleDateString("es-CO")} a las ${nextActivity.activity.dueTime}.`,
          time: `En ${Math.ceil((nextActivity.timestamp - now.getTime()) / 3600000)} h`,
          icon: "clock" as IconName,
          unread: true,
          id: `deadline-${nextActivity.activity.id}`,
        }]
      : []),

    ...(nextSession
      ? [{
          timestamp: nextSession.timestamp,
          title: "Sesión de estudio",
          text: `Tu sesión de ${nextSession.session.detail}${subjects.find((item) => item.id === nextSession.session.subjectId) ? ` de ${subjects.find((item) => item.id === nextSession.session.subjectId)!.name}` : ""} está programada para el ${new Date(nextSession.timestamp).toLocaleDateString("es-CO")}, de ${nextSession.session.time}.`,
          time: `En ${Math.ceil((nextSession.timestamp - now.getTime()) / 3600000)} h`,
          icon: "calendar" as IconName,
          unread: true,
          id: `session-${nextSession.session.id}`,
        }]
      : []),
  ].sort((a, b) => a.timestamp - b.timestamp);

  const items = [
    ...upcomingItems,
    {
      title: "Plan semanal preparado",
      text: "Ya puedes consultar tu planificación de esta semana.",
      time: "Ayer",
      icon: "check" as IconName,
      unread: false,
      id: "weekly-plan",
    },
  ];

  return (
    <>
      <PageHeader
        title="Notificaciones"
        description="Consulta tus avisos y recordatorios recientes."
        action={<SecondaryButton>Marcar como leídas</SecondaryButton>}
      />

      <section className="notification-list">
        {items.map((item) => (
          <article
            className={`notification-item ${item.unread ? "unread" : ""}`}
            key={item.id}
          >
            <div className="notification-icon">
              <Icon name={item.icon} size={20} />
            </div>

            <div>
              <div className="notification-title">
                <h3>{item.title}</h3>
                {item.unread && <span className="unread-dot" />}
              </div>

              <p>{item.text}</p>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Perfil"
        description="Administra tu información y preferencias de la aplicación."
      />
      <div className="profile-layout">
        <section className="profile-card">
          <div className="profile-avatar">BG</div>
          <h2>Brayner S. Gómez R.</h2>
          <p>Estudiante universitario</p>
          <StatusBadge tone="blue">Semestre actual</StatusBadge>
        </section>
        <section className="settings-card">
          <div className="settings-section">
            <div className="settings-heading">
              <h2>Información personal</h2>
              <IconButton icon="edit" label="Editar información personal" />
            </div>
            <div className="profile-fields">
              <div>
                <span>Nombre completo</span>
                <strong>Brayner S. Gómez R.</strong>
              </div>
              <div>
                <span>Correo electrónico</span>
                <strong>bsgomezro@unadvirtual.edu.co</strong>
              </div>
              <div>
                <span>Universidad</span>
                <strong>UNAD</strong>
              </div>
              <div>
                <span>Carrera</span>
                <strong>Ingeniería de Sistemas</strong>
              </div>
            </div>
          </div>
          <div className="settings-section preferences">
            <h2>Preferencias</h2>
            <div className="setting-row">
              <div>
                <strong>Recordatorios</strong>
                <span>Recibir avisos de entregas y sesiones</span>
              </div>
              <button className="toggle active" aria-label="Desactivar recordatorios">
                <span />
              </button>
            </div>
            <div className="setting-row">
              <div>
                <strong>Apariencia</strong>
                <span>Tema visual de la aplicación</span>
              </div>
              <button className="theme-choice">
                <Icon name="sun" size={16} /> Claro
                <Icon name="chevron-down" size={15} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FormModal({
  subjects,
  activities,
  activity = null,
  onClose,
  onConfirm,
}: {
  subjects: Subject[];
  activities: Activity[];
  activity?: Activity | null;
  onClose: () => void;
  onConfirm: (values: ActivityFormValues) => void;
}) {
  const activeSubjects = subjects.filter(
    (subject) => subject.status === "active",
  );

const [title, setTitle] = useState(activity?.title ?? "");
const [subjectId, setSubjectId] = useState(
  activity?.subjectId ?? activeSubjects[0]?.id ?? "",
);
const [dueDate, setDueDate] = useState(activity?.dueDate ?? "");
const [dueTime, setDueTime] = useState(activity?.dueTime ?? "23:59");
const [weight, setWeight] = useState(
  activity ? String(activity.weight) : "",
);
const [isExtraCredit, setIsExtraCredit] = useState(
activity?.isExtraCredit ?? false,
);
const [effortHours, setEffortHours] = useState(
  activity ? String(activity.effortHours) : "",
);

const [sessionCount, setSessionCount] = useState(
  activity?.sessionCount ?? null,
);
  
  const selectedSubject = activeSubjects.find(
  (subject) => subject.id === subjectId,
);

const accumulatedWeight =
  selectedSubject?.gradingMode === "points"
    ? activities
        .filter(
          (item) =>
            item.subjectId === subjectId &&
            item.id !== activity?.id,
        )
        .reduce((total, item) => total + item.weight, 0)
    : 0;

const maxWeight = selectedSubject
  ? selectedSubject.gradingMode === "points"
    ? Math.max(0, selectedSubject.maxGrade - accumulatedWeight)
    : selectedSubject.maxGrade
  : undefined;
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !subjectId || !dueDate || !weight || !effortHours) {
      return;
    }

    onConfirm({
      title: title.trim(),
      subjectId,
      dueDate,
      dueTime,
      weight: Number(weight),
      isExtraCredit,
      effortHours: Number(effortHours),
      sessionCount,
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <div>
              <p className="eyebrow">
  {activity ? "Editar registro" : "Nuevo registro"}
</p>
<h2 id="modal-title">
  {activity ? "Editar actividad" : "Añadir actividad"}
</h2>
            </div>
            <IconButton icon="close" label="Cerrar ventana" onClick={onClose} />
          </div>

          <div className="modal-body">
            <label className="field">
              <span>Nombre de la actividad</span>
              <input
                type="text"
                placeholder="Ej. Preparar presentación"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Materia</span>
              <div className="select-wrap">
                <select
                  value={subjectId}
                  onChange={(event) => setSubjectId(event.target.value)}
                  required
                  disabled={activeSubjects.length === 0}
                >
                  {activeSubjects.length === 0 ? (
                    <option value="">No hay materias activas</option>
                  ) : (
                    activeSubjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))
                  )}
                </select>
                <Icon name="chevron-down" size={16} />
              </div>
            </label>

            <div className="field-row">
              <label className="field">
                <span>Fecha de entrega</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>Hora de entrega</span>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(event) => setDueTime(event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>Peso académico</span>
                <input
                  type="number"
                  min="0.01"
                  max={maxWeight}
                  step="0.01"
                  placeholder="Ej. 20"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>Esfuerzo estimado (horas)</span>
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  placeholder="Ej. 2.5"
                  value={effortHours}
                  onChange={(event) => setEffortHours(event.target.value)}
                  required
                />
              </label>
            </div>

            <label className="extra-credit-checkbox">
              <span>
                <input
                  type="checkbox"
                  checked={isExtraCredit}
                  onChange={(event) => setIsExtraCredit(event.target.checked)}
                />
                Actividad de puntos extra
              </span>
            </label>
            
            <label className="field">
              <span>Número de sesiones</span>
              <select
                value={sessionCount === null ? "auto" : String(sessionCount)}
                onChange={(event) =>
                  setSessionCount(
                    event.target.value === "auto"
                      ? null
                      : Number(event.target.value),
                  )
                }
              >
                <option value="auto">Automático (según disponibilidad)</option>
                <option value="1">1 sesión</option>
                <option value="2">2 sesiones</option>
                <option value="3">3 sesiones</option>
                <option value="4">4 sesiones</option>
                <option value="5">5 sesiones</option>
                <option value="6">6 sesiones</option>
                <option value="7">7 sesiones</option>
              </select>
            </label>
            
            <div className="prototype-note">
              <Icon name="clock" size={18} />
              <p>
                La prioridad se calculará automáticamente según la urgencia,
                el peso académico y el esfuerzo estimado.
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
            <PrimaryButton type="submit">
  {activity ? "Guardar cambios" : "Guardar actividad"}
</PrimaryButton>
          </div>
        </form>
      </section>
    </div>
  );
  }

type SubjectFormValues = {
  name: string;
  gradingMode: GradingMode;
  maxGrade: string;
  passingGrade: string;
};

function SubjectFormModal({
  subject,
  hasActivities,
  onClose,
  onSave,
}: {
  subject: Subject | null;
  hasActivities: boolean;
  onClose: () => void;
  onSave: (values: SubjectFormValues) => void;
}) {
  const initialValues: SubjectFormValues = {
    name: subject?.name ?? "",
    gradingMode: subject?.gradingMode ?? "points",
    maxGrade: subject ? String(subject.maxGrade) : "",
    passingGrade: subject ? String(subject.passingGrade) : "",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof SubjectFormValues, string>>>({});
  const dirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  const requestClose = () => {
    if (!dirty || window.confirm("Tienes cambios sin guardar. ¿Quieres salir de todos modos?")) {
      onClose();
    }
  };

  const update = (field: keyof SubjectFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof SubjectFormValues, string>> = {};
    const maxGrade = Number(values.maxGrade);
    const passingGrade = Number(values.passingGrade);

    if (!values.name.trim()) nextErrors.name = "Escribe el nombre de la materia.";
    if (values.maxGrade === "" || !Number.isFinite(maxGrade) || maxGrade <= 0) {
      nextErrors.maxGrade = "La nota máxima debe ser mayor que cero.";
    }
    if (values.passingGrade === "" || !Number.isFinite(passingGrade) || passingGrade <= 0) {
      nextErrors.passingGrade = "La nota mínima debe ser mayor que cero.";
    } else if (Number.isFinite(maxGrade) && passingGrade > maxGrade) {
      nextErrors.passingGrade = "La nota mínima no puede superar la nota máxima.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSave({ ...values, name: values.name.trim() });
  };

  return (
    <div className="modal-backdrop" onMouseDown={requestClose}>
      <form
        className="modal subject-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subject-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">{subject ? "Actualizar registro" : "Nuevo registro"}</p>
            <h2 id="subject-modal-title">{subject ? "Editar materia" : "Añadir materia"}</h2>
          </div>
          <IconButton icon="close" label="Cerrar ventana" onClick={requestClose} />
        </div>
        <div className="modal-body">
          <label className={`field ${errors.name ? "field-error" : ""}`}>
            <span>Nombre de la materia</span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Ej. Estadística"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label className={`field ${errors.gradingMode ? "field-error" : ""}`}>
            <span>Modalidad de calificación</span>
            <div className="select-wrap">
              <select
                value={values.gradingMode}
                disabled={Boolean(subject && hasActivities)}
                onChange={(event) => update("gradingMode", event.target.value)}
              >
                <option value="points">Puntos acumulados</option>
                <option value="average">Promedio simple</option>
              </select>
              <Icon name="chevron-down" size={16} />
            </div>
            {subject && hasActivities && (
              <small className="field-help">
                La modalidad está bloqueada porque esta materia ya tiene actividades.
              </small>
            )}
          </label>
          <div className="field-row">
            <label className={`field ${errors.maxGrade ? "field-error" : ""}`}>
              <span>Nota máxima</span>
              <input
                type="number"
                min="0"
                step="any"
                value={values.maxGrade}
                onChange={(event) => update("maxGrade", event.target.value)}
                placeholder="100"
                aria-invalid={Boolean(errors.maxGrade)}
              />
              {errors.maxGrade && <small>{errors.maxGrade}</small>}
            </label>
            <label className={`field ${errors.passingGrade ? "field-error" : ""}`}>
              <span>Nota mínima para aprobar</span>
              <input
                type="number"
                min="0"
                step="any"
                value={values.passingGrade}
                onChange={(event) => update("passingGrade", event.target.value)}
                placeholder="60"
                aria-invalid={Boolean(errors.passingGrade)}
              />
              {errors.passingGrade && <small>{errors.passingGrade}</small>}
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <SecondaryButton onClick={requestClose}>Cancelar</SecondaryButton>
          <PrimaryButton type="submit">
            {subject ? "Guardar cambios" : "Crear materia"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

type ConfirmAction = {
  type: "finalize" | "reactivate" | "delete";
  subject: Subject;
};

function ConfirmDialog({
  action,
  onCancel,
  onConfirm,
}: {
  action: ConfirmAction;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isDelete = action.type === "delete";
  const title =
    action.type === "finalize"
      ? "Finalizar materia"
      : action.type === "reactivate"
        ? "Reactivar materia"
        : "Eliminar materia";
  const body =
    action.type === "finalize"
      ? "La materia pasará a Finalizadas. Sus actividades, notas e historial se conservarán."
      : action.type === "reactivate"
        ? "La materia volverá a En curso con todas sus actividades, notas e historial."
        : "Esta acción eliminará también sus actividades, calificaciones, historial, sesiones y notificaciones relacionadas. No se puede deshacer.";

  return (
    <div className="modal-backdrop" onMouseDown={onCancel}>
      <section
        className={`modal confirm-modal ${isDelete ? "confirm-modal-danger" : ""}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">{isDelete ? "Acción irreversible" : "Confirmar cambio"}</p>
            <h2 id="confirm-title">{title}</h2>
          </div>
          <IconButton icon="close" label="Cancelar" onClick={onCancel} />
        </div>
        <div className="modal-body confirm-copy">
          <strong>{action.subject.name}</strong>
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <SecondaryButton onClick={onCancel}>Cancelar</SecondaryButton>
          <button className={`btn ${isDelete ? "btn-danger" : "btn-primary"}`} onClick={onConfirm}>
            {title}
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [subjectEditor, setSubjectEditor] = useState<Subject | "new" | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  //Estado global de disponibilidad
  const [availability, setAvailability] = useState<AvailabilityInterval[]>([
  { id: "availability-1", day: 1, start: "08:00", end: "10:00" },
  { id: "availability-2", day: 1, start: "16:00", end: "18:00" },
  { id: "availability-3", day: 2, start: "14:00", end: "17:00" },
  { id: "availability-4", day: 3, start: "09:00", end: "12:00" },
  { id: "availability-5", day: 4, start: "14:00", end: "16:00" },
  { id: "availability-6", day: 5, start: "10:00", end: "13:00" },
]);
  const [subjectTab, setSubjectTab] = useState<SubjectTab>("En curso");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([
  {
    id: "session-1",
    activityId: "lectura-seminario",
    subjectId: "fundamentos",
    date: "2026-11-20",
    time: "10:00 – 10:45",
    detail: "Lectura",
    className: "block-three",
  },
  {
    id: "session-2",
    activityId: "ejercicios-capitulo-4",
    subjectId: "calculo-ii",
    date: "2026-11-20",
    time: "11:00 – 12:00",
    detail: "Ejercicios",
    className: "block-one",
  },
  {
    id: "session-3",
    activityId: "ensayo-investigacion",
    subjectId: "metodologia",
    date: "2026-11-23",
    time: "08:00 – 09:00",
    detail: "Ensayo",
    className: "block-two",
  },
  {
    id: "session-4",
    activityId: "ejercicios-capitulo-4",
    subjectId: "calculo-ii",
    date: "2026-11-24",
    time: "14:00 – 14:15",
    detail: "Ejercicios",
    className: "block-one",
  },
  {
    id: "session-5",
    activityId: "ensayo-investigacion",
    subjectId: "metodologia",
    date: "2026-11-25",
    time: "09:00 – 10:00",
    detail: "Ensayo",
    className: "block-two",
  },
  {
    id: "session-6",
    activityId: "ensayo-investigacion",
    subjectId: "metodologia",
    date: "2026-11-27",
    time: "10:00 – 10:30",
    detail: "Ensayo",
    className: "block-two",
  },
]);
  
  const [notificationNow, setNotificationNow] = useState(() => new Date());

useEffect(() => {
  const interval = window.setInterval(() => {
    setNotificationNow(new Date());
  }, 60000);

  return () => window.clearInterval(interval);
}, []);

const notificationCount =
  activities.filter((activity) => {
    if (activity.result !== "pending") return false;

    const deadline = new Date(
      `${activity.dueDate}T${activity.dueTime}:00`,
    );

    const hours = (deadline.getTime() - notificationNow.getTime()) / 3600000;

    return !Number.isNaN(deadline.getTime()) && hours > 0 && hours <= 24;
  }).length +
  sessions.filter((session) => {
    const startTime = session.time.split("–")[0].trim();

    const start = new Date(`${session.date}T${startTime}:00`);

    const hours = (start.getTime() - notificationNow.getTime()) / 3600000;

    return !Number.isNaN(start.getTime()) && hours > 0 && hours <= 12;
  }).length;
  
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const navigate = (section: SectionId) => {
  setActiveSection(section);

  if (section === "materias") {
    setSelectedSubjectId(null);
  }

  setMoreOpen(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    window.setTimeout(() => setToast(null), 3200);
  };

const saveActivity = (values: ActivityFormValues) => {
  const subject = subjects.find(
    (item) => item.id === values.subjectId && item.status === "active",
  );

  if (!subject) {
    showToast("No se pudo guardar", "Selecciona una materia activa.");
    return;
  }

  if (editingActivity) {
    const updatedActivity: Activity = {
      ...editingActivity,
      title: values.title.trim(),
      subjectId: values.subjectId,
      dueDate: values.dueDate,
      dueTime: values.dueTime,
      weight: values.weight,
      isExtraCredit: values.isExtraCredit,
      effortHours: values.effortHours,
      color: subject.color,
    };

    setActivities((current) =>
      current.map((activity) =>
        activity.id === editingActivity.id
          ? updatedActivity
          : activity,
      ),
    );

    const otherSessions = sessions.filter(
      (session) => session.activityId !== editingActivity.id,
    );

    const plan =
      updatedActivity.result === "pending"
        ? generateActivitySessions(
            updatedActivity,
            availability,
            otherSessions,
          )
        : { sessions: [], plannedHours: 0 };

    setSessions([...otherSessions, ...plan.sessions]);

    if (plan.plannedHours < updatedActivity.effortHours) {
      showToast(
        "Actividad actualizada",
        `Se planificaron ${plan.plannedHours.toFixed(2)} de ${updatedActivity.effortHours} horas. No hubo suficiente disponibilidad.`,
      );
    } else {
      showToast(
        "Actividad actualizada",
        `${values.title} se actualizó correctamente y sus sesiones fueron reorganizadas.`,
      );
    }
  } else {
    const newActivity: Activity = {
      id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: values.title.trim(),
      subjectId: values.subjectId,
      dueDate: values.dueDate,
      dueTime: values.dueTime,
      weight: values.weight,
      isExtraCredit: values.isExtraCredit,
      effortHours: values.effortHours,
      sessionCount: values.sessionCount,
      color: subject.color,
      result: "pending",
    };

    setActivities((current) => [...current, newActivity]);

    const plan = generateActivitySessions(
      newActivity,
      availability,
      sessions,
    );

    setSessions([...sessions, ...plan.sessions]);

    if (plan.plannedHours < newActivity.effortHours) {
      showToast(
        "Actividad creada",
        `Se planificaron ${plan.plannedHours.toFixed(2)} de ${newActivity.effortHours} horas. No hubo suficiente disponibilidad.`,
      );
    } else {
      showToast(
        "Actividad creada",
        `${values.title} se añadió con sus sesiones de estudio.`,
      );
    }
  }

  setActivityModal(false);
  setEditingActivity(null);
};
  const saveSubject = (values: SubjectFormValues) => {
    const isNew = subjectEditor === "new";
    if (isNew) {
      const palette = ["#3478f6", "#7967d8", "#20a27a", "#d4772c", "#48647f"];
      setSubjects((current) => [
        ...current,
        {
          id: `subject-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: values.name,
          gradingMode: values.gradingMode,
          maxGrade: Number(values.maxGrade),
          passingGrade: Number(values.passingGrade),
          status: "active",
          color: palette[current.length % palette.length],
        },
      ]);
      setSubjectTab("En curso");
      showToast("Materia creada", `${values.name} se añadió a tus materias en curso.`);
    } else if (subjectEditor) {
      const hasActivities = activities.some((activity) => activity.subjectId === subjectEditor.id);
      setSubjects((current) =>
        current.map((subject) =>
          subject.id === subjectEditor.id
            ? {
                ...subject,
                name: values.name,
                gradingMode: hasActivities ? subject.gradingMode : values.gradingMode,
                maxGrade: Number(values.maxGrade),
                passingGrade: Number(values.passingGrade),
              }
            : subject,
        ),
      );
      showToast("Materia actualizada", "Los cambios se reflejaron en toda la aplicación.");
    }
    setSubjectEditor(null);
  };

  const requestFinalize = (subject: Subject) => {
    const incomplete = activities.filter(
      (activity) => activity.subjectId === subject.id && !activityHasFinalResult(activity),
    );
    if (incomplete.length) {
      showToast(
        "No se puede finalizar",
        `Falta completar ${incomplete.length} ${incomplete.length === 1 ? "resultado" : "resultados"}.`,
      );
      return;
    }
    setConfirmAction({ type: "finalize", subject });
  };

  const executeConfirmedAction = () => {
    if (!confirmAction) return;
    const { subject, type } = confirmAction;

    if (type === "delete") {
      setSubjects((current) => current.filter((item) => item.id !== subject.id));
      setActivities((current) => current.filter((activity) => activity.subjectId !== subject.id));
      setSessions((current) => current.filter((session) => session.subjectId !== subject.id));

      if (selectedSubjectId === subject.id) setSelectedSubjectId(null);
      showToast("Materia eliminada", `Se eliminaron ${subject.name} y sus registros relacionados.`);
    } else {
      const nextStatus: SubjectStatus = type === "finalize" ? "completed" : "active";
      setSubjects((current) =>
        current.map((item) => (item.id === subject.id ? { ...item, status: nextStatus } : item)),
      );
      setSubjectTab(type === "finalize" ? "Finalizadas" : "En curso");
      setSelectedSubjectId(null);
      showToast(
        type === "finalize" ? "Materia finalizada" : "Materia reactivada",
        type === "finalize"
          ? "Todos sus registros se conservaron en Finalizadas."
          : "La materia recuperó su estado académico anterior.",
      );
    }
    setConfirmAction(null);
  };

  const saveAvailability = (
  newAvailability: AvailabilityInterval[],
) => {
  setAvailability(newAvailability);

  const pendingActivities = sortActivitiesByPriority(
    activities.filter((activity) => activity.result === "pending"),
    subjects,
    newAvailability,
  );

  let newSessions: StudySession[] = [];
  const incompleteActivities: string[] = [];

  pendingActivities.forEach((activity) => {
    const plan = generateActivitySessions(
      activity,
      newAvailability,
      newSessions,
    );

    newSessions = [...newSessions, ...plan.sessions];

    if (plan.plannedHours < activity.effortHours) {
      incompleteActivities.push(activity.title);
    }
  });

  setSessions(newSessions);

  if (incompleteActivities.length > 0) {
    showToast(
      "Planificación actualizada",
      `No se pudo planificar todo el esfuerzo de ${incompleteActivities.length} actividad(es). Revisa sus sesiones.`,
    );
  } else {
    showToast(
      "Planificación actualizada",
      "Todas las actividades pendientes tienen sus sesiones programadas.",
    );
  }
};
  
  const content: Record<SectionId, ReactNode> = {
    inicio: (
  <HomePage
    navigate={navigate}
    activities={activities}
    subjects={subjects}
    availability={availability}
    sessions={sessions}
    onOpenActivity={setSelectedActivity}
/>
),
    actividades: (
  <ActivitiesPage
  openModal={() => {
    setEditingActivity(null);
    setActivityModal(true);
  }}
  onEdit={(activity) => {
    setEditingActivity(activity);
    setActivityModal(true);
  }}
  onDelete={(activity) => {
    setActivities((current) =>
      current.filter((item) => item.id !== activity.id),
    );

    setSessions((current) =>
      current.filter((session) => session.activityId !== activity.id),
    );
  }}
  onChangeResult={(activity, result) => {
  setActivities((current) =>
    current.map((item) =>
      item.id === activity.id
        ? {
            ...item,
            result,
            ...(result === "not-submitted"
              ? { grade: 0 }
              : result === "pending"
                ? { grade: undefined }
                : {}),
          }
        : item,
    ),
  );
}}
  onSaveGrade={(activity, grade) => {
  setActivities((current) =>
    current.map((item) =>
      item.id === activity.id
        ? { ...item, grade, result: "graded" }
        : item,
    ),
  );
  }}
  onOpenActivity={setSelectedActivity}
  selectedActivityId={selectedActivityId}
  activities={activities}
  subjects={subjects}
  availability={availability}
  sessions={sessions}
/>
),
    materias: (
      <SubjectsPage
        subjects={subjects}
        activities={activities}
        tab={subjectTab}
        onTabChange={setSubjectTab}
        selectedId={selectedSubjectId}
        onSelect={setSelectedSubjectId}
        onAdd={() => setSubjectEditor("new")}
        onEdit={setSubjectEditor}
        onFinalize={requestFinalize}
        onReactivate={(subject) => setConfirmAction({ type: "reactivate", subject })}
        onDelete={(subject) => setConfirmAction({ type: "delete", subject })}
      />
    ),
    planificacion: (
    <PlanningPage
    sessions={sessions}
    subjects={subjects}
    onOpenActivity={(activityId) => {
      setSelectedActivityId(activityId);
      navigate("actividades");
    }}
    />
),
    disponibilidad: (
  <AvailabilityPage
    availability={availability}
    onSave={saveAvailability}
  />
),
    notificaciones: (
  <NotificationsPage
    subjects={subjects}
    activities={activities}
    sessions={sessions}
  />
),
    perfil: <ProfilePage />,
  };

  return (
    <div className={`app-shell ${sidebarExpanded ? "sidebar-is-expanded" : ""}`}>
      <aside className={`sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`}>
        <div className="brand">
          <div className="brand-mark">
            <span>T</span>
          </div>
          <span className="brand-word">TiempoU</span>
        </div>
        <button
          className="sidebar-toggle"
          aria-label={sidebarExpanded ? "Contraer navegación" : "Expandir navegación"}
          title={sidebarExpanded ? "Contraer navegación" : "Expandir navegación"}
          onClick={() => setSidebarExpanded((expanded) => !expanded)}
        >
          <Icon name={sidebarExpanded ? "arrow-left" : "arrow-right"} size={16} />
        </button>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <p className="nav-caption">Espacio académico</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
              aria-label={item.label}
              data-tooltip={item.label}
            >
              <span className="nav-icon">
                <Icon name={item.icon} />
              </span>
              <span className="nav-label">{item.label}</span>
              {item.id === "notificaciones" && notificationCount > 0 && (
                <span className="nav-count">{notificationCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-profile">
          <div className="mini-avatar">BG</div>
          <div className="profile-copy">
            <strong>Brayner Gómez</strong>
            <span>Estudiante</span>
          </div>
        </div>
      </aside>

      <div className="mobile-topbar">
        <div className="brand">
          <div className="brand-mark">
            <span>T</span>
          </div>
          <span className="brand-word">TiempoU</span>
        </div>
        <button
          className="mobile-avatar"
          aria-label="Ir al perfil"
          onClick={() => navigate("perfil")}
        >
          SV
        </button>
      </div>

      <main className="main-content">
        <div className="content-frame">{content[activeSection]}</div>
      </main>

      <nav className="mobile-nav" aria-label="Navegación móvil">
        {mobileItems.map((item) => (
          <button
            key={item.id}
            className={activeSection === item.id ? "active" : ""}
            onClick={() => navigate(item.id)}
          >
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className={
            moreOpen || moreItems.some((item) => item.id === activeSection) ? "active" : ""
          }
          onClick={() => setMoreOpen((open) => !open)}
        >
          <Icon name="more" size={21} />
          <span>Más</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMoreOpen(false)}>
          <section className="mobile-more-menu" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-menu-handle" />
            <h2>Más secciones</h2>
            {moreItems.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)}>
                <span>
                  <Icon name={item.icon} size={20} />
                </span>
                {item.label}
                {item.id === "notificaciones" && notificationCount > 0 && (
                  <span className="nav-count">{notificationCount}</span>
                )}
                <Icon name="arrow-right" size={17} />
              </button>
            ))}
          </section>
        </div>
      )}

      {activityModal && (
  <FormModal
    subjects={subjects}
    activities={activities}
    activity={editingActivity}
    onClose={() => {
      setActivityModal(false);
      setEditingActivity(null);
    }}
    onConfirm={saveActivity}
  />
)}

      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          subject={subjects.find(
            (subject) => subject.id === selectedActivity.subjectId
          )}
          onClose={() => setSelectedActivity(null)}
        />
      )}
      
      {subjectEditor && (
        <SubjectFormModal
          subject={subjectEditor === "new" ? null : subjectEditor}
          hasActivities={
            subjectEditor !== "new" &&
            activities.some((activity) => activity.subjectId === subjectEditor.id)
          }
          onClose={() => setSubjectEditor(null)}
          onSave={saveSubject}
        />
      )}

      {confirmAction && (
        <ConfirmDialog
          action={confirmAction}
          onCancel={() => setConfirmAction(null)}
          onConfirm={executeConfirmedAction}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span>
            <Icon name="check" size={17} />
          </span>
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>
          <IconButton icon="close" label="Cerrar mensaje" onClick={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

export default App;