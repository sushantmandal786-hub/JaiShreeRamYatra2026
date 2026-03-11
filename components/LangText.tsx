import type { ReactNode } from "react";

type LangTextProps = {
  en: string;
  hi: string;
  hing: string;
  className?: string;
  allowHtml?: boolean;
  textKey?: string;
  children?: ReactNode;
};

export function LangText({ en, hi, hing, className, allowHtml = false, textKey }: LangTextProps) {
  if (allowHtml) {
    return (
      <span
        className={className}
        data-en={en}
        data-hi={hi}
        data-hing={hing}
        data-text-key={textKey}
        data-allow-html="true"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: en }}
      />
    );
  }

  return (
    <span
      className={className}
      data-en={en}
      data-hi={hi}
      data-hing={hing}
      data-text-key={textKey}
      suppressHydrationWarning
    >
      {en}
    </span>
  );
}
