"use client";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { PROJECT_TYPES, validateContact, type ContactErrors } from "@/lib/contact";
import { cn } from "@/lib/cn";

interface Values {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  website: string; // honeypot
}

const initial: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const control =
  "w-full rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-sm text-fg outline-none transition placeholder:text-fg-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30 aria-[invalid=true]:border-red-500";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
      {message}
    </p>
  );
}

export function ContactForm() {
  const { form } = contactConfig;
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const aria = (key: keyof ContactErrors) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setValues(initial);
        setStatus("success");
        return;
      }
      if (res.status === 422) {
        const json = await res.json().catch(() => null);
        if (json?.errors) {
          setErrors(json.errors);
          setStatus("idle");
          return;
        }
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-72 flex-col items-center justify-center text-center"
      >
        <CheckCircle2 className="size-10 text-accent" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold">{form.successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-fg-muted">{form.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            className={control}
            {...aria("name")}
          />
          <ErrorText id="name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            className={control}
            {...aria("email")}
          />
          <ErrorText id="email" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
            className={control}
            {...aria("company")}
          />
          <ErrorText id="company" message={errors.company} />
        </div>
        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={set("projectType")}
            className={control}
            {...aria("projectType")}
          >
            <option value="">Select one</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ErrorText id="projectType" message={errors.projectType} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          className={cn(control, "resize-y")}
          {...aria("message")}
        />
        <ErrorText id="message" message={errors.message} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {form.errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-accent-2 to-accent px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_var(--glow)] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            {form.submitLabel}
            <Send className="size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
