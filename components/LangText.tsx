import type { ReactNode } from "react";

type LangTextProps = {
  en: string;
  hi: string;
  hing: string;
  className?: string;
  allowHtml?: boolean;
  children?: ReactNode;
};

export function LangText({ en, hi, hing, className, allowHtml = false }: LangTextProps) {
  if (allowHtml) {
    return (
      <span
        className={className}
        data-en={en}
        data-hi={hi}
        data-hing={hing}
        data-allow-html="true"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: en }}
      />
    );
  }

  return (
    <span className={className} data-en={en} data-hi={hi} data-hing={hing} suppressHydrationWarning>
      {en}
    </span>
  );
}
